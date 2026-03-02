document.addEventListener("DOMContentLoaded", () => {
    const creaEffettoSabbia = (idElemento) => {
        const target = document.getElementById(idElemento);
        if (!target) return;
        const testoOriginale = target.innerText;
        target.innerHTML = "";
        const fragment = document.createDocumentFragment();
        testoOriginale.split("").forEach((carattere, indice) => {
            const span = document.createElement("span");
            span.innerText = carattere === " " ? "\u00A0" : carattere;
            span.className = "granello";
            span.style.transitionDelay = `${indice * 30}ms`; 
            fragment.appendChild(span);
            requestAnimationFrame(() => {
                setTimeout(() => span.classList.add("visibile"), 300);
            });
        });
        target.appendChild(fragment);
    };

    setTimeout(() => { 
        const header = document.getElementById('mainHeader');
        if(header) {
            header.classList.add('visible'); 
            creaEffettoSabbia("titolo-sabbia");
            setTimeout(() => creaEffettoSabbia("sottotitolo-sabbia"), 1500);
        }
    }, 800); 

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
        track.ontimeupdate = () => {
            const progress = (track.currentTime / track.duration) * 100;
            slider.value = progress || 0;
            if(timeDisplay) timeDisplay.innerText = `${formatTime(track.currentTime)} / ${formatTime(track.duration || 0)}`;
        };
        slider.oninput = () => {
            track.currentTime = (slider.value / 100) * track.duration;
        };
    }

    // Qui incolla il tuo testo completo per t1
    const t1 = document.getElementById('testo1');
    if(t1) t1.innerText = `Silente è il passo...`; 

    const t2 = document.getElementById('testo2');
    if(t2) t2.innerText = `Cicatrice dalla forma di ragnatela sul collo [M.Nimloth] Tatuaggi Sciamanici: spada stilizzata dietro la nuca, al centro del collo (Furia). Skill Goblin pg Mxyzptlk: Utilizzi 1/1. [29/12 M.Sylmera]`;
});

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
        audioExtra.src = musica;
        audioExtra.play();
    }
}

function chiudiSlide(id) {
    const el = document.getElementById(id);
    if(el) el.style.display = 'none';
    let audioExtra = document.getElementById('audio-slide-extra');
    if(audioExtra) { audioExtra.pause(); audioExtra.currentTime = 0; }
}
