let user, comp, winner, chance = 10

let userScoreVal=0,compScoreVal=0;

decode = {
    '1': 'rock',
    '0': 'paper',
    '-1': 'scissor',
}

const userScore = document.querySelector('#userScore')
const compScore = document.querySelector('#compScore')
const feedback = document.querySelector('#feedback')
const chanceDisplay = document.querySelector('#chance')
const newGameDiv = document.querySelector('#newGameDiv')


// pick user choice
const choices = document.querySelectorAll(".items");
choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    user = e.target.id;
    // assign value of user choice
   
    if (user === decode[1]) user = 1;
    else if (user === decode[0]) user = 0;
    else if (user === decode[-1]) user = -1;
    
    genComp(user)
    chance = chance - 1
    chanceDisplay.innerHTML = `<h1>Chance Left : ${chance}</h1>`
    if(chance === 0) gameEnd();
    
  });
});

    
// genetate comp choice
function genComp(user) {
   comp = Math.floor(Math.random() * 3) - 1;
   decisionWinner(user,comp);
}

/*
decode = {
        '1': 'rock',
        '0': 'paper',
        '-1': 'scissor',
    } #                                ALGORITHM 

#                         L     W     W      L     W     L                           
        # player          -1    0     1      0     -1     1
        # computer         1    1     -1    -1     0      0
#         C-P              2    1     -2     -1    1      -1   

# so here player win on when result is -2 and 1     */


function decisionWinner(user,comp){
    
    result = comp - user;
    if(result === -2 || result === 1 ) {
        feedback.innerHTML =`user win | You: ${decode[user]} Comp: ${decode[comp]}`
        userScoreVal = userScoreVal + 1;
        userScore.innerHTML = `${userScoreVal}`
        
    }
    else if(result === 2 || result === -1 ) {
        feedback.innerHTML =`comp win | You: ${decode[user]} Comp: ${decode[comp]}`;
        compScoreVal = compScoreVal + 1;
        compScore.innerHTML = `${compScoreVal}`
        
    }else{
        feedback.innerHTML =`Draw | You: ${decode[user]} Comp: ${decode[comp]}`;
    }
}

function gameEnd() {

    choices.forEach((choice) => {
        // choice.setAttribute = 'disabled'
        choice.style.pointerEvents = 'none';
    })

    if(userScoreVal > compScoreVal) winner = `Congratulations! You Won`
    else if(userScoreVal < compScoreVal) winner = `Oops! You Lose`
    else if(userScoreVal === compScoreVal) winner = `No winner ! match tie`
    feedback.innerHTML = `Final Result : ${winner}`

    newgame()

}

function newgame(){
    newGameDiv.innerHTML = `<button id = 'newGameButton'><h1>Start New Game</h1></buttton>`
    document.getElementById('newGameButton').addEventListener('click',() => {
        window.location.reload()
    })
}

// Learning from this project.
/* 
Q.Why setAttribute('disabled', 'true') doesn't work:
=> The disabled attribute is recognized by browsers for only certain types of HTML elements (like form elements), and it will prevent user interaction for those elements. However, for general elements like <div>, <span>, or any clickable element that is not a form control, the disabled attribute doesn't apply.
For other elements, you need to use CSS properties, like pointer-events, to achieve the desired effect of disabling clicks.

Q.Why pointerEvents = 'none' works:
=> pointer-events is a CSS property that controls whether or not an element can respond to pointer (mouse, touch) events. Setting pointer-events: none; on an element completely disables any mouse clicks, hover effects, and other mouse interactions. */





