// Custom Cursor Logic
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
    
    // Slight delay for the outline for a smooth trailing effect
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Cursor Hover Effects on Links and Buttons
const hoverables = document.querySelectorAll('a, button, .magnetic');
hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorOutline.style.backgroundColor = 'rgba(0, 243, 255, 0.1)';
    });
    el.addEventListener('mouseleave', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutline.style.backgroundColor = 'transparent';
    });
});

// Magnetic Buttons Math (pulls button slightly towards mouse)
const magneticElements = document.querySelectorAll('.magnetic');
magneticElements.forEach(magnet => {
    magnet.addEventListener('mousemove', function(e) {
        const position = magnet.getBoundingClientRect();
        const x = e.pageX - position.left - position.width / 2;
        const y = e.pageY - position.top - position.height / 2;
        
        magnet.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    magnet.addEventListener('mouseleave', function() {
        magnet.style.transform = 'translate(0px, 0px)';
    });
});

