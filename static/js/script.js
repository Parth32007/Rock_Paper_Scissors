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

            winnerElement.style.color = "lightgreen";

        } else if (data.result === "Computer Wins") {

            winnerElement.style.color = "red";

        } else {

            winnerElement.style.color = "orange";
        }

    } catch (error) {

        console.error(error);

        alert("Something went wrong!");
    }
}