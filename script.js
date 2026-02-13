// 1.
const config = window.VALENTINE_CONFIG;

// 2. 
function showNextQuestion(questionNumber) {
    // إ
    document.querySelectorAll('.question-section').forEach(q => {
        q.classList.add('hidden');
        q.style.display = 'none';
    });
    
    // إ
    const nextSection = document.getElementById(`question${questionNumber}`);
    if (nextSection) {
        nextSection.classList.remove('hidden');
        nextSection.style.display = 'block';
    }
}

// 3. 
function moveButton(button) {
    // 
    if (button.id.includes('yes')) return;

    // 
    const x = Math.random() * (window.innerWidth - button.offsetWidth - 20);
    const y = Math.random() * (window.innerHeight - button.offsetHeight - 20);
    
    button.style.position = 'fixed';
    button.style.left = x + 'px';
    button.style.top = y + 'px';
    button.style.zIndex = '1000';
}

// 4. 
document.addEventListener('DOMContentLoaded', () => {
    if (!config) {
        console.error("Config file not found!");
        return;
    }

    // 
    document.title = config.pageTitle;
    document.getElementById('valentineTitle').textContent = `${config.valentineName}, my love...`;
    
    // 
    document.getElementById('question1Text').textContent = config.questions.first.text;
    document.getElementById('yesBtn1').textContent = config.questions.first.yesBtn;
    document.getElementById('noBtn1').textContent = config.questions.first.noBtn;
    document.getElementById('secretAnswerBtn').textContent = config.questions.first.secretAnswer;
    
    // 
    document.getElementById('question2Text').textContent = config.questions.second.text;
    document.getElementById('startText').textContent = config.questions.second.startText;
    document.getElementById('nextBtn').textContent = config.questions.second.nextBtn;
    
    //
    document.getElementById('question3Text').textContent = config.questions.third.text;
    document.getElementById('yesBtn3').textContent = config.questions.third.yesBtn;
    document.getElementById('noBtn3').textContent = config.questions.third.noBtn;

    // 
    createFloatingElements();
    setupMusicPlayer();
    setupLoveMeter();
});

// 5. 
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
                // 
                const expansion = Math.min((value - 100) / 100, 50);
                loveMeter.style.width = `calc(100% + ${expansion}px)`;
                
                // 
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

// 6. 
function celebrate() {
    document.querySelectorAll('.question-section').forEach(q => q.style.display = 'none');
    const celebration = document.getElementById('celebration');
    celebration.classList.remove('hidden');
    celebration.style.display = 'block';
    
    document.getElementById('celebrationTitle').textContent = config.celebration.title;
    document.getElementById('celebrationMessage').textContent = config.celebration.message;
    document.getElementById('celebrationEmojis').textContent = config.celebration.emojis;
    
    //
    for (let i = 0; i < 30; i++) {
        setTimeout(createSingleFloatingElement, i * 100);
    }
}

// 7. 
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

// 8. 
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
    span.style.top = '110vh'; // 
    span.style.fontSize = (Math.random() * 20 + 20) + 'px';
    span.style.transition = `top ${Math.random() * 5 + 5}s linear`;
    
    container.appendChild(span);

    // 
    setTimeout(() => {
        span.style.top = '-10vh';
    }, 100);

    //
    setTimeout(() => {
        span.remove();
    }, 10000);
}
