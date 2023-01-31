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
    for(let i = 0; i < games.length; i++){
        let gameDiv = document.createElement("div");
        gameDiv.classList.add("game-card")

        gameDiv.innerHTML = `
            <img src = "${games[i].img}" class="game-img" />
            <h3> ${games[i].name}</h3>
            <h4> ${games[i].description}</h4>
            <h4> Backers: ${games[i].backers}</h4>
        `
        gamesContainer.appendChild(gameDiv);
    }
    // loop over each item in the data
        // create a new div element, which will become the game card
        // add the class game-card to the list
        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        // append the game to the games-container
}
// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

const totalBacker = GAMES_JSON.reduce((numBackers, game) => {
    return numBackers += game.backers;
}, 0).toLocaleString('en-US');

let backerVal = document.createElement("div");
backerVal.innerHTML = `${totalBacker}`
contributionsCard.appendChild(backerVal);
// use reduce() to count the number of total contributions by summing the backers
// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
let totalMoney = GAMES_JSON.reduce((moneyRaised, game) =>{
    return moneyRaised += game.pledged;
}, 0).toLocaleString('en-US');
let raisedVal = document.createElement("div");
raisedVal.innerHTML = `$${totalMoney}`;
raisedCard.appendChild(raisedVal);
// set inner HTML using template literal


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
let numGames = GAMES_JSON.length;
let totalGames = document.createElement("div");
totalGames.innerHTML = `${numGames}`
gamesCard.appendChild(totalGames);

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    let unfundedGames = GAMES_JSON.filter((game) => {
        return game.pledged < game.goal;
    });
    // use filter() to get a list of games that have not yet met their goal
    addGamesToPage(unfundedGames);
    // use the function we previously created to add the unfunded games to the DOM
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    let fundedGames = GAMES_JSON.filter((game) => {
        return game.pledged > game.goal;
    });
    // use filter() to get a list of games that have met or exceeded their goal
    addGamesToPage(fundedGames);
    // use the function we previously created to add unfunded games to the DOM
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);
// add event listeners with the correct functions to each button


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
function findNumUnfunded(){
    let unfundedList = GAMES_JSON.filter((game) => {
        return game.pledged < game.goal;
    });
    return unfundedList;
}
let arr = findNumUnfunded();
let numUnfunded = arr.length;

function findNumFunded(){
    let fundedList = GAMES_JSON.filter((game) => {
        return game.pledged > game.goal;
    });
    return fundedList;
}

let fundedArr = findNumFunded();
let fundedRaised = fundedArr.reduce((val, game) =>{
    return val += game.pledged;
}, 0).toLocaleString('en-US');
let numFunded = fundedArr.length;

// create a string that explains the number of unfunded games using the ternary operator
// create a new DOM element containing the template string and append it to the description container
const stringDisplay = document.createElement("p");
stringDisplay.innerHTML = ` A total of $${fundedRaised} has been raised for ${numFunded} games. Currently, ${numUnfunded} games remain unfunded. We need your help to fund these amazing games!`
descriptionContainer.appendChild(stringDisplay);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

let top2Funded = [...sortedGames[1]];
// use destructuring and the spread operator to grab the first and second games

// create a new element to hold the name of the top pledge game, then append it to the correct element

// do the same for the runner up item