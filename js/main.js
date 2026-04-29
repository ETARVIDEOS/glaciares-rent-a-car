document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Configuración Principal ---
    const WHATSAPP_NUMBER = '56983335924';
    
    const carsData = [
        {
            id: 1,
            name: 'City Car (Sedan)',
            image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            price: 'Desde $35.000 / día',
            transmission: 'Manual/Auto',
            passengers: '5 Pasajeros',
            bags: '2 Maletas'
        },
        {
            id: 2,
            name: 'SUV Familiar',
            image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            price: 'Desde $45.000 / día',
            transmission: 'Manual/Auto',
            passengers: '5 Pasajeros',
            bags: '4 Maletas'
        },
        {
            id: 3,
            name: 'Camioneta 4x4',
            image: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            price: 'Desde $60.000 / día',
            transmission: 'Manual/Auto',
            passengers: '5 Pasajeros',
            bags: '4 Maletas'
        }
    ];

    // --- 2. Renderizar Flota ---
    const carsGrid = document.getElementById('cars-grid');
    if (carsGrid) {
        carsData.forEach((car, index) => {
            const message = `Hola Glaciares Rent a Car. Quiero reservar el ${car.name} que vi en la página web.`;
            const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
            
            // Retraso escalonado para la animación
            const delay = index * 0.2;
            
            const cardHTML = `
                <div class="car-card anim-elem" data-animation="animate__zoomIn" style="animation-delay: ${delay}s">
                    <div class="car-image-container">
                        <img src="${car.image}" alt="${car.name}" class="car-image">
                    </div>
                    <div class="car-info">
                        <h3 class="car-title">${car.name}</h3>
                        <p class="car-price">${car.price}</p>
                        
                        <div class="car-features">
                            <span class="feature"><i class="fa-solid fa-gear"></i> ${car.transmission}</span>
                            <span class="feature"><i class="fa-solid fa-user-group"></i> ${car.passengers}</span>
                            <span class="feature"><i class="fa-solid fa-suitcase"></i> ${car.bags}</span>
                        </div>
                        
                        <div class="scarcity-alert">
                            <span><i class="fa-solid fa-fire"></i> ¡Queda solo 1 unidad!</span>
                            <span class="timer" data-time="600">10:00</span>
                        </div>
                        
                        <a href="${waUrl}" target="_blank" class="btn btn-primary btn-block">
                            <i class="fa-brands fa-whatsapp"></i> Reservar Ahora
                        </a>
                    </div>
                </div>
            `;
            carsGrid.insertAdjacentHTML('beforeend', cardHTML);
        });
    }

    // --- 3. Animaciones Avanzadas (Elementor-style) con IntersectionObserver ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const elem = entry.target;
                const animationClass = elem.getAttribute('data-animation');
                
                // Elementor way: add base animate class + specific animation
                elem.classList.add('animate__animated', animationClass);
                elem.style.opacity = '1';
                
                observer.unobserve(elem);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.anim-elem').forEach(element => {
        observer.observe(element);
    });

    // --- 4. Contadores Numéricos Animados (CountUp) ---
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const suffix = counter.getAttribute('data-suffix') || '+';
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                
                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = Math.ceil(current) + suffix;
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target + suffix;
                    }
                };
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.counter').forEach(counter => {
        counterObserver.observe(counter);
    });

    // --- 5. Typed.js (Efecto de Escritura en Hero) ---
    if (document.getElementById('typed-text')) {
        new Typed('#typed-text', {
            strings: ['vehículos premium.', 'asistencia 24/7.', 'tranquilidad total.', 'la mejor experiencia.'],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }

    // --- 6. Swiper.js (Carrusel de Testimonios) ---
    if (document.querySelector('.testimonial-swiper')) {
        new Swiper('.testimonial-swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                }
            }
        });
    }

    // --- 7. Contador Regresivo Scarcity ---
    const timers = document.querySelectorAll('.timer');
    setInterval(() => {
        timers.forEach(timer => {
            let time = parseInt(timer.getAttribute('data-time'));
            if (time > 0) {
                time--;
                timer.setAttribute('data-time', time);
                
                let minutes = Math.floor(time / 60);
                let seconds = time % 60;
                
                minutes = minutes < 10 ? '0' + minutes : minutes;
                seconds = seconds < 10 ? '0' + seconds : seconds;
                
                timer.textContent = `${minutes}:${seconds}`;
            }
        });
    }, 1000);

    // --- 8. Burbujas Rotatorias (Social Proof) ---
    const toastContainer = document.getElementById('toast-container');
    const names = ['Juan Pérez', 'María González', 'Carlos Silva', 'Ana Muñoz', 'Pedro Reyes'];
    
    function showToast() {
        if(!toastContainer) return;
        
        const randomName = names[Math.floor(Math.random() * names.length)];
        const randomCar = carsData[Math.floor(Math.random() * carsData.length)].name;
        
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <div class="toast-icon"><i class="fa-solid fa-check-circle"></i></div>
            <div class="toast-text">
                <strong>${randomName}</strong> acaba de reservar un <strong>${randomCar}</strong>.
            </div>
        `;
        
        toastContainer.appendChild(toast);
        setTimeout(() => toast.classList.add('show'), 100);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 500);
        }, 5000);
    }

    function scheduleNextToast() {
        const nextTime = Math.random() * (30000 - 15000) + 15000;
        setTimeout(() => {
            showToast();
            scheduleNextToast();
        }, nextTime);
    }
    
    setTimeout(() => {
        showToast();
        scheduleNextToast();
    }, 3000);

    // --- 9. Acordeón Términos y Condiciones ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            header.classList.toggle('active');
            const content = header.nextElementSibling;
            if (header.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    // --- 10. Formulario de Contacto Inteligente ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nombre = document.getElementById('nombre').value;
            const fechas = document.getElementById('fechas').value;
            const mensaje = document.getElementById('mensaje').value;
            
            const texto = `Hola Glaciares Rent a Car. Mi nombre es ${nombre}. Fechas de viaje: ${fechas}. Mensaje: ${mensaje}`;
            const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;
            window.open(url, '_blank');
        });
    }

    // --- 11. Botón Flotante Global ---
    const floatingBtn = document.getElementById('floating-wa');
    if (floatingBtn) {
        floatingBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=Hola,%20me%20gustar%C3%ADa%20cotizar%20un%20arriendo%20de%20veh%C3%ADculo.`;
    }
});
