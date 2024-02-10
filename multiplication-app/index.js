const num1 = Math.ceil(Math.random()*12);
const num2 = Math.ceil(Math.random()*12);

const questionEl = document.getElementById('question');

const inputEl = document.getElementById('input');

const formEl = document.getElementById('form');

let score = JSON.parse(localStorage.getItem('score'));
if (!score) {
    score = 0;
}

const scoreEl = document.getElementById('score');
scoreEl.innerText = `Score: ${score}`

questionEl.innerText = `What is ${num1} multiplied by ${num2}?`;

const correctAns = num1 * num2;

formEl.addEventListener('submit', () => {
    const userAns = + inputEl.value;
    if (userAns === correctAns) {
        score++;
        updateLocalStorage();
    } else {
        if (score <=0) {
            score = 0;
        } else {
            score--;
        }
        updateLocalStorage();
    }
});

function updateLocalStorage() {
    localStorage.setItem('score', JSON.stringify (score))
}