import os
from dotenv import load_dotenv
from flask import Flask , request, jsonify 
from flask_sqlalchemy import SQLAlchemy 
from flask_cors import CORS

app = Flask (__name__)

CORS(app)

app.config ["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config ["SQLALCHEMY_MODIFICATIONS"] = False

db = SQLAlchemy (app)

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

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
    app.run(debug=True)
