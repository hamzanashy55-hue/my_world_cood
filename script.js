const dot = document.getElementById('dot');
const halo = document.getElementById('halo');
const bg = document.getElementById('bg-container');
const splash = document.getElementById('splash-screen');
const loginScreen = document.getElementById('login-screen');
const dashboard = document.getElementById('dashboard');
const pwInput = document.getElementById('pw-input');

// الماوس والبارالاكس
window.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    if(dot) { dot.style.left = `${x}px`; dot.style.top = `${y}px`; }
    if(halo) { halo.style.left = `${x}px`; halo.style.top = `${y}px`; }
    createParticle(x, y);
    if(bg) {
        const moveX = (window.innerWidth / 2 - x) / 45;
        const moveY = (window.innerHeight / 2 - y) / 45;
        bg.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
    }
});

function createParticle(x, y) {
    const p = document.createElement('div');
    p.className = 'trail-particle';
    p.style.left = `${x}px`; p.style.top = `${y}px`;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 800);
}

// تشغيل البوابة
window.onload = () => {
    setTimeout(() => {
        splash.classList.add('open');
        bg.style.filter = 'blur(0)';
    }, 2000);
    setTimeout(() => {
        splash.style.opacity = '0';
        splash.style.pointerEvents = 'none';
    }, 4500);
};

// الباسورد nashy
function validateIdentity() {
    if (pwInput.value === 'nashy') {
        loginScreen.style.opacity = '0';
        setTimeout(() => {
            loginScreen.style.display = 'none';
            dashboard.style.display = 'block';
            document.body.style.cursor = 'default';
            dot.style.display = 'none';
            halo.style.display = 'none';
        }, 500);
    } else {
        alert("ACCESS DENIED");
    }
}

pwInput.addEventListener('keyup', (e) => { if (e.key === 'Enter') validateIdentity(); });
