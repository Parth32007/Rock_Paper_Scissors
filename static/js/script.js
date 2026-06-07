let wins =
    Number(localStorage.getItem("wins")) || 0;

let losses =
    Number(localStorage.getItem("losses")) || 0;

let draws =
    Number(localStorage.getItem("draws")) || 0;

updateScoreboard();

function updateScoreboard(){

    document.getElementById("wins").textContent =
        wins;

    document.getElementById("losses").textContent =
        losses;

    document.getElementById("draws").textContent =
        draws;
}

async function playGame(choice) {

    try {

        const response = await fetch("/play", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                choice: choice
            })
        });

        const data = await response.json();

        document.getElementById("user-choice").textContent =
            "Your Choice: " + data.user;

        document.getElementById("computer-choice").textContent =
            "Computer Choice: " + data.computer;

        const winnerElement =
            document.getElementById("winner");

        winnerElement.textContent =
            "Winner: " + data.result;

        if (data.result === "You Win") {

        wins++;

        winnerElement.style.color =
            "lightgreen";

        }
        else if (data.result === "Computer Wins")  {

        losses++;

        winnerElement.style.color =
            "red";

        }
        else {

        draws++;

        winnerElement.style.color =
            "orange";
        }

        localStorage.setItem(
            "wins",
            wins
        );

        localStorage.setItem(
            "losses",
            losses
        );

        localStorage.setItem(
            "draws",
            draws
        );

        updateScoreboard();

    } catch (error) {

        console.error(error);

        alert("Something went wrong!");
    }
}

function resetScores(){

    wins = 0;
    losses = 0;
    draws = 0;

    localStorage.setItem(
        "wins",
        0
    );

    localStorage.setItem(
        "losses",
        0
    );

    localStorage.setItem(
        "draws",
        0
    );

    updateScoreboard();
}