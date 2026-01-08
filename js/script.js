document.addEventListener('DOMContentLoaded', () => {
    // --- GESTION DU MENU BURGER ---
    const burger = document.getElementById('burger-menu');
    const nav = document.getElementById('nav-links');

    if (burger) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('active');
            burger.classList.toggle('open');
        });
    }

    // Fermer le menu si on clique sur un lien
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            burger.classList.remove('open');
        });
    });

    // --- NOUVEAU : GESTION DES TRANSITIONS DE PAGE ---
    const allLinks = document.querySelectorAll('a');
    
    allLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // On ne déclenche l'animation que pour les liens internes valides
            if (href && !href.startsWith('#') && !href.startsWith('http') && link.target !== "_blank") {
                e.preventDefault();
                
                // On ajoute la classe de sortie
                document.body.classList.add('fade-out');

                // On attend la fin de l'animation CSS (400ms) avant de changer de page
                setTimeout(() => {
                    window.location.href = href;
                }, 400);
            }
        });
    });
});