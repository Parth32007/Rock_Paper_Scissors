from utils.game_logic import (
    computer_choice,
    winner
)

player=input("Enter your choice (rock, paper, scissors): ").lower()

computer=computer_choice()

result=winner(
    player,
    computer
)

print("User :", player)
print("Computer :", computer)
print("Result :", result)