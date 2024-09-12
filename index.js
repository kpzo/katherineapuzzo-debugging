const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.querySelectorAll('p'); // wasn't selecting the proper elements from html
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');

let targetNumber;
let attempts = 0;
const maxNumberOfAttempts = 5;

// was missing the definition of the array that was used in the hideAllMessages function
const messageArray = Array.from(messages);

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// was '<=' but should have just been '<' below, also moved the function to the top of the file
function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < messageArray.length; elementIndex++) {
    messageArray[elementIndex].style.display = 'none';
  }
}

function setup() { // moved this function to the top of the file
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts - this was using the wrong variable name
  attempts = 0;

  // Enable the input and submit button
  submitButton.disabled = false;
  guessInput.disabled = false;

  hideAllMessages();
  reset.style.display = 'none';
}


function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value);
  attempts = attempts + 1;

  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;

    correctMessage.style.display = '';

    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  if (guess !== targetNumber) {

    hideAllMessages(); // this was in the wrong section of the function

    if (guess < targetNumber) {
      tooLowMessage.style.display = '';
    } else {
      tooHighMessage.style.display = ''; // this repeated the tooLowMessage variable, and needed to be changed to output the proper message
    }

    const remainingAttempts = maxNumberOfAttempts - attempts;

    numberOfGuessesMessage.style.display = '';
    if (remainingAttempts < 0) {
      remainingAttempts = 0;
    }

    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining`;
  }

  if (attempts === maxNumberOfAttempts) {
    submitButton.disabled = true; // there was a typo here
    guessInput.disabled = true;
  }

  guessInput.value = '';

  resetButton.style.display = '';
}


submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);

setup();
