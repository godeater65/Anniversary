// ===============================
// ELEMENTS
// ===============================
const $ = id => document.getElementById(id);

const openBtn = $('openBtn');
const printBtn = $('printBtn');
const envelope = $('envelope');
const flap = $('flap');
const letter = $('letter');

const audio = $('audio');
const musicFile = $('musicFile');
const playPause = $('playPause');
const volume = $('volume');

let objectUrl = null;

// ===============================
// ENVELOPE
// ===============================
function openEnvelope() {
    flap.classList.add('open');
    letter.classList.add('show');
    envelope.setAttribute('aria-expanded', 'true');

    spawnHearts(18);
    startMusic();
}

function closeEnvelope() {
    flap.classList.remove('open');
    letter.classList.remove('show');
    envelope.setAttribute('aria-expanded', 'false');
}

function toggleEnvelope() {
    flap.classList.contains('open')
        ? closeEnvelope()
        : openEnvelope();
}

// EVENTS
openBtn.addEventListener('click', openEnvelope);
printBtn.addEventListener('click', () => window.print());

envelope.addEventListener('click', toggleEnvelope);
envelope.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleEnvelope();
    }
});

// ===============================
// MUSIC
// ===============================
function startMusic() {
    if (!audio.src) return;

    audio.loop = true;
    audio.play().catch(()=>{});
    playPause.textContent = 'Pause ⏸';
}

playPause.addEventListener('click', async () => {
    if (!audio.src) return;

    if (audio.paused) {
        await audio.play().catch(()=>{});
        playPause.textContent = 'Pause ⏸';
    } else {
        audio.pause();
        playPause.textContent = 'Play ▶';
    }
});

volume.addEventListener('input', () => {
    audio.volume = parseFloat(volume.value);
});

// Upload music
musicFile.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;

    if (objectUrl) URL.revokeObjectURL(objectUrl);

    objectUrl = URL.createObjectURL(file);
    audio.src = objectUrl;
    audio.volume = volume.value;

    playPause.disabled = false;
});

// ===============================
// HEART ANIMATION
// ===============================
function spawnHearts(count) {
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';

        heart.style.left = Math.random()*80 + 10 + '%';
        heart.style.animationDuration =
            (3 + Math.random()*3) + 's';

        document.body.appendChild(heart);
        heart.addEventListener('animationend', () => heart.remove());
    }
}

// ===============================
// AUTO OPEN
// ===============================
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(openEnvelope, 700);
});