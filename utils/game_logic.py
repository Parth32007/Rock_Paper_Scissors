import random

choices = ["rock", "paper", "scissors"]


def get_computer_choice():
    return random.choice(choices)


def determine_winner(user, computer):

    if user == computer:
        return "Draw"

    elif (
        (user == "rock" and computer == "scissors") or
        (user == "paper" and computer == "rock") or
        (user == "scissors" and computer == "paper")
    ):
        return "You Win"

    else:
        return "Computer Wins"