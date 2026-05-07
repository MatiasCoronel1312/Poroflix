from flask import Flask , request, jsonify 
from flask_sqlalchemy import SQLAlchemy 

app = Flask (__name__)

app.config ["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config ["SQLALCHEMY_MODIFICATIONS"] = False

db = SQLAlchemy (app)

class Movie(db.Model):
    id = db.Column (db.Integer, primary_key=True)
    title= db.Column (db.String(100),nullable=False)
    director= db.Column (db.String(100))
    category = db.Column (db.String(50))
    description= db.Column (db.Text)
    duration = db.Column (db.Integer)
    img= db.Column (db.String(200))
    
    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "director": self.director,
            "category": self.category,
            "description": self.description,
            "duration": self.duration,
            "img": self.img,
            
        }
    