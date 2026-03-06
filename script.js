document.addEventListener("DOMContentLoaded", () => {
    // Header animation
    setTimeout(() => { 
        const header = document.getElementById('mainHeader');
        if(header) header.classList.add('visible'); 
    }, 300);
    
    // Audio Background Logic
    const track = document.getElementById('bg-track');
    const btn = document.getElementById('audio-btn');
    const slider = document.getElementById('seek-slider');
    const timeDisplay = document.getElementById('time-display');

    function formatTime(s) {
        const m = Math.floor(s / 60);
        const sec = Math.floor(s % 60);
        return `${m}:${sec < 10 ? '0' : ''}${sec}`;
    }

    if(btn && track) {
        btn.onclick = () => {
            if (track.paused) { track.play(); btn.innerText = "⏸"; }
            else { track.pause(); btn.innerText = "▶"; }
        };

        // --- AGGIUNTA PER L'AVVIO AUTOMATICO ---
        document.body.addEventListener('click', () => { 
            if (track.paused) { 
                track.play(); 
                btn.innerText = "⏸"; 
            } 
        }, { once: true });
        // ---------------------------------------
        
        track.ontimeupdate = () => {
            if(slider && timeDisplay) {
                const progress = (track.currentTime / track.duration) * 100;
                slider.value = progress || 0;
                timeDisplay.innerText = `${formatTime(track.currentTime)} / ${formatTime(track.duration || 0)}`;
            }
        };

        if(slider) {
            slider.oninput = () => {
                track.currentTime = (slider.value / 100) * track.duration;
            };
        }
    }
});

// --- FUNZIONI PER I VECCHI BOTTONI (Momenti, Inizio, ecc.) ---
function attivaSlide(id, musica) {
    const ids = ['momenti', 'inizio', 'raccolta3', 'raccolta4'];
    ids.forEach(s => { 
        const el = document.getElementById(s);
        if(el) el.style.display = 'none';
    });
    
    const target = document.getElementById(id);
    if(target) {
        target.style.display = 'block';
        let audioExtra = document.getElementById('audio-slide-extra');
        if(audioExtra && musica) {
            audioExtra.src = musica;
            audioExtra.play().catch(e => console.log("Audio play blocked"));
        }
    }
}

// QUESTA È LA FUNZIONE CHE TI MANCAVA PER CHIUDERE I VECCHI BOTTONI
function chiudiSlide(id) {
    const target = document.getElementById(id);
    if(target) target.style.display = 'none';
    let audioExtra = document.getElementById('audio-slide-extra');
    if(audioExtra) { 
        audioExtra.pause(); 
        audioExtra.currentTime = 0; 
    }
}

// --- FUNZIONI PER I NUOVI PORTALI (Memorie del Fango) ---
function apriContenuto(id, musica) {
    document.querySelectorAll('.sezione-dinamica').forEach(s => s.style.display = 'none');
    const target = document.getElementById(id);
    if(target) {
        target.style.display = 'block';
        let audioExtra = document.getElementById('audio-slide-extra');
        if(audioExtra && musica) {
            audioExtra.src = musica;
            audioExtra.play().catch(() => {});
        }
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function chiudiContenuto(id) {
    const target = document.getElementById(id);
    if(target) target.style.display = 'none';
    let audioExtra = document.getElementById('audio-slide-extra');
    if(audioExtra) { audioExtra.pause(); audioExtra.currentTime = 0; }
}
