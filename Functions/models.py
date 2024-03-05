from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import declarative_base
from db import engine

Base = declarative_base()

# class Token(BaseModel):
#       access_token: str
#       token_type: str

# class User(BaseModel):
#       username: str

class Users(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    username = Column(String)
    password = Column(String)
    email = Column(String)

class Titles(Base):
    __tablename__ = "titles"
    id = Column(Integer, primary_key=True)
    playlistname = Column(String)
    users_id = Column(ForeignKey("users.id"))

class Playlistsongs(Base):
    __tablename__ = "playlistsongs"
    id = Column(Integer, primary_key=True)
    titles_id = Column(ForeignKey("titles.id"))
    song = Column(String)
    

