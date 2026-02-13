// 1. جلب الإعدادات والتحقق من وجودها
const config = window.VALENTINE_CONFIG;

// 2. وظيفة التبديل بين الأسئلة (المراحل)
function showNextQuestion(questionNumber) {
    // إخفاء جميع الأقسام
    document.querySelectorAll('.question-section').forEach(q => {
        q.classList.add('hidden');
        q.style.display = 'none';
    });
    
    // إظهار القسم المطلوب
    const nextSection = document.getElementById(`question${questionNumber}`);
    if (nextSection) {
        nextSection.classList.remove('hidden');
        nextSection.style.display = 'block';
    }
}

// 3. وظيفة تحريك زر "No" فقط
function moveButton(button) {
    // حماية إضافية: إذا كان الزر هو "Yes" لا تقم بتحريكه
    if (button.id.includes('yes')) return;

    // حساب إحداثيات عشوائية داخل حدود الشاشة
    const x = Math.random() * (window.innerWidth - button.offsetWidth - 20);
    const y = Math.random() * (window.innerHeight - button.offsetHeight - 20);
    
    button.style.position = 'fixed';
    button.style.left = x + 'px';
    button.style.top = y + 'px';
    button.style.zIndex = '1000';
}

// 4. إعداد المحتوى عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    if (!config) {
        console.error("Config file not found!");
        return;
    }

    // إعداد النصوص الأساسية من ملف الإعدادات
    document.title = config.pageTitle;
    document.getElementById('valentineTitle').textContent = `${config.valentineName}, my love...`;
    
    // المرحلة الأولى
    document.getElementById('question1Text').textContent = config.questions.first.text;
    document.getElementById('yesBtn1').textContent = config.questions.first.yesBtn;
    document.getElementById('noBtn1').textContent = config.questions.first.noBtn;
    document.getElementById('secretAnswerBtn').textContent = config.questions.first.secretAnswer;
    
    // المرحلة الثانية
    document.getElementById('question2Text').textContent = config.questions.second.text;
    document.getElementById('startText').textContent = config.questions.second.startText;
    document.getElementById('nextBtn').textContent = config.questions.second.nextBtn;
    
    // المرحلة الثالثة
    document.getElementById('question3Text').textContent = config.questions.third.text;
    document.getElementById('yesBtn3').textContent = config.questions.third.yesBtn;
    document.getElementById('noBtn3').textContent = config.questions.third.noBtn;

    // تشغيل الميزات الإضافية
    createFloatingElements();
    setupMusicPlayer();
    setupLoveMeter();
});

// 5. منطق عداد الحب (Love Meter)
function setupLoveMeter() {
    const loveMeter = document.getElementById('loveMeter');
    const loveValue = document.getElementById('loveValue');
    const extraLove = document.getElementById('extraLove');

    if (loveMeter) {
        loveMeter.addEventListener('input', () => {
            const value = parseInt(loveMeter.value);
            loveValue.textContent = value;
            
            if (value > 100) {
                extraLove.classList.remove('hidden');
                // تمدد بسيط للعداد ليعطي تأثيراً بصرياً دون تخريب التصميم
                const expansion = Math.min((value - 100) / 100, 50);
                loveMeter.style.width = `calc(100% + ${expansion}px)`;
                
                // تغيير الرسائل بناءً على القيمة في Config
                if (value >= 5000) {
                    extraLove.textContent = config.loveMessages.extreme;
                } else if (value > 1000) {
                    extraLove.textContent = config.loveMessages.high;
                } else {
                    extraLove.textContent = config.loveMessages.normal;
                }
            } else {
                extraLove.classList.add('hidden');
                loveMeter.style.width = '100%';
            }
        });
    }
}

// 6. وظيفة الاحتفال النهائي
function celebrate() {
    document.querySelectorAll('.question-section').forEach(q => q.style.display = 'none');
    const celebration = document.getElementById('celebration');
    celebration.classList.remove('hidden');
    celebration.style.display = 'block';
    
    document.getElementById('celebrationTitle').textContent = config.celebration.title;
    document.getElementById('celebrationMessage').textContent = config.celebration.message;
    document.getElementById('celebrationEmojis').textContent = config.celebration.emojis;
    
    // تأثير الانفجار للقلوب
    for (let i = 0; i < 30; i++) {
        setTimeout(createSingleFloatingElement, i * 100);
    }
}

// 7. إعداد مشغل الموسيقى
function setupMusicPlayer() {
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    const musicSource = document.getElementById('musicSource');

    if (config.music.enabled && bgMusic) {
        musicSource.src = config.music.musicUrl;
        bgMusic.volume = config.music.volume;
        bgMusic.load();

        musicToggle.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.play();
                musicToggle.textContent = config.music.stopText;
            } else {
                bgMusic.pause();
                musicToggle.textContent = config.music.startText;
            }
        });
    }
}

// 8. إنشاء العناصر العائمة (القلوب والدببة)
function createFloatingElements() {
    for (let i = 0; i < 15; i++) {
        createSingleFloatingElement();
    }
}

function createSingleFloatingElement() {
    const container = document.querySelector('.floating-elements');
    const emojis = [...config.floatingEmojis.hearts, ...config.floatingEmojis.bears];
    const span = document.createElement('span');
    
    span.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
    span.style.position = 'absolute';
    span.style.left = Math.random() * 100 + 'vw';
    span.style.top = '110vh'; // تبدأ من أسفل الشاشة
    span.style.fontSize = (Math.random() * 20 + 20) + 'px';
    span.style.transition = `top ${Math.random() * 5 + 5}s linear`;
    
    container.appendChild(span);

    // تحريك العنصر للأعلى
    setTimeout(() => {
        span.style.top = '-10vh';
    }, 100);

    // حذف العنصر بعد انتهاء الحركة لتوفير الذاكرة
    setTimeout(() => {
        span.remove();
    }, 10000);
}
