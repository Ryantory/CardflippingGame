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
// let givenTime = document.getElementById('Qtime');
let flippedCard = null;
const music = document.getElementById('backgroundMusic');//Get the background music

//adding different soundtracks
const soundtrack1 = document.getElementById('soundtrack1');
const soundtrack2 = document.getElementById('soundtrack2');

//Interval of Quesiton
let intervalOfQuestion;

//Interval of music
let intervalOfMusic;
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
        const imageRef = flippedCard.getAttribute('image1-ref'); // Get the image reference
        // questionText.innerText = question;
        questionModal.classList.add('show'); // Show the modal

        stopMusic();
        //how much time is given
        const Qtime = flippedCard.getAttribute('Qtime');
        if(Qtime == 5){
            updateTimeText("0:05");
            startCountdown(Qtime);
            playMusicFor5Seconds("Backgroundmusic/5sec.m4a");
            console.log("5sec");}
        if(Qtime == 10){
            updateTimeText("0:10");
            startCountdown(Qtime);
            playMusicFor10Seconds("Backgroundmusic/10sec.m4a");
            console.log("10sec");}
        if(Qtime == 30){
            updateTimeText("0:30");
            startCountdown(Qtime);
            playMusicFor30Seconds("Backgroundmusic/30sec.m4a");
            console.log("30sec")}
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
        playMusicLoop("Backgroundmusic/SUPER MARIO BROS. Themesong ( No Copyright Music ).mp3");
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
    clearInterval(intervalOfQuestion);
    const currentMusic = music.getAttribute("currentMusic");
    if(currentMusic == 1)playMusicLoop("Backgroundmusic/Card.m4a");
    if(currentMusic == 2)playMusicLoop("Backgroundmusic/Crazy Frog - Axel F [No Copyright].mp3");
    questionModal.classList.remove('show');
});

// Close answer modal
closeAnswerModal.addEventListener('click', () => {
    answerModal.classList.remove('show');
});

//play music and loop
function playMusicLoop(track) {
    console.log("play music");
    stopMusic();
    if (music) {
        music.loop = true;
        music.src = track; // Set the audio source to the selected track
        music.play();      // Play the audio
      }
  }
//play music without loop
function playMusic(track) {
    console.log("play music");
    stopMusic();
    if (music) {
        music.loop = false;
        music.src = track; // Set the audio source to the selected track
        music.play();      // Play the audio
      }
  }
//stop music
  function stopMusic() {
    if (music) {
        music.pause();
        music.currentTime = 0; // Reset the audio to the beginning
      }
    
  }

  function playMusicFor5Seconds(track) {
    if (music) {
        console.log("play music");
        playMusic(track);

    // Stop the music after 10 seconds (10000 milliseconds)
    intervalOfMusic = setTimeout(() => {
      music.pause();
      music.currentTime = 0; // Reset the music to the beginning (optional)
    }, 10000);
    }

    clearInterval(intervalOfMusic);
  }

  function playMusicFor10Seconds(track) {
    if (music) {
        console.log("play music");
        playMusic(track);
    
        // Stop the music after 10 seconds (10000 milliseconds)
        intervalOfMusic = setTimeout(() => {
          music.pause();
          music.currentTime = 0; // Reset the music to the beginning (optional)
        }, 15000);
        }

        clearInterval(intervalOfMusic);
  }
  function playMusicFor30Seconds(track) {
    if (music) {
        console.log("play music");
        playMusic(track);
    
        // Stop the music after 10 seconds (10000 milliseconds)
        intervalOfMusic = setTimeout(() => {
          music.pause();
          music.currentTime = 0; // Reset the music to the beginning (optional)
        }, 35000);
        }

        clearInterval(intervalOfMusic);
  }
function updateTimeText(timeText){
    // Get the element by its ID
    const countdownElement = document.getElementById('countdown');
    // Modify the text content
    countdownElement.textContent = timeText;  // Updating the countdown
}
//countdown
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}


// Function to start the countdown
function startCountdown(Qtime) {
    const countdownElement = document.getElementById('countdown');

        intervalOfQuestion = setInterval(() => {
        countdownElement.textContent = formatTime(Qtime);

        if (Qtime <= 0) {
            clearInterval(intervalOfQuestion);
            countdownElement.textContent = "Time's up!";
        } else {
            Qtime--;
        }
    }, 1000);
}


// Attach event listeners for control buttons
doneBtn.addEventListener('click', removeCard);
undoBtn.addEventListener('click', undo);
showQuestionBtn.addEventListener('click', showQuestion);
showAnswerBtn.addEventListener('click', showAnswer);

soundtrack1.addEventListener('click', function() {
    music.setAttribute('currentMusic','1');
    playMusic("Backgroundmusic/Card.m4a");
});
soundtrack2.addEventListener('click', function() {
    music.setAttribute('currentMusic','2');
    playMusic("Backgroundmusic/Crazy Frog - Axel F [No Copyright].mp3");
});