// --- 1. Canvas Particle System (Der "Lebendige" Effekt) ---
const canvas = document.getElementById('lux-canvas');
const ctx = canvas.getContext('2d');

let particlesArray;

// Canvas Größe anpassen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = {
    x: null,
    y: null,
    radius: (canvas.height/80) * (canvas.width/80)
}

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
    
    // Bewege den Glow-Div mit der Maus
    const glow = document.querySelector('.cursor-glow');
    glow.style.transform = `translate(${event.x - 200}px, ${event.y - 200}px)`;
});

// Partikel Klasse erstellen
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    // Zeichnen
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#D4AF37'; // Gold
        ctx.fill();
    }
    // Update Bewegung
    update() {
        // Grenzen Check
        if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;

        // Maus Interaktion (Partikel fliehen leicht vor der Maus - Luxus Effekt)
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        
        if (distance < mouse.radius + this.size){
            if (mouse.x < this.x && this.x < canvas.width - 10) this.x += 1;
            if (mouse.x > this.x && this.x > 10) this.x -= 1;
            if (mouse.y < this.y && this.y < canvas.height - 10) this.y += 1;
            if (mouse.y > this.y && this.y > 10) this.y -= 1;
        }

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

// Init Partikel
function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 0.5) - 0.25; // Langsame, elegante Bewegung
        let directionY = (Math.random() * 0.5) - 0.25;
        let color = '#D4AF37';
        
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

// Animations Loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}

// Verbinde Partikel mit Linien (Kollagen-Netzwerk Effekt)
function connect(){
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++){
        for (let b = a; b < particlesArray.length; b++){
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
            + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            
            if (distance < (canvas.width/7) * (canvas.height/7)) {
                opacityValue = 1 - (distance/20000);
                ctx.strokeStyle = 'rgba(212, 175, 55,' + opacityValue * 0.15 + ')'; // Sehr subtiles Gold
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// Resize Event
window.addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    mouse.radius = (canvas.height/80) * (canvas.width/80);
    init();
});

// Start Animation
init();
animate();


// --- 2. Scroll Reveal (Elemente erscheinen beim Scrollen) ---
const scrollElements = document.querySelectorAll("[data-scroll]");

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.1 });

scrollElements.forEach((el) => scrollObserver.observe(el));


// --- 3. Hero Text Animation beim Laden ---
window.onload = () => {
    const reveals = document.querySelectorAll('.reveal-text');
    reveals.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 300); // 300ms Verzögerung pro Element
    });
    
    // Füge CSS Styles für den Initialzustand hinzu
    reveals.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 1s ease';
    });
};
