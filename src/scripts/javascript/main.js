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
    const timerStyles = 'flex items-center justify-center w-fit text-6xl';
    timer.classList.add(...timerStyles.split(' '));
    timer.id = 'count-down-timer-id';
    timer.innerText = 3;
    timerContainer.append(timer);
    // Run the count down function
    countDownTimer(timer, explainGameRender);
}

// Count-down timer function
function countDownTimer (timer, finishFn) {
    timer.classList.remove('hidden');
    // Get the innertext of the timer and count back in seconds
    let time = timer.innerText;

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
    const letterStyles = 'flex items-center justify-center w-fit text-6xl';
    letter.classList.add(...letterStyles.split(' '));
    letter.id = 'letter-id';
    letter.innerText = 'S'; // Maybe add animation for the letter
    letterContainer.append(letter);

/*     // Create the elements for the explanation
    const welcome = document.createElement('div');
    welcome.id = 'text-div-id';
    welcome.innerText = 'Hello, please listen carefully and enjoy!'; // Molo, nceda mamela ngononophelo kwaye wonwabele! Mamela iingoma zeeleta ngononophelo. Jonga ileta esikrinini.
    welcome.classList.add(...letterStyles.split(' '));
    letterContainer.append(welcome); */

    explainSound.play();

    // Listen for the end of the audio then trigger the count down to gameloop
    explainSound.addEventListener('ended', () => {
        explainSoundCont.play();
        explainSoundCont.addEventListener('ended', () => {
            letter.innerText = '';
            const timer = document.getElementById('count-down-timer-id');
            timer.innerText = 3;
            // Run the count down function after the explain sound
            countDownTimer(timer, gameLoop); // Reusing the welcome dom element for the timer
        }, {once: true}); // Removes the listner after one call

    }, {once: true});
    // Might add a option to play the instructions again
}

function gameLoop () {
    // Remove the sprites from the landing page
    const walkingBoy = document.getElementById('walking-boy-character');
    walkingBoy.classList.add('hidden');
    const blueDude = document.getElementById('blue-dude');
    blueDude.classList.add('hidden');
    // Change the background to the game screen background
    const backgroundScreen = document.getElementById('body-container');
    backgroundScreen.classList.remove('bg-[url(../../images/space-sunrise-landing-page.png)]');
    backgroundScreen.classList.add('bg-[url(../../images/game-screen-nature.png)]');
    const titleContainer = document.getElementById('title-container');
    titleContainer.classList.add('hidden');
    const dragon = document.getElementById('dragon');
    dragon.classList.remove('hidden');
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
/*   const choose = document.getElementById('text-div-id');
    choose.classList.remove('hidden'); */
    //choose.innerText = 'Choose the letter that makes the sound'; // Play the sound again?
    clickAnswer.play();
    clickAnswer.addEventListener('ended', () => {
        letterSound.play();
    });
    const letterPlayBtn = document.createElement('button');
    letterPlayBtn.innerText = 'Click me!';
    const mainContainer = document.getElementById('main-container');
    mainContainer.classList.add('h-screen');
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
            const dragon = document.getElementById('dragon');
            dragon.classList.add('hidden');
            wellDoneSound.play();
            lettersContainer.innerText = '';
            const coolCatGif = document.createElement('img');
            coolCatGif.src = '../../src/images/wink.gif';
            coolCatGif.classList.add('w-[30vw]', 'absolute', 'top-7');
            lettersContainer.append(coolCatGif);
        } else {keepTryingSound.play();}
    }));
}

function letterShadow (words) {
    //const titles = document.querySelectorAll('.title-letters');
    words.forEach(word => {
        const letterText = word.innerText
        word.innerText = '';
        letterText.split('').forEach(letter => {
            const spanLetter = document.createElement('span');
            spanLetter.innerText = letter;
            spanLetter.classList.add('text-shadow');
            spanLetter.style.setProperty('--shadow-text', `'${letter}'`);
            word.append(spanLetter);
        })
    });
}
const titles = document.querySelectorAll('.title-letters');
const startBtn = document.querySelectorAll('#play-button');
// Layering styling on each letter to make it look 3D and fit the vibrant theme of a game for kids
letterShadow(titles); 
letterShadow(startBtn);

// Calling the explosion where the user clicks (not sure what I want to do here yet but the explosion is working well)
document.body.addEventListener('click', (event) => {
    sprite.classList.remove('hidden');
    const x = event.pageX;
    const y = event.pageY;
    playExplosion(x, y);
});
// Explosion of correct letter
const sprite = document.getElementById('letter-explosion');
const totalFrames = 11; // 0–10
const frameWidth = 32; 
const fps = 15; // 66.7ms per frame recommended by assest creator

// Split the img(spritesheet) into seperate frames by a specific width,
// Use the width and timing of the animation to move the frames(background) to the left creating the animation 
function playExplosion(x, y) {
    let frame = 0;

    // Position the explosion
    if (x !== null && y !== null) {
        sprite.style.left = `${x}px`;
        sprite.style.top = `${y}px`;
        sprite.style.transform = `translate(-50%, -50%)`;
    }

    const intervalId = setInterval(() => {
        // Move the img to the left every width (32px) x the frame number (for every frame multiply by width to get the position of the next frame)
        sprite.style.backgroundPosition = `-${frame * frameWidth}px 0`;
        frame++;
        if (frame >= totalFrames) {
        clearInterval(intervalId);
        sprite.classList.add('hidden');
        sprite.style.backgroundPosition = `0 0`; // reset
        }
    }, 1000 / fps); // Frames per second (1000ms)
}


