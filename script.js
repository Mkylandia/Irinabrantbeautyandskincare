// Maus-Cursor Custom Logic
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // Dot folgt sofort
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Outline folgt verzögert (smooth animation)
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// 3D Tilt Effekt für die Karten
const cards = document.querySelectorAll('.card-3d');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        // Berechne Mausposition relativ zur Karte
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Berechne Rotation (Mitte der Karte ist 0)
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10; // Max 10 Grad Rotation
        const rotateY = ((x - centerX) / centerX) * 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    // Reset wenn Maus verlässt
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    });
});

// Parallax Effekt beim Scrollen für Text
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    const title = document.querySelector('.hero-title');
    const orbs = document.querySelectorAll('.floating-orb');

    // Titel bewegt sich langsamer als Scroll
    title.style.transform = `translateY(${scrollY * 0.3}px)`;

    // Orbs bewegen sich unterschiedlich
    orbs[0].style.transform = `translateY(${scrollY * 0.15}px)`;
    orbs[1].style.transform = `translateY(${scrollY * -0.1}px)`;
});
