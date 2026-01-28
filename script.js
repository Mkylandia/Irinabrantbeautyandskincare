document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.custom-cursor');
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    // Smooth Scale Effect
    if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
        cursor.style.transform = 'scale(2.5)';
        cursor.style.backgroundColor = 'rgba(197, 160, 89, 0.1)';
    } else {
        cursor.style.transform = 'scale(1)';
        cursor.style.backgroundColor = 'transparent';
    }
});

// Advanced Tilt Effect for Cards
const cards = document.querySelectorAll('.ritual-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-20px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(0deg) rotateY(0deg) translateY(0)';
    });
});

// Hero Title Parallax
window.addEventListener('scroll', () => {
    const title = document.querySelector('#tilt-title');
    const scroll = window.scrollY;
    title.style.transform = `translateY(${scroll * 0.5}px) rotateX(${scroll * 0.05}deg)`;
    title.style.opacity = 1 - scroll / 800;
});
