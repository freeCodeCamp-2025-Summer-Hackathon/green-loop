import auth
import schemas
import datetime as dt
from typing import List
from fastapi import Depends, HTTPException, status, APIRouter
from sqlmodel import Session, select
from sqlalchemy.orm import selectinload

from typing import Annotated
from models import Thread, ThreadComment,  GroupUser, Group, User
from schemas import ThreadCreate
from database import get_db_session  # your DB session dependency
from datetime import datetime

router = APIRouter()



# Create thread
@router.post("/create_thread", status_code=status.HTTP_201_CREATED)
async def create_thread(
    thread_data: ThreadCreate,
    db: Session = Depends(get_db_session),
    current_user: User = Depends(auth.authenticate_user)
):
    # 1. Check if group exists
    group = db.exec(select(Group).where(Group.slug == thread_data.group_slug)).first()
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")

    # 2. Check if user is a member of the group
    membership = db.exec(
        select(GroupUser).where(
            GroupUser.group_id == group.id,
            GroupUser.user_id == current_user.id
        )
    ).first()


    if not membership and current_user.id != group.owner_id:
        raise HTTPException(status_code=403, detail="You are not a member of this group")

    # 3. Create the thread
    thread = Thread(
        title=thread_data.title,
        content=thread_data.content,
        group_id=group.id,
    user_id=current_user.id,
        pinned=thread_data.pinned,
        locked=thread_data.locked
    )
    db.add(thread)
    db.commit()
    db.refresh(thread)

    return {
        "detail": "Thread created successfully",
        "thread_id": thread.id,
        "title": thread.title
    }


@router.get("/{group_slug}", status_code=status.HTTP_200_OK, response_model=List[schemas.ThreadResponse])
async def list_threads_in_group(
    group_slug: str,
    db: Session = Depends(get_db_session),
    current_user: User = Depends(auth.authenticate_user)
):
    # Get group
    group = db.exec(select(Group).where(Group.slug == group_slug)).first()
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")

    # Check membership
    membership = db.exec(
        select(GroupUser).where(
            GroupUser.group_id == group.id,
            GroupUser.user_id == current_user.id
        )
    ).first()
    if not membership:
        raise HTTPException(status_code=403, detail="You are not a member of this group")

    # Get threads + thread_comments + each comment's user
    statement = (
        select(Thread)
        .where(Thread.group_id == group.id)
        .options(
            selectinload(Thread.thread_comments).selectinload(ThreadComment.user)
        )
    )
    threads = db.exec(statement).all()

    return threads




@router.get("/{thread_id}", status_code=status.HTTP_200_OK)
async def get_thread_detail(
    thread_id: int,
    db: Session = Depends(get_db_session),
    current_user: User = Depends(auth.authenticate_user)
):
    # Query the thread including thread_comments
    statement = (
        select(Thread)
        .where(Thread.id == thread_id)
        .options(selectinload(Thread.thread_comments).selectinload(ThreadComment.user))
    )
    result = db.exec(statement)
    thread = result.one_or_none()

    if not thread:
        raise HTTPException(status_code=404, detail="Thread not found")

    # Check if user is a member of the group
    membership = db.exec(
        select(GroupUser).where(
            GroupUser.group_id == thread.group_id,
            GroupUser.user_id == current_user.id
        )
    ).first()

    if not membership:
        raise HTTPException(status_code=403, detail="You are not a member of the group that owns this thread")

      # Manually serialize response to include username
    return {
        "id": thread.id,
        "title": thread.title,
        "content": thread.content,
        "group_id": thread.group_id,
        "user_id": thread.user_id,
        "pinned": thread.pinned,
        "locked": thread.locked,
        "created_at": thread.created_at,
        "updated_at": thread.updated_at,
        "thread_comments": [
            {
                "id": c.id,
                "content": c.content,
                "user_id": c.user_id,
                "username": c.user.username if c.user else None,
                "thread_id": c.thread_id,
                "created_at": c.created_at,
                "updated_at": c.updated_at,
            } for c in thread.thread_comments
        ]
    }



@router.post("/create_comment",status_code=status.HTTP_200_OK)
async def create_thread_comment(
    comment: schemas.ThreadCommentCreate,
    db: Session = Depends(get_db_session),
    current_user: User = Depends(auth.authenticate_user)
):
    
    thread = db.exec(select(Thread).where(Thread.id == comment.thread_id)).first()
    if not thread: 
        raise HTTPException(status_code=404, detail="Thread not found")
    
    new_comment = ThreadComment(
        content=comment.content,
        user_id=current_user.id,
        thread_id=comment.thread_id,    
        created_at=datetime.now(dt.UTC),
        updated_at=datetime.now(dt.UTC)
    )

    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)
    new_comment_response = schemas.ThreadCommentRead.from_orm(new_comment)
    return {'detail':'Comment Posted Sucessfully', 'comment':new_comment_response}