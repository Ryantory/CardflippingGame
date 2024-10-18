// Set the initial countdown time (10 minutes)
let countdownTime = 10; // 10 minutes in seconds

// Function to format time in mm:ss format
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Function to start the countdown
function startCountdown() {
    const countdownElement = document.getElementById('countdown');

    const interval = setInterval(() => {
        countdownElement.textContent = formatTime(countdownTime);

        if (countdownTime <= 0) {
            clearInterval(interval);
            countdownElement.textContent = "Time's up!";
        } else {
            countdownTime--;
        }
    }, 1000);
}

// Start the countdown when the page loads
window.onload = startCountdown;
