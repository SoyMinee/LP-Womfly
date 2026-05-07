document.addEventListener('DOMContentLoaded', () => {

    // =========================================
    // 1. CONFIGURACIÓN DE DATOS (Proyectos)
    // =========================================
    const colorInicio = "#1dbbff"; // Color base al estar al principio

    const projects = [
        {
            desc: "La unión de dos mundos creativos bajo una misma visión: Womfly.",
            client: "Explora el universo Womfly",
            imgL: "media/logo-grande.png",
            imgR: "media/logoblanco-pequeno.png",
            color: "#9bc4fe"
        },
        {
            desc: "Estética avanzada y cuidado personal. Un enfoque centrado en la armonía corporal.",
            client: "Cliente: Kalon Sandra Pérez",
            imgL: "media/sandra.png", 
            imgR: "media/logo-kalon.png",
            color: "#e9c2db" 
        },
        {
            desc: "Narrativa visual y fotografía estratégica para marcas con identidad propia.",
            client: "Cliente: Olivalolò Oliva López",
            imgL: "media/olivalolo.png",
            imgR: "media/logo-olivalolo.png",
            color: "#df1c4a"
        },
        
    ];

    let currentIndex = 0;
    let isAnimating = false;

    // =========================================
    // 2. SCROLL HORIZONTAL Y GESTIÓN DE COLOR
    // =========================================
    const header = document.getElementById('sticky-header');

    window.addEventListener('scroll', () => {
        // Lógica de Header (Scroll Vertical)
        if (window.scrollY > 150) {
            header.classList.add('visible');
        } else {
            header.classList.remove('visible');
        }
    });

    // FUNCIÓN CORREGIDA
    const updateBackground = () => {
        const scrollX = window.scrollX;
        const umbralInicio = 18; // Si el scroll horizontal es menor a 100px
        
        let targetColor;

        if (scrollX < umbralInicio) {
            // Volvemos al color original si estamos al principio
            targetColor = colorInicio;
        } else {
            // Usamos el color del proyecto actual si estamos navegando
            targetColor = projects[currentIndex].color;
        }

        // Aplicamos el cambio al backgroundColor. 
        // El CSS debe tener: transition: background-color 1.2s ease;
        document.body.style.backgroundColor = targetColor;
    };

    window.addEventListener('scroll', updateBackground);
    
    window.addEventListener('wheel', (evt) => {
        if (evt.deltaY !== 0) {
            window.scrollBy({
                left: evt.deltaY * 2.5,
                behavior: 'auto'
            });
        }
    });

    updateBackground();

    // =========================================
    // 3. CARRUSEL Y COLUMNA DE INFO DINÁMICA
    // =========================================
    const mainButterfly = document.getElementById('main-butterfly');
    const infoWrapper = document.getElementById('info-content-wrapper');
    const projectDesc = document.getElementById('project-desc');
    const projectClient = document.getElementById('project-client');
    const imgLeft = document.getElementById('img-left');
    const imgRight = document.getElementById('img-right');

    if (mainButterfly) {
        mainButterfly.addEventListener('click', () => {
            if (isAnimating) return;
            isAnimating = true;

            mainButterfly.classList.add('is-folding');
            if (infoWrapper) infoWrapper.classList.add('fade-out-right');

            setTimeout(() => {
                currentIndex = (currentIndex + 1) % projects.length;
                const p = projects[currentIndex];

                imgLeft.src = p.imgL;
                imgRight.src = p.imgR;
                if (projectDesc) projectDesc.textContent = p.desc;
                if (projectClient) projectClient.textContent = p.client;

                document.documentElement.style.setProperty('--accent-color', p.color);

                // Actualizamos el fondo inmediatamente con el nuevo color del proyecto
                updateBackground();

                mainButterfly.classList.remove('is-folding');
                
                setTimeout(() => {
                    if (infoWrapper) infoWrapper.classList.remove('fade-out-right');
                    isAnimating = false;
                }, 150);

            }, 800);
        });
    }

    // =========================================
    // 4. ANIMACIONES DE ENTRADA Y MARIPOSAS
    // =========================================
    const flyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                mainButterfly.classList.add('start-flying');
                flyObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    if (mainButterfly) {
        const section = document.getElementById('exhibitor-section');
        if(section) flyObserver.observe(section);
    }

    const btf1 = document.getElementById('btf-1');
    const btf2 = document.getElementById('btf-2');
    let butterfliesHaveFlown = false;

    function shooButterflies() {
        if (butterfliesHaveFlown) return;
        butterfliesHaveFlown = true;
        if (btf1) btf1.classList.add('is-flying');
        if (btf2) btf2.classList.add('is-flying');
    }

    const heroTrigger = document.getElementById('hero-trigger');
    if (heroTrigger) {
        heroTrigger.addEventListener('mouseenter', shooButterflies);
    }

    window.addEventListener('scroll', () => {
        if (window.scrollX > 50) shooButterflies();
    });
});