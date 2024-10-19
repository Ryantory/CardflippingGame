const cards = document.querySelectorAll('.card');
const doneBtn = document.getElementById('doneBtn');
const undoBtn = document.getElementById('undoBtn');
const showQuestionBtn = document.getElementById('showQuestionBtn');
const showAnswerBtn = document.getElementById('showAnswerBtn');
const questionModal = document.getElementById('questionModal');
const answerModal = document.getElementById('answerModal');
const questionText = document.getElementById('questionText');
const answerText = document.getElementById('answerText');
const closeQuestionModal = document.getElementById('closeQuestionModal');
const closeAnswerModal = document.getElementById('closeAnswerModal');
const controls = document.getElementById('controls');
const removedCardsContainer = document.getElementById('removedCardsContainer');


let answerImage = document.getElementById('answerImage'); // Get the answer image element
let questionImage = document.getElementById('questionImage'); // Get the question image element
let flippedCard = null;

const music = document.getElementById('backgroundMusic');//Get the background music

// Add event listeners to all cards
cards.forEach(card => {
    card.addEventListener('click', () => {
        if (flippedCard) {
            // If a card is already flipped, flip it back
            flippedCard.classList.remove('flipped');
            flippedCard = null;
            controls.classList.add('hidden'); // Hide controls
        }

        // Flip the clicked card
        card.classList.add('flipped');
        flippedCard = card;
        controls.classList.remove('hidden'); // Show controls
    });
});

// Function to remove the flipped card
function removeCard() {
    if (flippedCard) {
        // Create a new div for the removed card
        const removedCard = document.createElement('div');
        removedCard.classList.add('removed-card');
        removedCard.innerText = flippedCard.getAttribute('data-framework'); // Show card name
        removedCardsContainer.appendChild(removedCard);

        // Remove the card from the game
        flippedCard.remove();
        shuffledCards(); // Shuffle remaining cards
        flippedCard = null;
        controls.classList.add('hidden'); // Hide controls
    }
}

// Function to undo the last action
function undo() {
    const flippedCardElements = document.querySelectorAll('.card.flipped'); // Get all flipped cards
    flippedCardElements.forEach(card => {
        card.classList.remove('flipped'); // Remove flipped class to initiate rotation animation
    });

    // Shuffle remaining cards
    shuffledCards(); // Shuffle remaining cards
    controls.classList.add('hidden'); // Hide controls
}

// Function to shuffle remaining cards
function shuffledCards() {
    const remainingCards = Array.from(document.querySelectorAll('.card'));
    remainingCards.forEach(card => card.style.order = Math.floor(Math.random() * remainingCards.length));
}

// Show question modal
function showQuestion() {
    if (flippedCard) {
        // const question = flippedCard.getAttribute('data-question');
        const imageRef = flippedCard.getAttribute('image1-ref'); // Get the image reference(weird)
        // questionText.innerText = question;
        questionModal.classList.add('show'); // Show the modal

        stopMusic();
        playMusicFor10Seconds("Backgroundmusic/Kahoot In Game Music (10 Second Count Down) 22.mp3");

        if (imageRef) { // Check if there's an image reference
            questionImage.src = imageRef; // Set the image source based on the attribute
            questionImage.classList.remove('hidden-image'); // Make the image visible
            questionImage.classList.add('visible-image');   // Add visible class
        } else {
            questionImage.classList.add('hidden-image'); // Hide the image if no reference
        }
    }
}

// Show answer modal
function showAnswer() {
    if (flippedCard) {
        const answer = flippedCard.getAttribute('data-answer');
        const imageRef = flippedCard.getAttribute('image2-ref'); // Get the image reference
        answerText.innerText = answer;
        answerModal.classList.remove('hidden'); // Show the modal by removing 'hidden' class
        answerModal.classList.add('show'); // Add 'show' class to display the modal

        stopMusic();
        playMusic("Backgroundmusic/SUPER MARIO BROS. Themesong ( No Copyright Music ).mp3");
        if (imageRef) { // Check if there's an image reference
            answerImage.src = imageRef; // Set the image source based on the attribute
            answerImage.classList.remove('hidden-image'); // Make the image visible
            answerImage.classList.add('visible-image');   // Add visible class
        } else {
            answerImage.classList.add('hidden-image'); // Hide the image if no reference
        }
    }
}

// Close question modal
closeQuestionModal.addEventListener('click', () => {
    stopMusic();
    playMusic("Backgroundmusic/Crazy Frog - Axel F [No Copyright].mp3");
    questionModal.classList.remove('show');
});

// Close answer modal
closeAnswerModal.addEventListener('click', () => {
    answerModal.classList.remove('show');
});

//play music
function playMusic(track) {
    music.src = track; // Set the audio source to the selected track
    music.play();      // Play the audio
  }
//stop music
  function stopMusic() {
    music.pause();     // Pause the audio
    music.currentTime = 0; // Reset the audio to the beginning
  }

  function playMusicFor10Seconds(track) {
    music.src = track;
    music.play(); // Start the music

    // Stop the music after 10 seconds (10000 milliseconds)
    setTimeout(() => {
      music.pause();
      music.currentTime = 0; // Reset the music to the beginning (optional)
    }, 13000);
  }

// Attach event listeners for control buttons
doneBtn.addEventListener('click', removeCard);
undoBtn.addEventListener('click', undo);
showQuestionBtn.addEventListener('click', showQuestion);
showAnswerBtn.addEventListener('click', showAnswer);
