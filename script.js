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

let flippedCard = null;

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
        const question = flippedCard.getAttribute('data-question');
        questionText.innerText = question;
        questionModal.classList.add('show'); // Show the modal
    }
}

// Show answer modal
function showAnswer() {
    if (flippedCard) {
        const answer = flippedCard.getAttribute('data-answer');
        answerText.innerText = answer;
        answerModal.classList.add('show'); // Show the modal
    }
}

// Close question modal
closeQuestionModal.addEventListener('click', () => {
    questionModal.classList.remove('show');
});

// Close answer modal
closeAnswerModal.addEventListener('click', () => {
    answerModal.classList.remove('show');
});

// Attach event listeners for control buttons
doneBtn.addEventListener('click', removeCard);
undoBtn.addEventListener('click', undo);
showQuestionBtn.addEventListener('click', showQuestion);
showAnswerBtn.addEventListener('click', showAnswer);
