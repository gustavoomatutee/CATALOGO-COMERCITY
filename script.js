document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       MÓDULO 1: NAVEGACIÓN Y HEADER (Menú, Dropdown, Glassmorphism)
       ========================================================================== */
       
    // Selección de elementos
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const menuOverlay = document.getElementById('menuOverlay');
    const btnProveedores = document.getElementById('btnProveedores');
    const proveedoresList = document.getElementById('proveedoresList');

    // Función principal para abrir/cerrar menú lateral
    const toggleMenu = () => {
        sidebar.classList.toggle('active');
        menuOverlay.classList.toggle('active');
    };

    // Eventos de clic para el menú
    if (menuToggle && menuOverlay) {
        menuToggle.addEventListener('click', toggleMenu);
        menuOverlay.addEventListener('click', toggleMenu);
    }

    // Evento para el Dropdown de Proveedores (Acordeón)
    if (btnProveedores && proveedoresList) {
        btnProveedores.addEventListener('click', () => {
            proveedoresList.classList.toggle('show');
            const span = btnProveedores.querySelector('span');
            span.textContent = proveedoresList.classList.contains('show') ? '-' : '+';
        });
    }

    /* ==========================================================================
       MÓDULO 2: CATÁLOGO TIPO LIBRO (Carrusel interactivo)
       ========================================================================== */
       
    // Variables de estado y elementos del DOM
    let currentPageIndex = 0;
    const pagesContainer = document.getElementById('catalogPages');
    const prevButton = document.getElementById('catalogPrev');
    const nextButton = document.getElementById('catalogNext');

    // Verificamos que el contenedor del catálogo exista en la página actual
    if (pagesContainer && prevButton && nextButton) {
        
        const pages = pagesContainer.querySelectorAll('.page-slide');
        const totalPages = pages.length;

        // Función central para manejar la transición de páginas
        const updatePage = (direction) => {
            if (totalPages === 0) return;

            const currentPage = pages[currentPageIndex];
            let nextPageIndex;

            if (direction === 'next') {
                nextPageIndex = (currentPageIndex + 1) % totalPages;
            } else {
                nextPageIndex = (currentPageIndex - 1 + totalPages) % totalPages;
            }

            const nextPage = pages[nextPageIndex];

            // Removemos active de todas las páginas primero
            pages.forEach(page => {
                page.classList.remove('active', 'prev');
            });

            // Añadimos la clase prev a la página actual según dirección
            if (direction === 'next') {
                currentPage.classList.add('prev');
            }

            // Activamos la siguiente página
            nextPage.classList.add('active');

            // Actualizamos el índice
            currentPageIndex = nextPageIndex;
        };

        // Eventos de los botones de navegación del catálogo
        nextButton.addEventListener('click', () => updatePage('next'));
        prevButton.addEventListener('click', () => updatePage('prev'));

        /* ==========================================================================
           MÓDULO 3: CONTROLADOR GLOBAL DE TECLADO (Accesibilidad)
           ========================================================================== */
           
        // Unificamos todos los eventos de teclado en un solo listener por rendimiento
        document.addEventListener('keydown', (e) => {
            
            // 1. Cerrar menú con tecla ESC si está abierto
            if (e.key === 'Escape' && sidebar.classList.contains('active')) {
                toggleMenu();
            }
            
            // 2. Navegar por el catálogo con flechas izquierda/derecha
            if (e.key === 'ArrowRight') {
                updatePage('next');
            } else if (e.key === 'ArrowLeft') {
                updatePage('prev');
            }
        });
    }
});