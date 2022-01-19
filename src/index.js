import { DATA_QUIZ } from './components/DATA.js';

import './styles/index.scss';

const container = document.querySelector('.container');
const btnSignIn = document.querySelector('.button.signIn');
const btnLogIn = document.querySelector('.button.logIn');

const containFirstWin = document.querySelector('.contain.containAutorisation');
const containFormLogIn = document.querySelector('.contain.containLogIn');

const formaLogIn = document.forms.logIn;
const btnCompleteLogIn = document.querySelector('.button.completeLogIn');

const formSignIn = document.forms.signIn;
const btnCompleteSignIn = document.querySelector('.button.completeSignIn');

const btnStartQuiz = document.querySelector('.button.startQuiz');

const formQuiz = document.forms.quiz;
const btnNextQuestion = document.querySelector('.button.nextQuestion');
const numbersQuestions = document.querySelector('.numbers');
const questionText = document.querySelector('.question');
const options = Array.from(document.querySelectorAll('.containOption input'));
const labels = Array.from(document.querySelectorAll('.containOption label'));

const containFinal = document.querySelector('.containfinal');
const score = document.querySelector('.score');
const btnQuite = document.querySelector('.button.quite');

let count = 0;

let rightAnswers = [];
for (let obj of DATA_QUIZ) {
    rightAnswers.push(obj.answer);
}

let userAnswers = [];


function displayFormLogIn() {
    containFirstWin.classList.toggle('displayNone');
    containFormLogIn.classList.toggle('displayNone');
}

function takeValuesLogIn() {
    let user = new Object;
    user.name = formaLogIn.elements.firstName.value;
    user.surname = formaLogIn.elements.secondName.value;
    user.age = formaLogIn.elements.age.value;
    let genders = formaLogIn.elements.gender;
    for (let gender of genders) {
        if (gender.checked) {
            user.gender = gender.value;
        }
    }
    user.password = formaLogIn.elements.password.value;
    
    return user;
}

function isRequired(obj) {
    let arr = [];
    for (let key in obj) {
        arr.push(obj[key]);
    }
    return !arr.some((elem) => elem === '');
}

function displayFormSignIn() {
    containFirstWin.classList.toggle('displayNone');
    formSignIn.classList.toggle('displayNone');
}

function takeValuesSignIn() {
    let user = new Object;
    user.name = formSignIn.elements.firstName.value;
    user.password = formSignIn.elements.password.value;
    return user;
}


btnLogIn.addEventListener('click', displayFormLogIn);

btnSignIn.addEventListener('click', displayFormSignIn);


btnCompleteLogIn.addEventListener('click', () => {
    if (!isRequired(takeValuesLogIn())) {
        displayModWin(container, 'Fill in all the fields');
    } else {
        localStorage.setItem('object', JSON.stringify(takeValuesLogIn()));
        formaLogIn.reset();
        containFormLogIn.classList.toggle('displayNone');
        btnStartQuiz.classList.toggle('displayNone');
    }
});

btnCompleteSignIn.addEventListener('click', () => {
    let user = takeValuesSignIn();
    if (!isRequired(user)) {
        displayModWin(container, 'Fill in all the fields');
    } else {
        let localUser = JSON.parse(localStorage.getItem('object'));
        if(user.name === localUser.name && user.password === localUser.password) {
            formSignIn.classList.toggle('displayNone');
            btnStartQuiz.classList.toggle('displayNone');
        } else {
            displayModWin(container, 'You have not registered!')
            formSignIn.classList.toggle('displayNone');
            containFormLogIn.classList.toggle('displayNone');
            
        }
    }
});




function fillValue() {
    numbersQuestions.innerText = `${DATA_QUIZ[count].id} из ${DATA_QUIZ.length}`;
    questionText.innerText = `${DATA_QUIZ[count].question}`;
    for (let i = 0; i < DATA_QUIZ[count].options.length; i++) {
        labels[i].innerText = `${DATA_QUIZ[count].options[i]}`;
    }
    count++;
}

function changeValues(event) {
    event.preventDefault();
    if (count < DATA_QUIZ.length) {
        fillValue();
    }else if (count == DATA_QUIZ.length) {
        formQuiz.classList.toggle('displayNone');
        containFinal.classList.toggle('displayNone');
        count = 0;

        let countWrong = 0;
        for (let i = 0; i < userAnswers.length; i++) {
            if (userAnswers[i] !== rightAnswers[i]) {
                countWrong++;
            }
        }
        let totalScore = Math.floor(((DATA_QUIZ.length - countWrong) * 100)/DATA_QUIZ.length);
        score.innerText = `${totalScore} %`;
    }
}



btnStartQuiz.addEventListener('click', () => {
    btnStartQuiz.classList.toggle('displayNone');
    formQuiz.classList.toggle('displayNone');
    fillValue();
});

btnNextQuestion.addEventListener('click', changeValues);

btnNextQuestion.addEventListener('click', () => {
    for (let i = 0; i < options.length; i++) {
        if(options[i].checked) {
            userAnswers.push(Number(options[i].value));
        }
    }
});

btnQuite.addEventListener('click', () => {
    containFinal.classList.toggle('displayNone');
    btnStartQuiz.classList.toggle('displayNone');

    userAnswers = [];
});


function displayModWin(container, text) {
    let containModWin = document.createElement('div');
    let titleModWin = document.createElement('h3');
    let textModWin = document.createElement('p');
    let buttonModWin = document.createElement('button');

    containModWin.classList.add('contain', 'containModWin');
    titleModWin.innerText = 'Error!';
    textModWin.innerText = text;
    buttonModWin.innerText = 'Ok';
    buttonModWin.classList.add('button');

    container.append(containModWin);
    containModWin.append(titleModWin);
    containModWin.append(textModWin);
    containModWin.append(buttonModWin);

    buttonModWin.addEventListener('click', () => {
        containModWin.remove();
    })
}