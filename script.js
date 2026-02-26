// Efecto de scroll para cambiar el estilo de la navegación
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('nav-active');
    } else {
        navbar.classList.remove('nav-active');
    }
});

// Animación simple de entrada para las tarjetas
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "all 0.6s ease-out";
    observer.observe(card);
});

// Funcionalidad del botón "Volver arriba"
const backToTopButton = document.getElementById('backToTop');

// Mostrar/ocultar el botón según el scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

// Scroll suave al hacer clic
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==========================================
// Lightbox (Visor de Imágenes) para la Galería
// ==========================================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeBtn = document.querySelector('.lightbox-close');

// Solo si existen los elementos en la página actual (para evitar errores en otras páginas)
if (lightbox && lightboxImg && closeBtn) {
    const galleryImages = document.querySelectorAll('.gallery-item img');

    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            lightbox.classList.add('active');
            lightboxImg.src = img.src;
            /* Intentamos obtener el título que está justo debajo dentro .gallery-caption */
            const captionBlock = img.parentElement.querySelector('.gallery-caption h3') ||
                img.closest('.gallery-item').querySelector('.gallery-caption h3');

            if (captionBlock) {
                lightboxCaption.textContent = captionBlock.textContent;
            } else {
                lightboxCaption.textContent = img.alt || "";
            }
        });
    });

    // Cerrar con la X
    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    // Cerrar al hacer clic en cualquier parte fuera de la imagen (el fondo oscuro)
    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) {
            lightbox.classList.remove('active');
        }
    });

    // Cerrar con la tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
        }
    });
}