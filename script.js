const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');


const words = [];

// Init word
let randomWord;

// Init score
let score = 0;

// Init time
let time = 10;

//Set difficulty to value in local storage or to default 'medium'
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';


//Set difficulty select value
difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';


//focus on text on start
text.focus();

//Start counting down
const timeInterval = setInterval(updateTime, 1000);


//get random words from API
async function getRandomWord() {
    const res = await fetch('https://random-word-api.herokuapp.com/word?number=1');
    const data = await res.json();
    return data[Object.keys(data)[0]].toLowerCase();
}


//add word to DOM
async function addWordToDOM() {
    randomWord = await getRandomWord();
    word.innerHTML = randomWord;
}
addWordToDOM();


//Update Score
function updateScore() {
    score++;
    scoreEl.innerHTML = score;
}

//Update Time
function updateTime() {
    time--;
    timeEl.innerHTML = time + 's';
    if (time === 0) {
        clearInterval(timeInterval);
        gameOver();
    }
}

//Game Over, show end screen

function gameOver() {
    endgameEl.innerHTML = `
    <h1>Time ran out!</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Play again</button>
    `;

    endgameEl.style.display = 'flex';
}

//Event Listener

//Typing
text.addEventListener('input', e => {
    const insertedText = e.target.value.toLowerCase();

    if (insertedText === randomWord) {
        addWordToDOM();
        updateScore();

        //Clear the input
        e.target.value = '';

       if (difficulty === 'hard') {
            time += 4;
        } else if (difficulty === 'medium') {
            time += 5;
        } else {
            time += 6;
        }

        updateTime();
    }
});

//Settings button click

settingsBtn.addEventListener('click', () => {
    settings.classList.toggle('hide');
});

//settings select
settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
})
