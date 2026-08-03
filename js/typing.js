const words = ["Computer Science Student", "Full Stack Developer", "AI Enthusiast", "UI/UX Lover"];
let i = 0;
let timer;

function typingEffect() {
    let word = words[i].split("");
    var loopTyping = function() {
        if (word.length > 0) {
            document.getElementById('typing-text').innerHTML += word.shift();
        } else {
            deletingEffect();
            return false;
        };
        timer = setTimeout(loopTyping, 100);
    };
    loopTyping();
};

function deletingEffect() {
    let word = words[i].split("");
    var loopDeleting = function() {
        if (word.length > 0) {
            word.pop();
            document.getElementById('typing-text').innerHTML = word.join("");
        } else {
            if (words.length > (i + 1)) { i++; } else { i = 0; };
            typingEffect();
            return false;
        };
        timer = setTimeout(loopDeleting, 50);
    };
    // Pause before deleting
    setTimeout(loopDeleting, 2000);
};

// Start effect on load
setTimeout(typingEffect, 2500); // Wait for loading screen

