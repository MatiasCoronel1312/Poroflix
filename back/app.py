import os
from dotenv import load_dotenv
from flask import Flask , request, jsonify 
from flask_sqlalchemy import SQLAlchemy 
from flask_cors import CORS
from werkzeug.security import generate_password_hash , check_password_hash
from flask_jwt_extended import JWTManager , create_access_token ,jwt_required, get_jwt_identity 
from functools import wraps
from datetime import timedelta
import pandas as pd

load_dotenv()

app = Flask (__name__)

CORS(app)

database_url = os.getenv("DATABASE_URL")

if database_url.startswith("postgres://"):
    database_url = database_url.replace("postgres://", "postgresql://", 1)
app.config["SQLALCHEMY_DATABASE_URI"] = database_url
app.config ["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=24)

db = SQLAlchemy (app)
jwt = JWTManager(app)

def admin_required(func):

    @wraps(func)
    def wrapper(*args, **kwargs):
        user_id = get_jwt_identity()
        user = db.session.get(
            User,
            int(user_id)
        )
        if not user:
            return jsonify({
                "error":"Usuario no encontrado"
            }),404
        if user.role != "admin":
            return jsonify({
                "error":"Acceso denegado"
            }),403
        return func(*args, **kwargs)
    return wrapper
class Movie(db.Model):
    id = db.Column (db.Integer, primary_key=True)
    title= db.Column (db.String(100),nullable=False)
    director= db.Column (db.String(100))
    category = db.Column (db.String(50))
    description= db.Column (db.Text)
    detail= db.Column (db.Text)
    duration = db.Column (db.Integer)
    img= db.Column (db.String(200))
    trailer= db.Column (db.String(200))
    
    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "director": self.director,
            "category": self.category,
            "description": self.description,
            "detail": self.detail,
            "duration": self.duration,
            "img": self.img,
            "trailer": self.trailer
        }
class Series(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    creator = db.Column(db.String(100))
    category = db.Column(db.String(50))
    description = db.Column(db.Text)
    detail = db.Column(db.Text)
    seasons = db.Column(db.Integer)
    episodes = db.Column(db.Integer)
    img = db.Column(db.String(200))
    trailer = db.Column(db.String(200))
    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "creator": self.creator,
            "category": self.category,
            "description": self.description,
            "detail": self.detail,
            "seasons": self.seasons,
            "episodes": self.episodes,
            "img": self.img,
            "trailer": self.trailer
        }
class User(db.Model):
    id = db.Column(
        db.Integer,
        primary_key=True
    )

    username = db.Column(
        db.String(50),
        unique=True,
        nullable=False
    )

    email = db.Column(
        db.String(100),
        unique=True,
        nullable=False
    )

    password = db.Column(
        db.String(255),
        nullable=False
    )
    role = db.Column(
        db.String(20),
        nullable=False,
        default="user"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "role": self.role
        }  
class Subscription(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("user.id"),
        nullable=False
    )

    plan = db.Column(
        db.String(20),
        nullable=False
    )

    active = db.Column(
        db.Boolean,
        default=False
    )

class UserContent(db.Model):

    __tablename__ = "user_content"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("user.id"),
        nullable=False
    )

    content_id = db.Column(
        db.Integer,
        nullable=False
    )

    content_type = db.Column(
        db.String(20),
        nullable=False
    )

    in_list = db.Column(
        db.Boolean,
        default=False
    )

    liked = db.Column(
        db.Boolean,
        nullable=True
    )

#crea la DB
with app.app_context():
    db.create_all()

#Crear película
@app.route("/movies", methods=["POST"])
@jwt_required()
@admin_required
def create_movie():
    data = request.json

    movie = Movie(
        title=data["title"],
        director=data.get("director"),
        category=data.get("category"),
        description=data.get("description"),
        detail=data.get("detail"),
        duration=data.get("duration"),
        img=data.get("img"),
        trailer=data.get("trailer")
    )

    db.session.add(movie)
    db.session.commit()

    return jsonify(movie.to_dict()), 201
    
#Obtener todas
@app.route("/movies", methods=["GET"])
def get_movies():
    movies = Movie.query.all()
    return jsonify([m.to_dict() for m in movies])

# Obtener una
@app.route("/movies/<int:id>", methods=["GET"])
def get_movie(id):
    movie = Movie.query.get_or_404(id)
    return jsonify(movie.to_dict())

#Actualizar
@app.route("/movies/<int:id>", methods=["PUT"])
@jwt_required()
@admin_required
def update_movie(id):
    movie = Movie.query.get_or_404(id)
    data = request.json

    movie.title = data.get("title", movie.title)
    movie.director = data.get("director", movie.director)
    movie.category = data.get("category", movie.category)
    movie.description = data.get("description", movie.description)
    movie.detail = data.get("detail", movie.detail)
    movie.duration = data.get("duration", movie.duration)
    movie.img = data.get("img", movie.img)
    movie.trailer = data.get("trailer", movie.trailer)

    db.session.commit()

    return jsonify(movie.to_dict())

