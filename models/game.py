from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class GameHistory(db.Model):

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    user_choice = db.Column(
        db.String(20),
        nullable=False
    )

    computer_choice = db.Column(
        db.String(20),
        nullable=False
    )

    result = db.Column(
        db.String(50),
        nullable=False
    )

    played_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )