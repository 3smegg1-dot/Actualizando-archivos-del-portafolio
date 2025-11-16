document.addEventListener('DOMContentLoaded', function () {
    const body = document.getElementById('body');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeIcon = document.getElementById('darkModeIcon');
    const contactForm = document.getElementById('contactForm');
    const navLinks = document.querySelectorAll('.nav-link');

    // ==========================================================
    // 1. Funcionalidad de Modo Oscuro
    // ==========================================================

    // Función para aplicar o remover el modo oscuro
    function setDarkMode(isDark) {
        if (isDark) {
            body.classList.add('dark');
            darkModeIcon.classList.remove('fa-moon');
            darkModeIcon.classList.add('fa-sun');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            body.classList.remove('dark');
            darkModeIcon.classList.remove('fa-sun');
            darkModeIcon.classList.add('fa-moon');
            localStorage.setItem('darkMode', 'disabled');
        }
    }

    // Inicialización: Cargar la preferencia del usuario
    const currentMode = localStorage.getItem('darkMode');
    
    if (currentMode === 'enabled') {
        // Si el usuario lo habilitó antes, mantenerlo
        setDarkMode(true);
    } else if (currentMode === 'disabled') {
        // Si el usuario lo deshabilitó antes, mantenerlo
        setDarkMode(false);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Si no hay preferencia guardada, pero el sistema prefiere oscuro, activar
        setDarkMode(true);
    } else {
        // Por defecto, modo claro
        setDarkMode(false);
    }

    // Event Listener para el botón Toggle
    darkModeToggle.addEventListener('click', function () {
        // Obtener el estado actual (si tiene la clase 'dark')
        const isCurrentlyDark = body.classList.contains('dark');
        setDarkMode(!isCurrentlyDark);
    });

    // ==========================================================
    // 2. Smooth Scroll para Navbar
    // ==========================================================

    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            // Previene el comportamiento por defecto de anclaje (salto brusco)
            event.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Scroll suave
                window.scrollTo({
                    top: targetElement.offsetTop - (document.querySelector('.navbar').offsetHeight) + 1, // Ajuste para el navbar fijo
                    behavior: 'smooth'
                });

                // Cierra el navbar colapsado en móviles (Bootstrap)
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.getElementById('navbarNav');
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click(); // Simula el click para cerrar
                }
            }
        });
    });

    // ==========================================================
    // 3. Formulario de Contacto (Simulación de Envío)
    // ==========================================================

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Detener el envío real del formulario

        // Simular el proceso de envío
        setTimeout(() => {
            alert('¡Mensaje enviado! 📧 Gracias por contactar a Esmeralda Guzman. Te responderemos pronto.');
            contactForm.reset(); // Limpiar el formulario
        }, 300); // Pequeño delay para simular el procesamiento
    });

});
