const gameCover = document.getElementById("game__cover");
const gameTitle = document.getElementById("game__title");
const gameDescription = document.getElementById("game__description");

const selectedGame = JSON.parse(localStorage.getItem("selectedGame"));
console.log(selectedGame);

if (selectedGame) {
    gameCover.src = selectedGame.background_image;
    gameTitle.textContent = selectedGame.name;
    gameDescription.textContent = selectedGame.description;
} else {
    window.location.href = "index.html";
}

