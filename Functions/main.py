from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware 
from db import session
from models import Users
from models import Titles
from models import Playlistsongs
# from models import Tokens

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000"
]
# Added the CORS middleware below
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get('/')
def home():
    return {"message": "Hello World!"}

@app.get('/users')
def get_users():
    users = session.query(Users)
    return users.all()

@app.get('/titles')
def get_titles():
    titles = session.query(Titles, Users).join(Users, Users.id == Titles.users_id)
    results = titles.all()
    titles_list = []
    for title in results:
        title_dict = {
            "title_id": title.Titles.id,
            "playlist_user": title.Users.username,
            "playlist_name": title.Titles.playlistname
        }
        titles_list.append(title_dict)
    print(titles_list)
    return titles_list
    # return titles.all()

@app.get('/playlistsongs')
def get_playlistsongs():
    playlistsongs = session.query(Playlistsongs, Titles).join(Titles, Titles.id == Playlistsongs.titles_id)
    playlistuser = session.query(Titles, Users).join(Users, Users.id == Titles.users_id)
    userresults = playlistuser.all()
    results = playlistsongs.all()
    playlistsongs_list = []
    playlistuser_list = []
    for song in results:
        songs_dict = {
            "playlistsongs_id": song.Playlistsongs.id,
            "titles_id": song.Titles.users_id,
            "songs": song.Playlistsongs.song
        }
        playlistsongs_list.append(songs_dict)

    for user in userresults:
        user_dict = {
            "title_id": user.Titles.id,
            "playlist_user": user.Users.username,
            "playlist_name": user.Titles.playlistname
        }
        playlistuser_list.append(user_dict)
        playlistuser_list.append(playlistsongs_list)
    print(playlistuser_list)
    print(playlistsongs_list)
    return playlistuser_list
   
    # return playlistsongs.all()

@app.post('/users/create')
def create_user(username: str, password: str, email: str):
    new_user = Users(username=username, password=password, email=email)
    session.add(new_user)
    session.commit()
    return{"User Created": new_user.username}

@app.post('/titles/create')
def create_title(playlistname: str, user_id: int):
    new_title = Titles(playlistname=playlistname, user_id=user_id)
    session.add(new_title)
    session.commit()
    return{"New PLaylist Title Created": new_title.playlistname}

@app.post('/playlistsongs/create')
def create_songs(titles_id: int, song: str):
    new_song = Playlistsongs(titles_id=titles_id, song=song)
    session.add(new_song)
    session.commit()
    return{"New Song Created": new_song.song}

@app.put('/users/{id}/update')
def update_user(id:int, username: str, password: str, email: str):
    user = session.query(Users).filter(Users.id == id).first()
    if user is not None:
        if username:
            user.username = username
            user.password = password
            user.email = email
            session.add(user)
            session.commit()
            return{"Updated User": user.username}
        else: 
            return{"message: User ID not found"}

@app.put("/titles/{id}/update")
def update_title(id: int, playlistname: str, users_id: int):
    title = session.query(Titles).filter(Titles.id == id).first()
    if title is not None:
        if playlistname:
            title.playlistname = playlistname
            session.add(title)
            session.commit()
            return{"Updated Title": title.playlistname}
        else: 
            return{"message: User ID not found"}
        
@app.put("/playlistsongs/{id}/update")
def update_songs(id: int, titles_id: int, song: str):
    new_song = session.query(Playlistsongs).filter(Playlistsongs.id == id).first()
    if new_song is not None:
        if new_song:
            mew_song.song = song
            session.add(new_song)
            session.commit()
            return{"Updated Song": new_song.song}
        else: 
            return{"message: User ID not found"}


