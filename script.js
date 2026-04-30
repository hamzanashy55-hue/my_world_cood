// --- 1. تعريف العناصر الأساسية ---
const dot = document.getElementById('dot');
const halo = document.getElementById('halo');
const bg = document.getElementById('bg-container');
const typewriter = document.getElementById('typewriter');
const splash = document.getElementById('splash-screen');
const loginScreen = document.getElementById('login-screen');
const dashboard = document.getElementById('dashboard');
const pwInput = document.getElementById('pw-input');

// --- 2. نظام الماوس والبارالاكس (سريع وانسيابي) ---
window.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    // تحريك النقطة والهالة لحظياً
    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;
    halo.style.left = `${x}px`;
    halo.style.top = `${y}px`;

    // خلق تأثير الجسيمات (Trail)
    createParticle(x, y);

    // تحريك الخلفية (البارالاكس)
    const moveX = (window.innerWidth / 2 - x) / 45;
    const moveY = (window.innerHeight / 2 - y) / 45;
    bg.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
});

// وظيفة رسم النقط الذهبية خلف الماوس
function createParticle(x, y) {
    const p = document.createElement('div');
    p.className = 'trail-particle';
    p.style.left = `${x}px`;
    p.style.top = `${y}px`;
    
    const size = Math.random() * 4 + 2;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;

    document.body.appendChild(p);
    setTimeout(() => p.remove(), 800);
}

// --- 3. شاشة الترحيب وتأثير الكتابة (Typewriter) ---
window.onload = () => {
    const message = "> Initializing Master_Vault... Welcome, Eng/Potter";
    let i = 0;

    function typeWriter() {
        if (i < message.length) {
            typewriter.innerHTML += message.charAt(i);
            i++;
            setTimeout(typeWriter, 70); // سرعة الكتابة
        }
    }

    typeWriter();

    // إخفاء الشاشة السوداء بعد انتهاء التحميل
    setTimeout(() => {
        if (splash) {
            splash.style.opacity = '0';
            setTimeout(() => {
                splash.style.display = 'none';
            }, 1200);
        }
    }, 4000);
};

// --- 4. منطق التحقق من الهوية (الباسورد: nashy) ---
function validateIdentity() {
    const pass = pwInput.value;
    if (pass === 'nashy') {
        loginScreen.style.opacity = '0';
        setTimeout(() => {
            loginScreen.style.display = 'none';
            dashboard.style.display = 'block';
            
            // إرجاع الماوس الطبيعي داخل السيستم
            document.body.style.cursor = 'default';
            dot.style.display = 'none';
            halo.style.display = 'none';
        }, 500);
    } else {
        alert("ACCESS DENIED: Identity Unverified.");
    }
}

// دعم زر Enter للدخول السريع
pwInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') validateIdentity();
});
