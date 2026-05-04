document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Configuración Principal ---
    const WHATSAPP_NUMBER = '56983335924';
    
    // Nueva Data Real de Flota Local
    const carsData = [
        {
            id: 1,
            category: 'Citycar',
            name: 'SUZUKI SWIFT',
            image: 'IMAGENES_GLACIARES_NUEVO AUTOS/CITYCAR/SUZUKI SWIFT.jpeg',
            price: '$35.000 / día',
            transmission: 'Mecánico',
            passengers: '5',
            fuel: 'Bencina',
            scale: 1.1
        },
        {
            id: 2,
            category: 'Citycar',
            name: 'SUZUKI DZIRE',
            image: 'IMAGENES_GLACIARES_NUEVO AUTOS/CITYCAR/SUZUKI DZIRE.jpeg',
            price: '$35.000 / día',
            transmission: 'Mecánico',
            passengers: '5',
            fuel: 'Bencina',
            scale: 1.15
        },
        {
            id: 3,
            category: 'SUV',
            name: 'CHEVROLET CAPTIVA',
            image: 'IMAGENES_GLACIARES_NUEVO AUTOS/SUV/CHEVROTET CAPTIVA.jpeg',
            price: '$45.000 / día',
            transmission: 'Mecánico',
            passengers: '7',
            fuel: 'Bencina',
            scale: 1.25
        },
        {
            id: 6,
            category: 'Furgón',
            name: 'HYUNDAI H1',
            image: 'IMAGENES_GLACIARES_NUEVO AUTOS/FURGÓN/HYUNDAI H1.jpeg',
            price: '$65.000 / día',
            transmission: 'Mecánico',
            passengers: '9',
            fuel: 'Diesel',
            scale: 1.1
        },
        {
            id: 7,
            category: 'SUV',
            name: 'HYUNDAI TUCSON',
            image: 'IMAGENES_GLACIARES_NUEVO AUTOS/SUV/HYUNDAI TUCSON (1).jpeg',
            price: '$45.000 / día',
            transmission: 'Automático',
            passengers: '5',
            fuel: 'Diesel',
            scale: 1.2
        },
        {
            id: 8,
            category: 'SUV',
            name: 'KIA SORENTO',
            image: 'IMAGENES_GLACIARES_NUEVO AUTOS/SUV/KIA SORENTO.jpeg',
            price: '$50.000 / día',
            transmission: 'Automático',
            passengers: '7',
            fuel: 'Diesel',
            scale: 1.2
        },
        {
            id: 9,
            category: 'SUV',
            name: 'HYUNDAI TUCSON',
            image: 'IMAGENES_GLACIARES_NUEVO AUTOS/SUV/HYUNDAI TUCSON (2).jpeg',
            price: '$45.000 / día',
            transmission: 'Automático',
            passengers: '5',
            fuel: 'Diesel',
            scale: 1.2
        }
    ];

    // --- 2. Lógica de Pestañas y Renderizado de Flota ---
    const carsGrid = document.getElementById('cars-grid');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const modal = document.getElementById('car-modal');

    function renderCars(category = 'todos') {
        if (!carsGrid) return;
        carsGrid.innerHTML = '';
        
        const filteredCars = category === 'todos' 
            ? carsData 
            : carsData.filter(car => car.category === category);
            
        filteredCars.forEach((car, index) => {
            const delay = index * 0.1;
            
            const cardHTML = `
                <div class="car-card animate__animated animate__fadeInUp" style="animation-delay: ${delay}s" data-id="${car.id}">
                    <div class="car-image-container">
                        <div class="car-image-wrapper" style="width: 100%; height: 100%; ${car.scale ? `transform: scale(${car.scale});` : ''}">
                            <img src="${car.image}" alt="${car.name}" class="car-image" loading="lazy">
                        </div>
                    </div>
                    <div class="car-info">
                        <h3 class="car-title">${car.name}</h3>
                        <p class="car-price">${car.price}</p>
                        
                        <div class="scarcity-alert">
                            <span><i class="fa-solid fa-fire"></i> ¡Queda solo 1 unidad!</span>
                            <span class="timer" data-time="600">10:00</span>
                        </div>
                        
                        <span class="badge-sm" style="margin-top: 10px; display: inline-block;">Ver Detalles</span>
                    </div>
                </div>
            `;
            carsGrid.insertAdjacentHTML('beforeend', cardHTML);
        });
        
        // Asignar eventos de clic a las nuevas tarjetas para abrir el Modal
        document.querySelectorAll('.car-card').forEach(card => {
            card.addEventListener('click', function() {
                const carId = parseInt(this.getAttribute('data-id'));
                openModal(carId);
            });
        });
    }

    // Inicializar Flota Completa
    renderCars();

    // Eventos de Pestañas
    tabButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            tabButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            const category = e.target.getAttribute('data-category');
            renderCars(category);
        });
    });

    // --- 3. Lógica del Modal (Pop-up) de Vehículos ---
    function openModal(carId) {
        const car = carsData.find(c => c.id === carId);
        if(!car) return;
        
        document.getElementById('modal-title').textContent = car.name;
        document.getElementById('modal-category').textContent = car.category;
        document.getElementById('modal-price').textContent = car.price;
        document.getElementById('modal-img').src = car.image;
        document.getElementById('modal-pax').textContent = car.passengers;
        document.getElementById('modal-trans').textContent = car.transmission;
        document.getElementById('modal-fuel').textContent = car.fuel;
        
        const message = `Hola Glaciares Rent a Car. Me gustaría consultar disponibilidad por el vehículo: ${car.name} (${car.category}).`;
        const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        document.getElementById('modal-ws-btn').href = waUrl;
        
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    const closeModalBtn = document.querySelector('.close-modal');
    if (closeModalBtn && modal) {
        closeModalBtn.addEventListener('click', () => {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // --- 4. Swiper del Hero Background ---
    if (document.querySelector('.hero-swiper')) {
        new Swiper('.hero-swiper', {
            effect: 'fade',
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            allowTouchMove: false
        });
    }

    // --- 5. Animaciones Avanzadas con IntersectionObserver ---
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
                
                elem.classList.add('animate__animated', animationClass);
                elem.style.opacity = '1';
                
                observer.unobserve(elem);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.anim-elem').forEach(element => {
        observer.observe(element);
    });

    // --- 6. Contadores Numéricos Animados (CountUp) ---
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const suffix = counter.getAttribute('data-suffix') || '+';
                const duration = 2000;
                const increment = target / (duration / 16);
                
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

    // --- 7. Typed.js (Efecto de Escritura en Hero) ---
    if (document.getElementById('typed-text')) {
        new Typed('#typed-text', {
            strings: ['vehículos.', 'asistencia 24/7.', 'tranquilidad total.', 'la mejor experiencia.'],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }

    // --- 8. Swiper.js (Carrusel de Testimonios) ---
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
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            }
        });
    }

    // --- 9. Contador Regresivo Scarcity (¡Queda solo 1 unidad!) ---
    setInterval(() => {
        // Obtenemos los timers dinámicamente porque se re-renderizan al cambiar pestaña
        const timers = document.querySelectorAll('.timer');
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

    // --- 10. Burbujas Rotatorias (Social Proof) ---
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
                <strong>${randomName}</strong> acaba de consultar por un <strong>${randomCar}</strong>.
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

    // --- 11. Acordeón Términos y Condiciones ---
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

    // --- 12. Formulario de Contacto Inteligente ---
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

    // --- 13. Botón Flotante Global ---
    const floatingBtn = document.getElementById('floating-wa');
    if (floatingBtn) {
        floatingBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=Hola,%20me%20gustar%C3%ADa%20cotizar%20un%20arriendo%20de%20veh%C3%ADculo.`;
    }
});
