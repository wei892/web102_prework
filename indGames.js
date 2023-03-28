const url = new URL(location.href);
const gameName = url.searchParams.get("name");

import GAMES_DATA from './games.js';
const GAMES_JSON = JSON.parse(GAMES_DATA);

let ind;
for (let i = 0; i < GAMES_JSON.length; i++){
    if (GAMES_JSON[i].name == gameName){
        ind = i;
        break;
    }
}

const title = document.getElementById("gameTitle");
title.innerText = GAMES_JSON[ind].name;

const gameimg = document.getElementById("gameimg");
let imgContainer = document.createElement("div");
imgContainer.innerHTML = `
<div id="img"> <img src ="${GAMES_JSON[ind].img}" height="200"/> </div>`
gameimg.appendChild(imgContainer);

const p = (GAMES_JSON[ind].pledged/GAMES_JSON[ind].goal)
let progressPledge = Math.trunc(p);
const gameDesc = document.getElementById("gameDesc");
let descriptionContainer = document.createElement("div");
descriptionContainer.innerHTML = `
<br>
<div> ${GAMES_JSON[ind].description} </div>
<br>
<div> Goal: ${GAMES_JSON[ind].goal}</div>
<div> Pledged: ${GAMES_JSON[ind].pledged}</div>
<div> Backers: ${GAMES_JSON[ind].backers}</div>
<div> Progress Pledged: ${progressPledge}%</div>
`;
//src = "${games[i].img}" class="game-img" />
gameDesc.appendChild(descriptionContainer);

const imgCont = document.getElementById("imageCont");
let displayImg = document.createElement("div");
displayImg.innerHTML = GAMES.JSON[ind].img;
imgCont.appendChild(displayImg);

