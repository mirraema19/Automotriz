document.addEventListener('DOMContentLoaded', function() {

    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Cierra el menú si se hace clic en un enlace (para navegación en la misma página)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });



    // Scroll Animation for Sections
    const sections = document.querySelectorAll('main section');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });


    // Código para el Carrusel de Imágenes
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const dotsContainer = document.querySelector('.slider-dots');
    const slides = document.querySelectorAll('.slider-slide');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    let autoSlideInterval;
    const slideDuration = 8000; // 8 segundos por slide

    function showSlide(index) {
        if (!slides.length || !dots.length) return; // Evita errores si no hay carrusel

        if (index >= slides.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = slides.length - 1;
        } else {
            currentIndex = index;
        }

        const offset = -currentIndex * 100;
        sliderWrapper.style.transform = `translateX(${offset}%)`;

        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentIndex].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function startAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, slideDuration);
    }

    if (dotsContainer) {
        dotsContainer.addEventListener('click', function(event) {
            if (event.target.classList.contains('dot')) {
                const index = parseInt(event.target.dataset.index);
                showSlide(index);
                startAutoSlide();
            }
        });
    }

    if (sliderWrapper) {
        showSlide(0);
        startAutoSlide();
        sliderWrapper.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        sliderWrapper.addEventListener('mouseleave', startAutoSlide);
    }
});