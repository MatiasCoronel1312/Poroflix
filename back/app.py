import os
from dotenv import load_dotenv
from flask import Flask , request, jsonify 
from flask_sqlalchemy import SQLAlchemy 
from flask_cors import CORS
from werkzeug.security import generate_password_hash , check_password_hash
from flask_jwt_extended import JWTManager , create_access_token ,jwt_required, get_jwt_identity 

load_dotenv()

app = Flask (__name__)

CORS(app)

app.config ["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config ["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = os.getenv(
    "JWT_SECRET_KEY"
)

db = SQLAlchemy (app)
jwt = JWTManager(app)


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

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email
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

#crea la DB
with app.app_context():
    db.create_all()

#Crear película
@app.route("/movies", methods=["POST"])
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
def delete_movie(id):
    movie = Movie.query.get_or_404(id)

    db.session.delete(movie)
    db.session.commit()

    return jsonify({"message": "Película eliminada"})

@app.route("/series", methods=["POST"])
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
def update_serie(id):
    serie = Series.query.get_or_404(id)
    data = request.json
    serie.title = data.get(
        "title",
        serie.title
    )
    serie.creator = data.get(
        "creator",
        serie.creator
    )
    serie.category = data.get(
        "category",
        serie.category
    )
    serie.description = data.get(
        "description",
        serie.description
    )
    serie.detail = data.get(
        "detail",
        serie.detail
    )
    serie.seasons = data.get(
        "seasons",
        serie.seasons
    )
    serie.episodes = data.get(
        "episodes",
        serie.episodes
    )
    serie.img = data.get(
        "img",
        serie.img
    )
    serie.trailer = data.get(
        "trailer",
        serie.trailer
    )
    db.session.commit()
    return jsonify(
        serie.to_dict()
    )
@app.route("/series/<int:id>", methods=["DELETE"])
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
        password=hashed_password
    )

    db.session.add(user)
    db.session.commit()

    token = create_access_token(
       identity=str(user.id)
    )

    return jsonify({
        "message": "Usuario registrado",
        "token": token,
        "username": user.username
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
        "username": user.username
    })

@app.route("/profile")
@jwt_required()
def profile():

    user_id = get_jwt_identity()

    user = User.query.get(user_id)

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

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(
        host="0.0.0.0",
        port=port,
        debug=True
    )
