// Play the sound, internally stored example sound for now
const letterSound = new Audio('../../src/audio/placeholder.mp3'); 

// Onclick event listner to load the explain game elements
const playBtn = document.getElementById('play-button');
playBtn.addEventListener('click', () => {
    // Remove the click me button element
    playBtn.classList.add('hidden');
    // Run the timer function
    countDownTimerRender();
});

// Count down timer render function
function countDownTimerRender () {
    // Display the number 3, create dynamically for now
    const timer = document.createElement('div');
    const timerContainer = document.getElementById('main-container');
    const timerStyles = 'flex items-center justify-center h-screen w-fit text-6xl';
    timer.classList.add(...timerStyles.split(' '));
    timer.id = 'count-down-timer-id';
    timer.innerText = 3;
    timerContainer.append(timer);
    // Run the count down function
    countDownTimer(timer, explainGameRender);
}

// Count-down timer function
function countDownTimer (timer, finishFn) {
    // Get the innertext of the timer and count back in seconds
    let time = timer.innerText;

    // Handle string cases
    if (typeof(time) === 'string') {
        timer.innerText = 3;
        time = timer.innerText;
    }

    const interval = setInterval(() => {
        time--;
        timer.innerText = time;

        if (time < 0) {
            clearInterval(interval);
            timer.classList.add('hidden');
            if(typeof(finishFn) === 'function') {
                finishFn();
            }
        }
    },1000);
}

function explainGameRender () {
    // Display the letter, can just hardcode for now, going to have to create a helper fn for creating the div and styles
    const letter = document.createElement('div');
    const letterContainer = document.getElementById('main-container');
    const letterStyles = 'flex items-center justify-center h-screen w-fit text-6xl';
    letter.classList.add(...letterStyles.split(' '));
    letter.id = 'letter-id';
    letter.innerText = 'S'; // Maybe add animation for the letter
    letterContainer.append(letter);

    // Create the elements for the explanation
    const welcome = document.createElement('div');
    welcome.id = 'text-div-id';
    welcome.innerText = 'Hello, please listen carefully and enjoy!';
    welcome.classList.add(...letterStyles.split(' '));
    letterContainer.append(welcome);

    letterSound.play();

    // Listen for the end of the audio then trigger the count down to gameloop
    letterSound.addEventListener('ended', () => {
        letter.innerText = '';
        // Run the count down function after the explain sound
        countDownTimer(welcome, gameLoop);
    }, {once: true}); // Removes the listner after one call
    
    // Might add a option to play the instructions again
}

function gameLoop () {
    // The logic for the game loop 
    const letters = document.getElementById('letter-id');
    //letters.innerText = 'X S B';
    const optionOne = document.createElement('div');
    optionOne.innerText = 'B';
    const optionTwo = document.createElement('div');
    optionTwo.innerText = 'S';
    const optionThree = document.createElement('div');
    optionThree.innerText = 'X';
    letters.append(optionOne, optionTwo, optionThree);
    letters.classList.add('justify-evenly', 'w-full');
    letters.querySelectorAll('*').forEach(letter => letter.classList.add('hover:bg-amber-600', 'cursor-pointer')); 
    const choose = document.getElementById('text-div-id');
    choose.classList.remove('hidden');
    choose.innerText = 'Choose the letter that makes the sound'; // Play the sound again?
    letterSound.play();
    // Run the function that checks for clicks/answer with the letters as a argument
    letterClick(letters);
}

// Click event listeners on the letters
function letterClick (lettersContainer) {
    const letters = lettersContainer.querySelectorAll('*');
    letters.forEach(letter => letter.addEventListener('click', () => {
        if(letter.innerText === 'S') {
            lettersContainer.innerHTML = '';
            lettersContainer.innerText = 'Correct, well done!';
        }
    }));
}