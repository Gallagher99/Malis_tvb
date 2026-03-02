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
            timeDisplay.innerText = `${formatTime(track.currentTime)} / ${formatTime(track.duration || 0)}`;
        };

        slider.oninput = () => {
            track.currentTime = (slider.value / 100) * track.duration;
        };
    }

    const t1 = document.getElementById('testo1');
    if(t1) t1.innerText = `Silente è il passo che condusse a strade che mai avrei pensato di percorrere. Ero lì, in mezzo a quel bosco, con la mente turbata dai ricordi di promesse e onore infranto; solo il fango calzava i miei piedi mentre avanzavo senza meta, in cerca di risposte celate sotto la stoffa di cotone della mia camicia... un tatuaggio intriso nella carne e nel sangue dava pienezza alle parole che furono pronunciate... non le ricordo quasi più ormai... eppure il sorriso che mi fece lei... come si poteva dimenticare... una flebile luce che ardeva più luminosa delle braci di quel fuoco da campo... era una donna sveglia, sapete? Priva di differenze di ceto, era in ricognizione come milite ricognitore di Dalsida eppure... una notte è bastata affinché neanche il dolore di Barovia potesse distruggermi così, dopo la sua scomparsa.
Sono marcito in quelle strade assieme alla povera gente, dove anche un torsolo di mela marcio e vecchio significava sopravvivenza; una parola che ho dovuto masticare per anni dopo la lettera che portò via mio padre per una guerra che non era la sua, per colpa dei nobili opulenti e onorevoli che imponevano il loro dominio sopra ogni cosa. Mia madre Elena... lei, eh... beh ormai non era più se stessa... ero molto piccolo, non so molto di lei... ho un ricordo molto vago delle sue notti: aveva l'abitudine di accarezzarmi la schiena spesso per rassicurarmi... prima che, beh... diventasse un guscio vuoto che mi abbandonò quando avevo appena sei anni, ve lo immaginate? No, certo che no... il figlio del nobile Clegane... dimenticato e ripudiato dalla propria madre per via del suo dolore e dei fantasmi che non cerano più... lei vedeva in me mio padre, Ser Vendrick Clegane... proprio per questo dolore fui abbandonato.
Ho passato la mia giovinezza raschiando le pareti con le dita delle mani a cercare di scacciare via la fame e la sete, fin quando le dita non si tingevano di un ammantato rosso. Tra il freddo di quelle notti insonni, donnine di malaffare e uomini che sapevano di cenere e alcol erano l'unico odore che mi permeava il naso, rotto da farabutti intenti a deturpare il mio niente... pensavate fosse tutto qui, haha? Non siamo nemmeno all'inizio... nemmeno l'acqua torbida e stagnante delle strade lava via davvero ciò che diventi: quello ti tinge l'anima e ti macchia il cuore di oscurità.
Una delle mie solite mattine passate a raccattarsi da vivere mi ritrovai a osservare i riti celebrativi dei cavalieri che parteciparono alla guerra... fu allora che lo vidi. Lo vidi, inerme, quello che un tempo avrei chiamato papà... gettato via in un ammasso di corpi profanati e volti indefiniti divorati dalla bagnata terra e dai cagnotti che, affamati più di me, consumavano i resti dei defunti. Una sola lacrima fuoriuscì quel giorno dopo quella vista raccapricciante. Mentre correvo disperato tra i vicoli, quando dimenticare era l'unico mio desiderio, giunsero loro: uomini in armature poco curate con stemmi lucidi in argento vivo. Mi trovarono: quando mi videro, la paura si trasformò in un incubo... per loro ero già carne da macello per le guerre al soldo. Mi addestrarono quanto basta per fare di me il loro cane randagio da guerra, le Lame d'Argento... vili e privi di scrupoli. Mi costrinsero a ingoiare l'amaro gusto della vergogna, diventando il loro burattino in guerre di cui non ricordo nemmeno il nome.
Ma il futuro è un baro sporco: subito dopo la ronda un'imboscata cambiò tutto. I miei compagni? Dovevate vederli, scappavano più veloci delle lepri braccate mentre la mia vita fu messa a repentaglio; ero tenuto come merce avariata di scambio dietro sbarre arrugginite che gemevano, finché non riuscii a fuggire. Corsi nella foresta a perdifiato, lontano dagli orrori di Barovia e, senza meta, incontrai quella ragazza... Rin. Mi raccontò una storia che mi scosse profondamente e mi mostrò il Simbolo... la maschera dei cacciatori eterni e la loro fede. Lei mi disse una frase: "Ogni cosa o persona è sotto la loro ombra". Mi raccontò una storia che faceva così:
Agnella: C'era una volta un uomo pallido con capelli corvini che era molto solo...
Lupo: Perché era solo?
Agnella: Perché tutte le cose o persone dovevano incontrare quest'uomo, continuavano ad evitarlo...
Lupo: Così lui li ha inseguiti tutti?
Agnella: No, prese un'ascia e si divise in due... Proprio nel mezzo...
Lupo: Così avrebbe avuto per sempre un amico?
Agnella: Così avrebbe avuto per sempre un amico...
Fu allora che realizzai l'unica verità: che la speranza è quella che ci dà la forza di credere. Mi rialzai dalle viscere del terriccio e iniziai di nuovo a respirare. Ora vago nei boschi dell' Aengard in cerca di lei. Mi tocco la spalla destra e ogni volta che la penso... sono stanco di credere che tutto vada come deve andare... la rovina della mia casa... mia madre... mio padre... Rin. Ormai non dormo da chissà quanti giorni... torno spesso nei boschi per cercarti... ogni volta sto in mezzo agli alberi mi ricorda il piccolo tumulo di pietra che lasciai a Dalsida in tua memoria; almeno avevo qualcosa per cui sperare. Speravo un giorno di ritrovarti un giorno ma, ahimè sento solo quella mancanza grattarmi perennemente dentro l'anima; ogni tanto la mia vista cede il passo e si annebbia. Non credo di riuscire a sopportare ancora questo dolore che mi consuma dentro... vorrei dormire stanotte, ma ogni volta che ci provo sento qualcosa dentro di me che mi tiene sveglio. Forse sono i ricordi, o forse questo vecchio cane rognoso sta lasciando il passo all'età, che sta iniziando a reclamare la mia carne stanca assieme al mio spirito marcio.`;

    const t2 = document.getElementById('testo2');
    if(t2) t2.innerText = `Cicatrice dalla forma di ragnatela sul collo [M.Nimloth] Tatuaggi Sciamanici: spada stilizzata dietro la nuca, al centro del collo (Furia). Skill Goblin pg Mxyzptlk: Utilizzi 1/1. [29/12 M.Sylmera]`;
});

