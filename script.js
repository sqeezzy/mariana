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
    const navLinks = document.querySelectorAll('nav a, .footer-links a, .cta-buttons a, .service-btn');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') && link.getAttribute('href').startsWith('#')) {
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
    
    // Gestionarea formularului de contact principal
    const mainContactForm = document.querySelector('#appointmentForm');
    
    if (mainContactForm) {
        mainContactForm.addEventListener('submit', function(e) {
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
            mainContactForm.reset();
        });
    }
    
    // Slider pentru testimoniale
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevTestimonialBtn = document.querySelector('.prev-btn');
    const nextTestimonialBtn = document.querySelector('.next-btn');
    let currentTestimonialIndex = 0;
    
    function showTestimonialSlide(n) {
        testimonialSlides.forEach(slide => {
            slide.style.opacity = '0';
            slide.style.position = 'absolute';
        });
        
        testimonialSlides[n].style.opacity = '1';
        testimonialSlides[n].style.position = 'relative';
    }
    
    if (testimonialSlides.length > 0 && prevTestimonialBtn && nextTestimonialBtn) {
        nextTestimonialBtn.addEventListener('click', function() {
            currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialSlides.length;
            showTestimonialSlide(currentTestimonialIndex);
        });
        
        prevTestimonialBtn.addEventListener('click', function() {
            currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonialSlides.length) % testimonialSlides.length;
            showTestimonialSlide(currentTestimonialIndex);
        });
        
        // Auto slide la fiecare 5 secunde
        setInterval(function() {
            currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialSlides.length;
            showTestimonialSlide(currentTestimonialIndex);
        }, 5000);
    }
    
    // Filtru pentru portofoliu
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                // Actualizăm butonul activ
                filterButtons.forEach(b => b.classList.remove('active'));
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
    const openPopupButtons = document.querySelectorAll('.open-popup');
    const closePopupButton = document.querySelector('.close-popup');
    const schedulePopup = document.getElementById('appointment-popup');
    const scheduleForm = document.getElementById('appointment-form');
    
    // Deschide pop-up-ul
    if (openPopupButtons.length > 0 && schedulePopup) {
        openPopupButtons.forEach(button => {
            button.addEventListener('click', function() {
                schedulePopup.classList.add('active');
                document.body.style.overflow = 'hidden'; // Previne scroll-ul
            });
        });
    }
    
    // Închide pop-up-ul
    if (closePopupButton && schedulePopup) {
        closePopupButton.addEventListener('click', function() {
            schedulePopup.classList.remove('active');
            document.body.style.overflow = 'auto'; // Reactivează scroll-ul
        });
        
        // Închide pop-up când utilizatorul face clic în afara conținutului
        schedulePopup.addEventListener('click', function(e) {
            if (e.target === schedulePopup) {
                schedulePopup.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Validare formular programare
    if (scheduleForm) {
        scheduleForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nume = document.getElementById('nume').value;
            const telefon = document.getElementById('telefon').value;
            const oras = document.getElementById('oras').value;
            
            if (nume && telefon && oras) {
                // Aici ar putea fi codul pentru trimiterea datelor la server
                alert('Programarea a fost înregistrată cu succes!');
                this.reset();
                schedulePopup.classList.remove('active');
                document.body.style.overflow = 'auto';
            } else {
                alert('Toate câmpurile sunt obligatorii!');
            }
        });
    }
    
    // Elemente galerie
    const galleryNavButtons = document.querySelectorAll('.gallery-btn');
    const galleryImageSlides = document.querySelectorAll('.gallery-slide');
    const galleryContainer = document.querySelector('.gallery-slider');
    const prevGalleryButton = document.querySelector('.prev-slide');
    const nextGalleryButton = document.querySelector('.next-slide');
    let currentGalleryIndex = 0;
    
    // Funcția pentru afișarea slide-urilor în galerie
    function showGallerySlide(index) {
        galleryImageSlides.forEach(slide => {
            slide.style.display = 'none';
        });
        
        galleryImageSlides[index].style.display = 'block';
    }
    
    // Filtrare galerie
    if (galleryNavButtons.length > 0 && galleryImageSlides.length > 0) {
        galleryNavButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Elimină clasa active de pe toate butoanele
                galleryNavButtons.forEach(btn => btn.classList.remove('active'));
                
                // Adaugă clasa active pe butonul curent
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                let visibleSlides = [];
                
                galleryImageSlides.forEach((slide, idx) => {
                    if (filter === 'toate' || slide.getAttribute('data-category') === filter) {
                        slide.dataset.visible = 'true';
                        visibleSlides.push(idx);
                    } else {
                        slide.dataset.visible = 'false';
                    }
                });
                
                // Resetăm indexul curent și afișăm primul slide vizibil
                if (visibleSlides.length > 0) {
                    currentGalleryIndex = visibleSlides[0];
                    showGallerySlide(currentGalleryIndex);
                }
            });
        });
    }
    
    // Navigare galerie (prev/next)
    if (prevGalleryButton && nextGalleryButton && galleryContainer && galleryImageSlides.length > 0) {
        // Funcția pentru actualizarea poziției galerie
        function updateGalleryPosition() {
            showGallerySlide(currentGalleryIndex);
        }
        
        prevGalleryButton.addEventListener('click', function() {
            // Găsim următorul slide vizibil în direcția înapoi
            let newIndex = currentGalleryIndex;
            let count = 0;
            
            while (count < galleryImageSlides.length) {
                newIndex = (newIndex - 1 + galleryImageSlides.length) % galleryImageSlides.length;
                
                if (!galleryImageSlides[newIndex].dataset.visible || 
                    galleryImageSlides[newIndex].dataset.visible === 'true') {
                    currentGalleryIndex = newIndex;
                    break;
                }
                
                count++;
            }
            
            updateGalleryPosition();
        });
        
        nextGalleryButton.addEventListener('click', function() {
            // Găsim următorul slide vizibil în direcția înainte
            let newIndex = currentGalleryIndex;
            let count = 0;
            
            while (count < galleryImageSlides.length) {
                newIndex = (newIndex + 1) % galleryImageSlides.length;
                
                if (!galleryImageSlides[newIndex].dataset.visible || 
                    galleryImageSlides[newIndex].dataset.visible === 'true') {
                    currentGalleryIndex = newIndex;
                    break;
                }
                
                count++;
            }
            
            updateGalleryPosition();
        });
        
        // Inițializăm poziția galerie
        updateGalleryPosition();
    }
    
    // Schimbare locații (București/Chișinău)
    const locationTabs = document.querySelectorAll('.location-tab');
    const locationContents = document.querySelectorAll('.location-content');
    
    if (locationTabs.length > 0 && locationContents.length > 0) {
        locationTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Elimină clasa active de pe toate butoanele
                locationTabs.forEach(t => t.classList.remove('active'));
                // Adaugă clasa active pe butonul curent
                this.classList.add('active');
                
                // Ascunde toate conținuturile de locație
                locationContents.forEach(content => {
                    content.classList.remove('active');
                });
                
                // Afișează conținutul corespunzător
                const city = this.getAttribute('data-city');
                document.getElementById(`${city}-location`).classList.add('active');
            });
        });
    }
    
    // Galerie de imagini cu efect de scrolare completă (Fullpage Scrolling Gallery)
    const fullGalleryImages = document.querySelectorAll('.full-gallery-image');
    
    if (fullGalleryImages.length > 0) {
        let fullGalleryIndex = 0;
        const fullGalleryCount = fullGalleryImages.length;
        
        // Ascunde toate imaginile în afară de prima
        fullGalleryImages.forEach((img, index) => {
            if (index !== 0) {
                img.style.opacity = 0;
            }
        });
        
        // Funcție pentru a naviga în galerie
        function navigateFullGallery(direction) {
            fullGalleryImages[fullGalleryIndex].style.opacity = 0;
            
            fullGalleryIndex = (fullGalleryIndex + direction + fullGalleryCount) % fullGalleryCount;
            
            fullGalleryImages[fullGalleryIndex].style.opacity = 1;
        }
        
        // Adaugă navigare cu tastatura săgeți
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                navigateFullGallery(1);
            } else if (e.key === 'ArrowLeft') {
                navigateFullGallery(-1);
            }
        });
        
        // Adaugă navigare cu butoane pe ecran (dacă există)
        const fullGalleryNext = document.querySelector('.full-gallery-next');
        const fullGalleryPrev = document.querySelector('.full-gallery-prev');
        
        if (fullGalleryNext) {
            fullGalleryNext.addEventListener('click', () => navigateFullGallery(1));
        }
        
        if (fullGalleryPrev) {
            fullGalleryPrev.addEventListener('click', () => navigateFullGallery(-1));
        }
        
        // Adaugă navigare cu swipe pentru dispozitive mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleFullGallerySwipe();
        }, false);
        
        function handleFullGallerySwipe() {
            if (touchEndX < touchStartX) {
                // Swipe stânga -> imagine următoare
                navigateFullGallery(1);
            } else if (touchEndX > touchStartX) {
                // Swipe dreapta -> imagine anterioară
                navigateFullGallery(-1);
            }
        }
    }
    
    // Validare și procesare formular de contact secundar
    const secondaryContactForm = document.getElementById('contactForm');
    if (secondaryContactForm) {
        secondaryContactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Exemplu de validare simplă
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const city = document.getElementById('city').value;
            const message = document.getElementById('message').value;
            
            // Verificare dacă toate câmpurile sunt completate
            if (name && email && phone && city && message) {
                // Aici ar trebui să adaugi codul pentru a trimite datele la server
                // Pentru acest exemplu, doar afișăm un mesaj de succes
                
                alert('Mulțumim pentru mesaj! Te vom contacta în curând.');
                secondaryContactForm.reset();
            } else {
                alert('Te rugăm să completezi toate câmpurile obligatorii.');
            }
        });
    }
}); 