// Așteptăm încărcarea completă a documentului
document.addEventListener('DOMContentLoaded', function() {
    // Meniu mobil
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const menu = document.querySelector('.menu');
    
    if (mobileMenuBtn && menu) {
        mobileMenuBtn.addEventListener('click', function() {
            menu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }
    
    // Închide meniul când se face click pe un link
    const menuLinks = document.querySelectorAll('.menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menu.classList.contains('active')) {
                menu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
    });
    
    // Animație de scroller lin pentru meniul de navigare
    const links = document.querySelectorAll('nav a, .footer-links a, .cta-buttons a, .service-btn');
    
    links.forEach(link => {
        if (link.getAttribute('href').startsWith('#')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Închide meniul mobil dacă este deschis
                    if (menu.classList.contains('active')) {
                        menu.classList.remove('active');
                        mobileMenuBtn.querySelectorAll('span').forEach(span => {
                            span.classList.remove('active');
                            span.style.transform = 'none';
                            span.style.opacity = '1';
                        });
                    }
                    
                    window.scrollTo({
                        top: targetSection.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });
    
    // Gestionarea formularului de contact
    const contactForm = document.querySelector('#appointmentForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validare și procesare formular
            const nume = document.getElementById('nume').value;
            const email = document.getElementById('email').value;
            const telefon = document.getElementById('telefon').value;
            const serviciu = document.getElementById('serviciu').value;
            
            // Validare simplă
            if (!nume || !email || !telefon || !serviciu) {
                alert('Vă rugăm să completați toate câmpurile obligatorii!');
                return;
            }
            
            // Simulează trimiterea datelor către server
            // În mod normal, aici ar fi un request AJAX sau fetch
            alert(`Mulțumim, ${nume}! Am primit cererea ta pentru serviciul de ${serviciu}. Te vom contacta în curând la numărul ${telefon} pentru a confirma programarea.`);
            
            // Resetăm formularul
            contactForm.reset();
        });
    }
    
    // Slider pentru testimoniale
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    
    function showSlide(n) {
        slides.forEach(slide => {
            slide.style.opacity = '0';
            slide.style.position = 'absolute';
        });
        
        slides[n].style.opacity = '1';
        slides[n].style.position = 'relative';
    }
    
    if (slides.length > 0 && prevBtn && nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });
        
        prevBtn.addEventListener('click', function() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        });
        
        // Auto slide la fiecare 5 secunde
        setInterval(function() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);
    }
    
    // Filtru pentru portofoliu
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterBtns.length > 0 && galleryItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Actualizăm butonul activ
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Filtrăm elementele
                galleryItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filter === 'toate' || filter === category) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Animații la scroll pentru elementele din pagină
    function animateOnScroll() {
        const elements = document.querySelectorAll('.card, .gallery-item, .blog-card, .about-image, .about-text');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight * 0.85;
            
            if (elementPosition < screenPosition) {
                element.classList.add('visible');
            }
        });
    }
    
    // Adăugăm clasa CSS pentru elementele animate
    const style = document.createElement('style');
    style.innerHTML = `
        .card, .gallery-item, .blog-card, .about-image, .about-text {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Adăugăm evenimentul la scroll
    window.addEventListener('scroll', animateOnScroll);
    // Apelăm funcția o dată pentru a verifica elementele vizibile la încărcare
    setTimeout(animateOnScroll, 100);
    
    // Efect de hover pentru imagini înainte/după
    const beforeAfterContainers = document.querySelectorAll('.before-after');
    
    beforeAfterContainers.forEach(container => {
        const beforeImg = container.querySelector('.before');
        
        container.addEventListener('mouseenter', () => {
            beforeImg.style.opacity = '0';
        });
        
        container.addEventListener('mouseleave', () => {
            beforeImg.style.opacity = '1';
        });
    });
    
    // Funcționalitatea pop-up-ului de programare
    const openPopupBtns = document.querySelectorAll('.open-popup');
    const closePopup = document.querySelector('.close-popup');
    const popup = document.getElementById('appointment-popup');
    const appointmentForm = document.getElementById('appointment-form');
    
    // Deschide pop-up-ul
    openPopupBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            popup.classList.add('active');
            document.body.style.overflow = 'hidden'; // Previne scroll-ul
        });
    });
    
    // Închide pop-up-ul
    if (closePopup && popup) {
        closePopup.addEventListener('click', function() {
            popup.classList.remove('active');
            document.body.style.overflow = 'auto'; // Reactivează scroll-ul
        });
        
        // Închide pop-up-ul când se face click în afara conținutului
        popup.addEventListener('click', function(e) {
            if (e.target === popup) {
                popup.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Procesare formular de programare
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                nume: document.getElementById('nume').value,
                telefon: document.getElementById('telefon').value,
                oras: document.getElementById('oras').value
            };
            
            // Ar trebui implementat un sistem de stocare/trimitere a datelor
            // Pentru demo, afișăm doar un mesaj de confirmare
            alert(`Programare înregistrată! Vă vom contacta în curând.
                  Nume: ${formData.nume}
                  Telefon: ${formData.telefon}
                  Oraș: ${formData.oras}`);
            
            // Resetați formularul și închideți pop-up-ul
            appointmentForm.reset();
            popup.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
    
    // Funcționalitatea slider-ului galeriei
    const gallerySlider = document.querySelector('.gallery-slider');
    const gallerySlides = document.querySelectorAll('.gallery-slide');
    const prevSlideBtn = document.querySelector('.prev-slide');
    const nextSlideBtn = document.querySelector('.next-slide');
    const galleryFilterBtns = document.querySelectorAll('.gallery-btn');
    
    if (gallerySlider && gallerySlides.length > 0) {
        let currentSlide = 0;
        
        // Funcția pentru a afișa un slide specific
        function showSlide(index) {
            // Ascunde toate slide-urile
            gallerySlides.forEach(slide => {
                slide.style.display = 'none';
            });
            
            // Afișează slide-ul curent
            gallerySlides[index].style.display = 'block';
            currentSlide = index;
        }
        
        // Inițial afișăm primul slide
        showSlide(0);
        
        // Event listeners pentru butoanele de navigare
        if (prevSlideBtn && nextSlideBtn) {
            prevSlideBtn.addEventListener('click', function() {
                let newIndex = currentSlide - 1;
                if (newIndex < 0) {
                    newIndex = gallerySlides.length - 1;
                }
                showSlide(newIndex);
            });
            
            nextSlideBtn.addEventListener('click', function() {
                let newIndex = currentSlide + 1;
                if (newIndex >= gallerySlides.length) {
                    newIndex = 0;
                }
                showSlide(newIndex);
            });
        }
        
        // Filtrare galerie în funcție de categorie
        if (galleryFilterBtns.length > 0) {
            galleryFilterBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    // Elimină clasa "active" de pe toate butoanele
                    galleryFilterBtns.forEach(b => b.classList.remove('active'));
                    // Adaugă clasa "active" pe butonul curent
                    this.classList.add('active');
                    
                    const filter = this.getAttribute('data-filter');
                    
                    // Afișează toate slide-urile inițial
                    gallerySlides.forEach(slide => {
                        slide.style.display = 'none';
                    });
                    
                    // Filtrare și afișare slide-uri în funcție de categorie
                    if (filter === 'toate') {
                        // Afișează primul slide din toate categoriile
                        showSlide(0);
                    } else {
                        // Afișează doar slide-urile din categoria selectată
                        const filteredSlides = [...gallerySlides].filter(slide => 
                            slide.getAttribute('data-category') === filter
                        );
                        
                        if (filteredSlides.length > 0) {
                            // Afișează primul slide din categoria filtrată
                            filteredSlides[0].style.display = 'block';
                            currentSlide = Array.from(gallerySlides).indexOf(filteredSlides[0]);
                        }
                    }
                });
            });
        }
    }
    
    // Funcționalitate smooth scroll pentru link-uri de ancorare
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Ajustare pentru header fix
                    behavior: 'smooth'
                });
            }
        });
    });
}); 