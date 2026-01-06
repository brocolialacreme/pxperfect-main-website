// On attend que le DOM soit chargé pour éviter les erreurs
document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('burger-menu');
    const nav = document.getElementById('nav-links');

    // Fonction pour basculer le menu
    burger.addEventListener('click', () => {
        // Ajoute ou retire la classe "active" au menu nav
        nav.classList.toggle('active');
        
        // Ajoute ou retire la classe "open" au burger pour l'animation en X
        burger.classList.toggle('open');
    });

    // Optionnel : Fermer le menu si on clique sur un lien
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            burger.classList.remove('open');
        });
    });
});