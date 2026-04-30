// script.js
const dot = document.getElementById('dot');
const halo = document.getElementById('halo');
const bg = document.getElementById('bg-container');

// 1. حركة الماوس والبارالاكس
window.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;
    halo.style.left = `${x}px`;
    halo.style.top = `${y}px`;

    createParticle(x, y);

    // تأثير حركة الخلفية مع الماوس
    const moveX = (window.innerWidth / 2 - x) / 50;
    const moveY = (window.innerHeight / 2 - y) / 50;
    bg.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
});

function createParticle(x, y) {
    const p = document.createElement('div');
    p.className = 'trail-particle';
    p.style.left = `${x}px`;
    p.style.top = `${y}px`;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 800);
}

// 2. إخفاء شاشة الترحيب
window.onload = () => {
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        splash.style.opacity = '0';
        setTimeout(() => splash.style.display = 'none', 1200);
    }, 3000);
};

// 3. منطق الدخول (الباسورد: nashy)
function validateIdentity() {
    const input = document.getElementById('pw-input').value;
    if (input === 'nashy') {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        document.body.style.cursor = 'default'; // رجوع الماوس العادي جوه
        dot.style.display = 'none';
        halo.style.display = 'none';
    } else {
        alert("خطأ في الهوية! الوصول مرفوض.");
    }
}
