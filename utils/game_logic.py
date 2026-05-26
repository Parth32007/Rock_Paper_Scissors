import random

choices=["rock","paper","scissors"]

def computer_choice():
    return random.choice(choices)

def winner(player,computer):
    if player==computer:
        return "It's a tie!"
    elif (player=="rock" and computer=="scissors") or (player=="paper" and computer=="rock") or (player=="scissors" and computer=="paper"):
        return "You win!"
    else:
        return "Computer wins!"