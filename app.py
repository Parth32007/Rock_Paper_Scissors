from flask import Flask, render_template, request, jsonify
from utils.game_logic import (
    get_computer_choice,
    determine_winner
)
from flask import (
    Flask,
    render_template,
    request,
    jsonify
)

from utils.game_logic import (
    get_computer_choice,
    determine_winner
)

from models.game import (
    db,
    GameHistory
)

app = Flask(__name__)

app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "sqlite:///game_history.db"

app.config[
    "SQLALCHEMY_TRACK_MODIFICATIONS"
] = False

db.init_app(app)

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/play", methods=["POST"])
def play():

    data = request.get_json()

    # Check if choice was provided
    if not data or "choice" not in data:
        return jsonify({
            "error": "Choice is required"
        }), 400

    user_choice = data["choice"].lower()

    # Validate user choice
    if user_choice not in ["rock", "paper", "scissors"]:
        return jsonify({
            "error": "Invalid choice"
        }), 400

    # Generate computer move
    computer_choice = get_computer_choice()

    # Determine winner
    result = determine_winner(
        user_choice,
        computer_choice
    )

    new_game = GameHistory(
        user_choice=user_choice,
        computer_choice=computer_choice,
        result=result
    )

    db.session.add(new_game)
    db.session.commit()

    # Return result
    return jsonify({
        "user": user_choice,
        "computer": computer_choice,
        "result": result
    })

@app.route("/history")
def history():

    games = GameHistory.query.order_by(
        GameHistory.played_at.desc()
    ).all()

    return render_template(
        "history.html",
        games=games
    )

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)