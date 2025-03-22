// Așteptăm încărcarea completă a documentului
document.addEventListener('DOMContentLoaded', function() {
    // Animație de scroller lin pentru meniul de navigare
    const links = document.querySelectorAll('nav a');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
    
    // Animație pentru butonul "Află mai multe"
    const heroButton = document.querySelector('.hero .btn');
    
    if (heroButton) {
        heroButton.addEventListener('click', function() {
            const despreSection = document.querySelector('#despre');
            
            window.scrollTo({
                top: despreSection.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    }
    
    // Gestionarea formularului de contact
    const contactForm = document.querySelector('.contact form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obține valorile din formular
            const nume = document.getElementById('nume').value;
            const email = document.getElementById('email').value;
            const mesaj = document.getElementById('mesaj').value;
            
            // Aici ai putea trimite datele către un server
            // Pentru demonstrație, doar afișăm un mesaj
            alert(`Mulțumim pentru mesaj, ${nume}! Te vom contacta în curând la adresa ${email}.`);
            
            // Resetăm formularul
            contactForm.reset();
        });
    }
    
    // Adăugăm animație pentru cardurile de servicii la scroll
    const animateOnScroll = function() {
        const cards = document.querySelectorAll('.card');
        
        cards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (cardPosition < screenPosition) {
                card.style.opacity = 1;
                card.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Aplicăm stiluri inițiale pentru animație
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Adăugăm event listener pentru scroll
    window.addEventListener('scroll', animateOnScroll);
    // Apelăm funcția o dată pentru a verifica elementele vizibile la încărcare
    animateOnScroll();
}); 