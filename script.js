// --- 1. تعريف العناصر الأساسية ---
const dot = document.getElementById('dot');
const halo = document.getElementById('halo');
const bg = document.getElementById('bg-container');
const splash = document.getElementById('splash-screen');
const loginScreen = document.getElementById('login-screen');
const dashboard = document.getElementById('dashboard');
const pwInput = document.getElementById('pw-input');

// --- 2. نظام الماوس والبارالاكس (سريع وانسيابي) ---
window.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    // تحريك النقطة والهالة لحظياً
    if (dot && halo) {
        dot.style.left = `${x}px`;
        dot.style.top = `${y}px`;
        halo.style.left = `${x}px`;
        halo.style.top = `${y}px`;
        createParticle(x, y);
    }

    // تحريك الخلفية (البارالاكس) - حركة هادية عكس اتجاه الماوس
    if (bg) {
        const moveX = (window.innerWidth / 2 - x) / 45;
        const moveY = (window.innerHeight / 2 - y) / 45;
        bg.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
    }
});

// وظيفة رسم الجسيمات الذهبية خلف الماوس
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

// --- 3. تشغيل مشهد "البوابة السينيمائية" عند التحميل ---
window.onload = () => {
    // إظهار الخلفية بتأثير Unblur تدريجي
    if (bg) {
        bg.style.filter = 'blur(0)';
    }

    // انتظر ثانيتين ثم افتح البوابة (يمين وشمال)
    setTimeout(() => {
        if (splash) {
            splash.classList.add('open'); // تفعيل الأنيميشن اللي في الـ CSS
        }
    }, 2000);

    // إخفاء شاشة الـ Splash تماماً بعد الفتح
    setTimeout(() => {
        if (splash) {
            splash.style.opacity = '0';
            splash.style.pointerEvents = 'none'; // عشان تعرف تدوس على اللي تحتها
            setTimeout(() => {
                splash.style.display = 'none';
            }, 1500);
        }
    }, 4500);
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
            if (dot) dot.style.display = 'none';
            if (halo) halo.style.display = 'none';
        }, 500);
    } else {
        alert("ACCESS DENIED: Identity Unverified.");
    }
}

// دعم زر Enter للدخول السريع
pwInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') validateIdentity();
});
