const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get('id');

async function loadGameInfo() {
    try {
        if (gameId) {
            const API_KEY = '579f986667bc4ce7895d2240205a4746';
            const API_URL = `https://rawg.io/api/games/${gameId}?token&key=${API_KEY}`;
            console.log(API_URL)

            const response = await fetch(API_URL);
            const gameData = await response.json();

            const gameInfoCover = document.getElementById("game-info__cover");
            const gameTitle = document.getElementById("gameTitle");
            const gameDescription = document.getElementById("gameDescription");

            gameInfoCover.innerHTML = `<img class="gameCover" src="${gameData.background_image}" alt="${gameData.name}" />`;
            gameTitle.textContent = gameData.name;
            gameDescription.textContent = gameData.description;
        } else {
            console.log("No game selected.");
        }
    } catch (error) {
        console.error("Error loading game info:", error);
    }
}
loadGameInfo();