#Eliminar
@app.route("/movies/<int:id>", methods=["DELETE"])
@jwt_required()
@admin_required
def delete_movie(id):
    movie = Movie.query.get_or_404(id)

    db.session.delete(movie)
    db.session.commit()

    return jsonify({"message": "Película eliminada"})

@app.route("/series", methods=["POST"])
@jwt_required()
@admin_required
def create_series():
    data = request.json
    serie = Series(
        title=data["title"],
        creator=data.get("creator"),
        category=data.get("category"),
        description=data.get("description"),
        detail=data.get("detail"),
        seasons=data.get("seasons"),
        episodes=data.get("episodes"),
        img=data.get("img"),
        trailer=data.get("trailer")
    )
    db.session.add(serie)
    db.session.commit()
    return jsonify(
        serie.to_dict()
    ), 201

@app.route("/series", methods=["GET"])
def get_series():
    series = Series.query.all()
    return jsonify([
        s.to_dict()
        for s in series
    ])

@app.route("/series/<int:id>", methods=["GET"])
def get_serie(id):

    serie = Series.query.get_or_404(id)

    return jsonify(
        serie.to_dict()
    )

@app.route("/series/<int:id>", methods=["PUT"])
@jwt_required()
@admin_required
def update_serie(id):
    serie = Series.query.get_or_404(id)
    data = request.json
    serie.title = data.get("title", serie.title)
    serie.creator = data.get("creator", serie.creator)
    serie.category = data.get("category", serie.category)
    serie.description = data.get("description", serie.description)
    serie.detail = data.get("detail", serie.detail)
    serie.seasons = data.get("seasons", serie.seasons)
    serie.episodes = data.get("episodes", serie.episodes)
    serie.img = data.get("img", serie.img)
    serie.trailer = data.get("trailer", serie.trailer)
    db.session.commit()
    return jsonify(
        serie.to_dict()
    )
@app.route("/series/<int:id>", methods=["DELETE"])
@jwt_required()
@admin_required
def delete_serie(id):
    serie = Series.query.get_or_404(id)
    db.session.delete(serie)
    db.session.commit()
    return jsonify({
        "message":"Serie eliminada"
    })

@app.route("/register", methods=["POST"])
def register():

    data = request.json

    username = data["username"]
    email = data["email"]
    password = data["password"]

    existing_user = User.query.filter_by(
        email=email
    ).first()

    if existing_user:
        return jsonify({
            "error": "El email ya existe"
        }), 400
    
    existing_username = User.query.filter_by(
        username=username
    ).first()

    if existing_username:
        return jsonify({
            "error":"El username ya existe"
        }), 400

    hashed_password = generate_password_hash(
        password
    )

    user = User(
        username=username,
        email=email,
        password=hashed_password,
        role="user"
    )

    db.session.add(user)
    db.session.commit()

    token = create_access_token(
       identity=str(user.id)
    )

    return jsonify({
        "message": "Usuario registrado",
        "token": token,
        "username": user.username,
        "role":user.role
    }),201

@app.route("/login", methods=["POST"])
def login():

    data = request.json

    email = data["email"]
    password = data["password"]

    user = User.query.filter_by(
        email=email
    ).first()

    if not user:
        return jsonify({
            "error":"Usuario no encontrado"
        }), 404

    if not check_password_hash(
        user.password,
        password
    ):
        return jsonify({
            "error":"Contraseña incorrecta"
        }), 401
    token = create_access_token(
        identity=str(user.id)
    )

    return jsonify({
        "token": token,
        "username": user.username,
        "role":user.role
    })

@app.route("/profile")
@jwt_required()
def profile():

    user_id = get_jwt_identity()
    user = db.session.get(
        User,
        int(user_id)
    )

    return jsonify(
        user.to_dict()
    )

@app.route("/subscription", methods=["POST"])
@jwt_required()
def create_subscription():

    user_id = get_jwt_identity()

    data = request.json

    subscription = Subscription(
        user_id=user_id,
        plan=data["plan"]
    )

    db.session.add(subscription)
    db.session.commit()

    return jsonify({
        "message":"Plan seleccionado",
        "plan": data["plan"]
    })



@app.route("/users", methods=["GET"])
@jwt_required()
@admin_required
def get_users():
    users = User.query.all()
    result = []
    for user in users:
        result.append({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "role": user.role
        })
    return [user.to_dict() for user in users], 200

