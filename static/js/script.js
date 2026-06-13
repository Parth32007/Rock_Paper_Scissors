// Load scores from localStorage

let wins =
    Number(localStorage.getItem("wins")) || 0;

let losses =
    Number(localStorage.getItem("losses")) || 0;

let draws =
    Number(localStorage.getItem("draws")) || 0;

let currentStreak =
    Number(
        localStorage.getItem(
            "currentStreak"
        )
    ) || 0;

let bestStreak =
    Number(
        localStorage.getItem(
            "bestStreak"
        )
    ) || 0;

// Run when page loads

window.onload = function () {

    updateScoreboard();
    updateTotalGames();
    loadPlayerName();
    updateStatistics();

};


// Save player name

function saveName() {

    const name =
        document.getElementById(
            "player-name"
        ).value;

    if (name.trim() === "") {
        return;
    }

    localStorage.setItem(
        "playerName",
        name
    );

    loadPlayerName();
}


// Load player name

function loadPlayerName() {

    const name =
        localStorage.getItem(
            "playerName"
        );

    if (name) {

        document.getElementById(
            "welcome-text"
        ).textContent =
            "Welcome, " + name + "!";
    }
}


// Update scoreboard

function updateScoreboard() {

    document.getElementById(
        "wins"
    ).textContent = wins;

    document.getElementById(
        "losses"
    ).textContent = losses;

    document.getElementById(
        "draws"
    ).textContent = draws;
}


// Update total games

function updateTotalGames() {

    const total =
        wins +
        losses +
        draws;

    document.getElementById(
        "total-games"
    ).textContent =
        "Total Games Played: " +
        total;
}

function updateStatistics(){

    const total =
        wins +
        losses +
        draws;

    let winRate = 0;
    let lossRate = 0;
    let drawRate = 0;

    if(total > 0){

        winRate =
            ((wins / total) * 100)
            .toFixed(1);

        lossRate =
            ((losses / total) * 100)
            .toFixed(1);

        drawRate =
            ((draws / total) * 100)
            .toFixed(1);
    }

    document.getElementById(
        "win-percent"
    ).textContent =
        "Win Rate: " +
        winRate +
        "%";

    document.getElementById(
        "loss-percent"
    ).textContent =
        "Loss Rate: " +
        lossRate +
        "%";

    document.getElementById(
        "draw-percent"
    ).textContent =
        "Draw Rate: " +
        drawRate +
        "%";

    document.getElementById(
        "current-streak"
    ).textContent =
        "Current Win Streak: " +
        currentStreak;

    document.getElementById(
        "best-streak"
    ).textContent =
        "Best Win Streak: " +
        bestStreak;
}

// Reset scores

function resetScores() {

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

    currentStreak = 0;

    bestStreak = 0;

    localStorage.setItem(
        "currentStreak",
        0
    );

    localStorage.setItem(
        "bestStreak",
        0
    );

    updateScoreboard();
    updateTotalGames();
    updateStatistics();
}


// Play game

async function playGame(choice) {

    try {

        const response =
            await fetch("/play", {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    choice: choice
                })
            });

        const data =
            await response.json();

        document.getElementById(
            "user-choice"
        ).textContent =
            "Your Choice: " +
            data.user;

        document.getElementById(
            "computer-choice"
        ).textContent =
            "Computer Choice: " +
            data.computer;

        const winnerElement =
            document.getElementById(
                "winner"
            );

        winnerElement.textContent =
            "Winner: " +
            data.result;


        if (data.result === "You Win") {

            wins++;

            currentStreak++;

            if(
                currentStreak >
                bestStreak
            ){
                bestStreak =
                    currentStreak;
            }

            winnerElement.style.color =
                "lightgreen";

        }
        else if (
            data.result ===
                "Computer Wins"
        ) {

            losses++;

            currentStreak = 0;

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

        localStorage.setItem(
            "currentStreak",
            currentStreak
        );

        localStorage.setItem(
            "bestStreak",
            bestStreak
        );

        updateScoreboard();
        updateTotalGames();
        updateStatistics();

    }
    catch (error) {

        console.error(error);

        alert(
            "Something went wrong!"
        );
    }
}