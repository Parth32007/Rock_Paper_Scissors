from flask import Flask, request, jsonify
from utils.game_logic import (computer_choice,winner)

app=Flask(__name__)

@app.route("/")
def home():
    return "Rock Paper Scissors API Running"

@app.route("/play", methods=["POST"])
def play():

    data = request.get_json()

    if not data or "choice" not in data:
        return jsonify({
            "error": "Choice is required"
        }), 400

    user_choice = data["choice"].lower()

    if user_choice not in ["rock", "paper", "scissors"]:
        return jsonify({
            "error": "Invalid choice"
        }), 400

    computer_choice = computer_choice()

    result = winner(
        user_choice,
        computer_choice
    )

    return jsonify({
        "user": user_choice,
        "computer": computer_choice,
        "result": result
    })

if __name__ == "__main__":
    app.run(debug=True)