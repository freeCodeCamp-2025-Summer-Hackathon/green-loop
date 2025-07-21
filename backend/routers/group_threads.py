import auth
import schemas
from typing import List
from fastapi import Depends, HTTPException, status, APIRouter
from sqlmodel import Session, select
from typing import Annotated
from models import Thread, GroupUser, Group, User
from schemas import ThreadCreate
from database import get_db_session  # your DB session dependency

router = APIRouter()



# Create thread
@router.post("/create_thread", status_code=status.HTTP_201_CREATED)
def create_thread(
    thread_data: ThreadCreate,
    db: Session = Depends(get_db_session),
    current_user: User = Depends(auth.authenticate_user)
):
    # 1. Check if group exists
    group = db.exec(select(Group).where(Group.id == thread_data.group_id)).first()
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")

    # 2. Check if user is a member of the group
    membership = db.exec(
        select(GroupUser).where(
            GroupUser.group_id == thread_data.group_id,
            GroupUser.user_id == current_user.id
        )
    ).first()
    if not membership:
        raise HTTPException(status_code=403, detail="You are not a member of this group")

    # 3. Create the thread
    thread = Thread(
        title=thread_data.title,
        content=thread_data.content,
        group_id=thread_data.group_id,
        user_id=current_user.id,
        created_at=thread_data.created_at,
        updated_at=thread_data.updated_at,
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


# list all the threads in a group
@router.get("/groups/{group_slug}/threads", status_code=status.HTTP_200_OK, response_model=List[schemas.ThreadResponse])
def list_threads_in_group(
    group_slug: str,
    db: Session = Depends(get_db_session),
    current_user: User = Depends(auth.authenticate_user)
):
    """ Based on Group Slug we get list of threads in that group object"""
    # Check group exists
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

    # Get threads
    threads = db.exec(
        select(Thread).where(Thread.group_id == group.id)
    ).all()

    return threads


# get specific thread details
@router.get("/threads/{thread_id}", response_model=schemas.ThreadResponse, status_code=status.HTTP_200_OK)
def get_thread_detail(
    thread_id: int,
    db: Session = Depends(get_db_session),
    current_user: User = Depends(auth.authenticate_user)
):
    """ Get details/info on specific threads, given thread id"""
    # Get thread
    thread = db.get(Thread, thread_id)
    if not thread:
        raise HTTPException(status_code=404, detail="Thread not found")

    # Check if user is a member of the group this thread belongs to
    membership = db.exec(
        select(GroupUser).where(
            GroupUser.group_id == thread.group_id,
            GroupUser.user_id == current_user.id
        )
    ).first()

    if not membership:
        raise HTTPException(status_code=403, detail="You are not a member of the group that owns this thread")

    return thread