@app.route("/user-content", methods=["GET"])
@jwt_required()
def get_user_content():
    user_id = get_jwt_identity()
    items = UserContent.query.filter_by(
        user_id=user_id
    ).all()
    result = []
    for item in items:
        if item.content_type == "movie":
            movie = Movie.query.get(item.content_id)
            if movie:
                result.append({
                    "id": movie.id,
                    "type": "movie",
                    "title": movie.title,
                    "img": movie.img,
                    "category": movie.category,
                    "duration": movie.duration,
                    "liked": item.liked,
                    "in_list": item.in_list
                })
        elif item.content_type == "series":
            serie = Series.query.get(item.content_id)
            if serie:
                result.append({
                    "id": serie.id,
                    "type": "series",
                    "title": serie.title,
                    "img": serie.img,
                    "category": serie.category,
                    "liked": item.liked,
                    "in_list": item.in_list
                })

    return result, 200

@app.route("/user-content", methods=["PUT"])
@jwt_required()
def update_user_content():

    user_id = get_jwt_identity()
    data = request.get_json()
    content_id = data["content_id"]
    content_type = data["content_type"]
    action = data["action"]
    item = UserContent.query.filter_by(
        user_id=user_id,
        content_id=content_id,
        content_type=content_type
    ).first()

    if not item:
        item = UserContent(
            user_id=user_id,
            content_id=content_id,
            content_type=content_type
        )
        db.session.add(item)

    if action == "toggle_list":
        item.in_list = not item.in_list
    if action == "like":
        item.liked = (
            None
            if item.liked is True
            else True
        )
    elif action == "dislike":
        item.liked = (
            None
            if item.liked is False
            else False
        )
    db.session.commit()

    return {
    "liked": item.liked,
    "in_list": item.in_list
}

def get_top_content(user_content_df, content_df, content_type, liked_value, column_name):
    filtered = user_content_df[
        (user_content_df["content_type"] == content_type) &
        (user_content_df["liked"] == liked_value)
    ]

    top = (
        filtered
        .groupby("content_id")
        .size()
        .sort_values(ascending=False)
        .head(10)
        .reset_index()
    )

    top.columns = ["content_id", column_name]

    top = top.merge(
        content_df,
        left_on="content_id",
        right_on="id"
    )

    return top[
        ["title", column_name]
    ]


@app.route("/stats", methods=["GET"])
@jwt_required()
@admin_required
def get_all_stats():

    # DataFrames
    movies_df = pd.read_sql(Movie.query.statement, db.engine)
    series_df = pd.read_sql(Series.query.statement, db.engine)
    users_df = pd.read_sql(User.query.statement, db.engine)
    user_content_df = pd.read_sql(UserContent.query.statement, db.engine)

    # Estadísticas generales
    users = len(users_df)
    movies = len(movies_df)
    series = len(series_df)

    likes = len(
        user_content_df[
            user_content_df["liked"] == True
        ]
    )

    dislikes = len(
        user_content_df[
            user_content_df["liked"] == False
        ]
    )

    my_list = len(
        user_content_df[
            user_content_df["in_list"] == True
        ]
    )

    # Rankings
    top_movies = get_top_content(
        user_content_df,
        movies_df,
        "movie",
        True,
        "likes"
    )

    top_series = get_top_content(
        user_content_df,
        series_df,
        "series",
        True,
        "likes"
    )

    top_movies_dislike = get_top_content(
        user_content_df,
        movies_df,
        "movie",
        False,
        "dislikes"
    )

    top_series_dislike = get_top_content(
        user_content_df,
        series_df,
        "series",
        False,
        "dislikes"
    )

    total_interactions = len(user_content_df)

    engagement_rate = total_interactions / len(users_df)
    total_reactions = likes + dislikes

    approval_rate = (
        likes / total_reactions
        if total_reactions > 0 else 0
    )
    user_activity = (
    user_content_df
        .groupby("user_id")
        .size()
        .sort_values(ascending=False)
        .head(10)
        .reset_index(name="actions")
    )
    my_list_rank = (
        user_content_df[user_content_df["in_list"] == True]
        .groupby("content_id")
        .size()
        .sort_values(ascending=False)
        .head(10)
        .reset_index(name="saved")
    )


    return {
        "users": users,
        "movies": movies,
        "series": series,
        "likes": likes,
        "dislikes": dislikes,
        "my_list": my_list,

        "engagement_rate": engagement_rate,
        "approval_rate": approval_rate,

        "top_users": user_activity.to_dict(orient="records"),
        "top_saved": my_list_rank.to_dict(orient="records"),

        "top_movies": top_movies.to_dict(orient="records"),
        "top_series": top_series.to_dict(orient="records"),

        "top_movies_dislike": top_movies_dislike.to_dict(orient="records"),
        "top_series_dislike": top_series_dislike.to_dict(orient="records")
    }

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(
        host="0.0.0.0",
        port=port,
        debug=True
    )
