// Charger les paroles
async function chargerParoles() {
    const response = await fetch('assets/paroles_disco.json');
    const paroles = await response.json();
    return paroles;
}

// Afficher les paroles dans le conteneur
function afficherParoles(paroles) {
    const container = document.getElementById('parolesContainer');
    container.innerHTML = '';  // Effacer tout contenu existant
    paroles.forEach(parole => {
        const ligne = document.createElement('p');
        ligne.classList.add('ligneParole');
        ligne.textContent = parole.text;
        container.appendChild(ligne);
    });
}

// Synchroniser les paroles avec la musique
function synchroniserParoles(paroles) {
    const audio = document.getElementById('lecteurAudio');
    const lignesParoles = document.querySelectorAll('.ligneParole');

    audio.addEventListener('timeupdate', () => {
        const tempsLecture = Math.floor(audio.currentTime);

        paroles.forEach((parole, index) => {
            if (tempsLecture === parole.time) {
                lignesParoles.forEach(l => l.classList.remove('ligneActive'));
                lignesParoles[index].classList.add('ligneActive');
            }
        });
    });
}

// Charger et initialiser
chargerParoles().then(paroles => {
    afficherParoles(paroles);
    synchroniserParoles(paroles);
});