const t2 = document.getElementById('testo2');
    if(t2) t2.innerText = `Cicatrice dalla forma di ragnatela sul collo [M.Nimloth] Tatuaggi Sciamanici: spada stilizzata dietro la nuca, al centro del collo (Furia). Skill Goblin pg Mxyzptlk: Utilizzi 1/1. [29/12 M.Sylmera]`;
});

const t2 = document.getElementById('testo2');
    if(t2) t2.innerText = `Cicatrice dalla forma di ragnatela sul collo [M.Nimloth] Tatuaggi Sciamanici: spada stilizzata dietro la nuca, al centro del collo (Furia). Skill Goblin pg Mxyzptlk: Utilizzi 1/1. [29/12 M.Sylmera]`;
});

const t2 = document.getElementById('testo2');
    if(t2) t2.innerText = `Cicatrice dalla forma di ragnatela sul collo [M.Nimloth] Tatuaggi Sciamanici: spada stilizzata dietro la nuca, al centro del collo (Furia). Skill Goblin pg Mxyzptlk: Utilizzi 1/1. [29/12 M.Sylmera]`;
});

function attivaSlide(id, musica) {
    const ids = ['momenti', 'inizio', 'raccolta3', 'raccolta4'];
    ids.forEach(s => { 
        const el = document.getElementById(s);
        if(el) el.style.display = 'none';
    });
    document.getElementById(id).style.display = 'block';
    let audioExtra = document.getElementById('audio-slide-extra');
    audioExtra.src = musica;
    audioExtra.play();
}

function chiudiSlide(id) {
    document.getElementById(id).style.display = 'none';
    let audioExtra = document.getElementById('audio-slide-extra');
    if(audioExtra) { audioExtra.pause(); audioExtra.currentTime = 0; }
}
