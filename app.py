from flask import Flask, request, jsonify
from utils.game_logic import (computer_choice,winner)

app=Flask(__name__)

@app.route("/")
def home():
    return "Rock Paper Scissors API Running"

@app.route("/play",methods=["POST"])
def play():
    data=request.get_json()
    player_choice=data["choice"]
    computer=computer_choice()
    result=winner(player_choice,computer)

    return jsonify({"user": player_choice, "computer": computer, "result": result})

if __name__ == "__main__":
    app.run(debug=True)