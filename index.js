/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    for (let game of games) {
        let gameCard = document.createElement("div");
        gameCard.classList.add("game-card");

        gameCard.innerHTML = `
            <img class="game-img" src="${game.img}" alt="${game.name}">
            <h3>${game.name}</h3>
            <p>Backers: ${game.backers.toLocaleString()}</p>
            <p>Goal: $${game.goal.toLocaleString()}</p>
        `;

        gamesContainer.appendChild(gameCard);
    }
}

// Call the function with GAMES_JSON
addGamesToPage(GAMES_JSON);


// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((acc, game) => acc + game.backers, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions.toLocaleString()}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `${GAMES_JSON.length}`;


//*************************************************************************************
// * Challenge 5: Add functions to filter the funded and unfunded games
// * total number of contributions, amount donated, and number of games on the site.
// * Skills used: functions, filter
// */


function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
 

    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
    console.log("Number of unfunded games:", unfundedGames.length);

    addGamesToPage(unfundedGames);
 }
 

 function filterFundedOnly() {
    deleteChildElements(gamesContainer);
 

    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
    console.log("Number of funded games:", fundedGames.length);

    addGamesToPage(fundedGames);
 }

 function showAllGames() {
    deleteChildElements(gamesContainer);
 

    addGamesToPage(GAMES_JSON);
 }
 

 const unfundedBtn = document.getElementById("unfunded-btn");
 const fundedBtn = document.getElementById("funded-btn");
 const allBtn = document.getElementById("all-btn");
 

 unfundedBtn.addEventListener("click", filterUnfundedOnly);
 fundedBtn.addEventListener("click", filterFundedOnly);
 allBtn.addEventListener("click", showAllGames);
 


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

if (descriptionContainer) {
    // use filter to count the number of unfunded games
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

    // create a string that explains the number of unfunded games using the ternary operator
    const descriptionText = `
        <p>There are ${unfundedGames.length} unfunded games out of ${GAMES_JSON.length} games on the site. 
        ${unfundedGames.length > 0 ? 'These games have not met their funding goal.' : 'All games have met or exceeded their funding goal.'}</p>
    `;

    // create a new DOM element containing the template string
    const descriptionElement = document.createElement("div");
    descriptionElement.innerHTML = descriptionText;

    // append the new element to the description container
    descriptionContainer.appendChild(descriptionElement);
} else {
    console.error("Description container not found.");
}

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

// Grab the containers where the game names will be displayed
const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

// Sort the games in descending order based on the pledged amount
const sortedGames = GAMES_JSON.sort((item1, item2) => item2.pledged - item1.pledged);

// Use destructuring to grab the first and second games
const [firstGame, secondGame] = sortedGames;

// Create new elements to hold the names of the top 2 games and append them to the containers
const firstGameElement = document.createElement("p");
firstGameElement.textContent = `Top Pledge: ${firstGame.name} - $${firstGame.pledged.toLocaleString()}`;
firstGameContainer.appendChild(firstGameElement);

const secondGameElement = document.createElement("p");
secondGameElement.textContent = `Runner Up: ${secondGame.name} - $${secondGame.pledged.toLocaleString()}`;
secondGameContainer.appendChild(secondGameElement);
