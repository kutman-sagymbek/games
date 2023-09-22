const API_KEY = '579f986667bc4ce7895d2240205a4746';
const API_URL = `https://rawg.io/api/games?token&key=${API_KEY}`;

let filterInput = document.getElementById("filterInput");
let filterByAlphabet = document.querySelector(".alphabet");
let filterByRating = document.querySelector(".rating");
let loadMoreBtn = document.querySelector(".load-moreBtn");
let currentSortingCriteria = 'alphabet';
let currentPage = 1;
let itemsPerPage = 3;
let gamesData = [];


loadMoreBtn.addEventListener("click", getMoreGames);

async function getMoreGames() {
    const API_URL_PAGE = `${API_URL}&page=${currentPage}`;
    const response = await fetch(API_URL_PAGE);
    const responseData = await response.json();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const moviesToDisplay = responseData.results.slice(startIndex, endIndex);

    if (currentSortingCriteria === 'alphabet') {
        moviesToDisplay.sort((a, b) => a.name.localeCompare(b.name));
    } else if (currentSortingCriteria === 'rating') {
        moviesToDisplay.sort((a, b) => b.rating - a.rating);
    }
    gamesData = gamesData.concat(moviesToDisplay);
    currentPage++;

    showGames(moviesToDisplay);
}
getMoreGames();

const gamesEl = document.querySelector(".games");

filterByAlphabet.addEventListener('click', alphabet);
function alphabet () {
    gamesData.sort((a, b) => a.name.localeCompare(b.name));
    console.log(gamesEl);
    gamesEl.innerHTML = "";
    showGames(gamesData);
}

filterByRating.addEventListener('click', rating);
function rating () {
    gamesData.sort((a, b) => b.rating - a.rating);
    gamesEl.innerHTML = "";
    showGames(gamesData);
}

filterInput.addEventListener('keyup', debounce(filterGames, 300));
function debounce(func, delay) {
    let timeout;
    return function() {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func();
        }, delay);
    };
}

function filterGames(){
    let filterValue = filterInput.value.toUpperCase();
    let game = gamesEl.querySelectorAll(".game");
    for(i =0; i < game.length; i++ ){
        let span = game[i].querySelector(".game__name");
        if(span.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
            game[i].style.display = "initial";
        } else {
            game[i].style.display = "none";
        }
    }
}

function showGames(data) {
    console.log(data);
    // const gamesEl = document.querySelector(".games");
    data.forEach((game) => {
        const gameEl = document.createElement("div");
        gameEl.classList.add("game");
        gameEl.innerHTML = `
                <div class="game_cover_inner">
                    <img src="${game.background_image}" alt="${game.name}" class="game_cover skeleton">
                    <div class="game__average game__average--${getClassByRating(game.rating)}">${game.rating}</div>
                </div>
                
                <div class="game__info">
                    <a class="game__name skeleton">${game.name}</a>
                    <div class="game__genre skeleton">${game.genres.map(element => element.name)}</div>
                    <div class="game__cover--darkened"></div>
                </div>
        `;

        const gameNameLink = gameEl.querySelector(".game__name");
        gameNameLink.addEventListener("click", () => {
            localStorage.setItem("selectedGame", JSON.stringify(game));
            window.location.href = "gameInfo.html";
        });
        gamesEl.appendChild(gameEl);
    })
}

function getClassByRating (vote) {
    if (vote>=4.50) {
        return "green"
    } else if (vote > 3.50) {
        return "purple"
    } else {
        return "red"
    }
}


