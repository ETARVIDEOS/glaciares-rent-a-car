document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Configuración Principal ---
    const WHATSAPP_NUMBER = '56983335924';
    
    // Datos de ejemplo para la flota (Placeholder hasta que el cliente defina)
    const carsData = [
        {
            id: 1,
            name: 'Peugeot 3008',
            image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            price: '$45.000 / día',
            transmission: 'Automático',
            passengers: '5 Pasajeros',
            bags: '3 Maletas'
        },
        {
            id: 2,
            name: 'Toyota Hilux 4x4',
            image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            price: '$60.000 / día',
            transmission: 'Manual',
            passengers: '5 Pasajeros',
            bags: '4 Maletas'
        },
        {
            id: 3,
            name: 'Jeep Compass',
            image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            price: '$50.000 / día',
            transmission: 'Automático',
            passengers: '5 Pasajeros',
            bags: '3 Maletas'
        }
    ];

    // Nombres para social proof
    const names = ['Juan Pérez', 'María González', 'Carlos Silva', 'Ana Muñoz', 'Pedro Reyes', 'Camila Soto'];
    const times = ['hace 2 horas', 'hace 5 minutos', 'hace 1 hora', 'hace 15 minutos', 'recién'];

    // --- 2. Renderizar Flota ---
    const carsGrid = document.getElementById('cars-grid');
    
    if (carsGrid) {
        carsData.forEach(car => {
            const message = `Hola Glaciares Rent a Car. Quiero reservar el ${car.name} que vi en la página web.`;
            const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
            
            const cardHTML = `
                <div class="car-card fade-in-up">
                    <img src="${car.image}" alt="${car.name}" class="car-image">
                    <div class="car-info">
                        <h3 class="car-title">${car.name}</h3>
                        <p class="car-price">${car.price}</p>
                        
                        <div class="car-features">
                            <span class="feature">⚙️ ${car.transmission}</span>
                            <span class="feature">👥 ${car.passengers}</span>
                            <span class="feature">🧳 ${car.bags}</span>
                        </div>
                        
                        <div class="scarcity-alert">
                            <span>¡Queda solo 1 unidad!</span>
                            <span class="timer" data-time="600">10:00</span>
                        </div>
                        
                        <a href="${waUrl}" target="_blank" class="btn btn-whatsapp">
                            Reserva Inmediata
                        </a>
                    </div>
                </div>
            `;
            carsGrid.insertAdjacentHTML('beforeend', cardHTML);
        });
    }

    // --- 3. Lógica del Contador Regresivo ---
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

    // --- 4. Burbujas Rotatorias (Social Proof) ---
    const toastContainer = document.getElementById('toast-container');
    
    function showToast() {
        const randomName = names[Math.floor(Math.random() * names.length)];
        const randomCar = carsData[Math.floor(Math.random() * carsData.length)].name;
        const randomTime = times[Math.floor(Math.random() * times.length)];
        
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <div class="toast-icon">✅</div>
            <div class="toast-text">
                <strong>${randomName}</strong> acaba de reservar un <strong>${randomCar}</strong> ${randomTime}.
            </div>
        `;
        
        toastContainer.appendChild(toast);
        
        // Animación de entrada
        setTimeout(() => toast.classList.add('show'), 100);
        
        // Animación de salida y eliminación
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 500);
        }, 5000);
    }

    // Mostrar una notificación cada 15 a 30 segundos
    function scheduleNextToast() {
        const nextTime = Math.random() * (30000 - 15000) + 15000;
        setTimeout(() => {
            showToast();
            scheduleNextToast();
        }, nextTime);
    }
    
    // Iniciar primer toast a los 3 segundos
    setTimeout(() => {
        showToast();
        scheduleNextToast();
    }, 3000);


    // --- 5. Animaciones al hacer Scroll (IntersectionObserver) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up').forEach(element => {
        observer.observe(element);
    });

    // --- 6. Botón Flotante Global ---
    const floatingBtn = document.getElementById('floating-wa');
    if (floatingBtn) {
        floatingBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=Hola,%20me%20gustar%C3%ADa%20cotizar%20un%20arriendo%20de%20veh%C3%ADculo.`;
    }
});
