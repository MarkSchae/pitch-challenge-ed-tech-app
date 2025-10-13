// Play the sound, internally stored example sound for now
const letterSound = new Audio('../../src/audio/S.mp3'); 
const explainSound = new Audio('../../src/audio/explain-xhosa.mp3');
const explainSoundCont = new Audio('../../src/audio/explain-cont.mp3'); // Listen to the letter sounds carefully. Look at the letter on the screen
// Click the letter that makes the sound (Cofa ileta eyenza isandi)
const clickAnswer = new Audio('../../src/audio/click-answer.mp3');
// Correct, well done! Kulungile, wenze kakuhle!
const wellDoneSound = new Audio('../../src/audio/correct-well-done.mp3');
// Keep trying, you are doing great! Qhubeka uzame, wenza kakuhle kakhulu!
const keepTryingSound = new Audio('../../src/audio/keep-trying.mp3')

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
    welcome.innerText = 'Hello, please listen carefully and enjoy!'; // Molo, nceda mamela ngononophelo kwaye wonwabele! Mamela iingoma zeeleta ngononophelo. Jonga ileta esikrinini.
    welcome.classList.add(...letterStyles.split(' '));
    letterContainer.append(welcome);

    explainSound.play();

    // Listen for the end of the audio then trigger the count down to gameloop
    explainSound.addEventListener('ended', () => {
        explainSoundCont.play();
        explainSoundCont.addEventListener('ended', () => {
            letter.innerText = '';
            // Run the count down function after the explain sound
            countDownTimer(welcome, gameLoop); // Reusing the welcome dom element for the timer
        }, {once: true}); // Removes the listner after one call

    }, {once: true});
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
    clickAnswer.play();
    clickAnswer.addEventListener('ended', () => {
        letterSound.play();
    });
    const letterPlayBtn = document.createElement('button');
    letterPlayBtn.innerText = 'Click me!';
    const mainContainer = document.getElementById('main-container');
    letterPlayBtn.classList.add('flex', 'w-fit', 'justify-center', 'bg-blue-700', 'p-2', 'rounded-2xl', 'hover:shadow-2xl', 'hover:cursor-pointer');
    mainContainer.append(letterPlayBtn);
    let soundClicks = 0;
    letterPlayBtn.addEventListener('click', () => {
        letterSound.play();
        soundClicks++;
        if(soundClicks === 3) {
            letterSound.volume = 1.0;
            letterSound.playbackRate = 0.3;
        }
    });
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
            wellDoneSound.play();
        } else {keepTryingSound.play();}
    }));
}