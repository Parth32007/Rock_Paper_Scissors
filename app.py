from flask import Flask, render_template, request, jsonify
from utils.game_logic import (
    get_computer_choice,
    determine_winner
)

app = Flask(__name__)


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

    # Return result
    return jsonify({
        "user": user_choice,
        "computer": computer_choice,
        "result": result
    })


if __name__ == "__main__":
    app.run(debug=True)