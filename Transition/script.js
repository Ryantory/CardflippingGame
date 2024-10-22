window.addEventListener('load', function() {
    setTimeout(function() {
        // Hide the intro section after the animation
        document.getElementById('intro').style.display = 'none';
        // Show the main content
        document.getElementById('mainContent').classList.remove('hidden');
    }, 5000); // Wait for 5 seconds (2s delay + 3s fade out)
});
