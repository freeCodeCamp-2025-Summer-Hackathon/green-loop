import auth
import datetime as dt
import schemas
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from typing import List
from models import Group, User, GroupUser, PrivateGroup, PublicGroup  # import your models
from database import get_db_session  # your DB session dependency
from utils import slugify  # your user auth dependency


router = APIRouter()





@router.post("/create_group", response_model=Group)
def create_group(
    group: schemas.GroupRequest, 
    db_session: Session = Depends(get_db_session), 
    current_user: User = Depends(auth.authenticate_user)
):
    """ Create Group Resource"""
    # Check if group already exists
    statement = select(Group).where(Group.name == group.name)
    existing_group = db_session.exec(statement).first()
    if existing_group:
        raise HTTPException(status_code=400, detail="Group name already exists")
    
    # Create Group ORM object
    new_group = Group(
        name=group.name,
        description=group.description,
        tags=group.tags,
        owner_id=current_user.id,
        created_at=datetime.now(dt.UTC),
        updated_at=datetime.now(dt.UTC),
        slug=slugify(group.name)
    )


    db_session.add(new_group)
    db_session.commit()
    db_session.refresh(new_group)
    return {'detail': 'Group Created Sucessfully', 'Group_obj': new_group}




@router.get("/list", response_model=List[Group])
def list_groups(session: Session = Depends(get_db_session)):
    """ List all groups in DB"""
    groups = session.exec(select(Group)).all()
    return groups




# based on the group slug  you can join the group 
@router.post("/{group_slug}/join")
def join_group(
    group_slug: str,
    session: Session = Depends(get_db_session),
    current_user: User = Depends(auth.authenticate_user)
):
    # Find group by slug
    statement = select(Group).where(Group.slug == group_slug)
    group = session.exec(statement).first()
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")

    # Edge case: User is the owner
    if group.owner_id == current_user.id:
        raise HTTPException(status_code=400, detail="You are the owner of this group")

    # Check if user already in group
    link = session.exec(
        select(GroupUser).where(
            GroupUser.group_id == group.id,
            GroupUser.user_id == current_user.id
        )
    ).first()
    if link:
        raise HTTPException(status_code=400, detail="User already in group, cannot join")

    # Add user to group with default role "member"
    group_user = GroupUser(
        group_id=group.id,
        user_id=current_user.id,
        role="member",
        joined_at=datetime.now(dt.UTC)
    )
    session.add(group_user)
    session.commit()
    session.refresh(group_user)  # optional

    return {"detail": "Joined group successfully"}


@router.get("/{group_slug}/info", response_model=schemas.GroupInfo)
def get_group_info(
    group_slug: str,
    session: Session = Depends(get_db_session)
):
    # Fetch group
    group = session.exec(select(Group).where(Group.slug == group_slug)).first()
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")

    # Count members
    member_count = session.exec(
        select(func.count()).where(GroupUser.group_id == group.id)
    ).first()

    # Determine visibility
    visibility = "public" if group.public_group else "private"

    return schemas.GroupInfo(
        name=group.name,
        slug=group.slug,
        description=group.description,
        tags=group.tags,
        owner_email=group.owner.email,
        owner_username=group.owner.username,
        created_at=group.created_at,
        updated_at=group.updated_at,
        total_members=member_count,
        visibility=visibility
    )



