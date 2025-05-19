/**
 * NovaNest E-commerce - Slider JavaScript
 * Handles hero slider and testimonial slider functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Hero Slider
    initHeroSlider();
    
    // Initialize Testimonial Slider
    initTestimonialSlider();
});

/**
 * Initializes the hero slider on the homepage
 */
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slider .slide');
    const dots = document.querySelectorAll('.hero-slider .dot');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    
    if (!slides.length) return;
    
    let currentSlide = 0;
    let slideInterval;
    
    // Start automatic slideshow
    startSlideshow();
    
    // Previous button click
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            clearInterval(slideInterval);
            currentSlide = (currentSlide === 0) ? slides.length - 1 : currentSlide - 1;
            updateSlider();
            startSlideshow();
        });
    }
    
    // Next button click
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            clearInterval(slideInterval);
            currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
            updateSlider();
            startSlideshow();
        });
    }
    
    // Dot navigation
    if (dots.length) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                clearInterval(slideInterval);
                currentSlide = index;
                updateSlider();
                startSlideshow();
            });
        });
    }
    
    /**
     * Updates the slider to show the current slide
     */
    function updateSlider() {
        // Update slides
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        
        // Update dots
        if (dots.length) {
            dots.forEach((dot, index) => {
                if (index === currentSlide) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
    }
    
    /**
     * Starts the automatic slideshow
     */
    function startSlideshow() {
        // Clear any existing interval
        clearInterval(slideInterval);
        
        // Set new interval
        slideInterval = setInterval(function() {
            currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
            updateSlider();
        }, 5000); // Change slide every 5 seconds
    }
}

/**
 * Initializes the testimonial slider
 */
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    const prevBtn = document.getElementById('testimonial-prev');
    const nextBtn = document.getElementById('testimonial-next');
    
    if (!testimonials.length) return;
    
    let currentTestimonial = 0;
    let testimonialInterval;
    
    // Start automatic slideshow
    startTestimonialSlideshow();
    
    // Previous button click
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            clearInterval(testimonialInterval);
            currentTestimonial = (currentTestimonial === 0) ? testimonials.length - 1 : currentTestimonial - 1;
            updateTestimonialSlider();
            startTestimonialSlideshow();
        });
    }
    
    // Next button click
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            clearInterval(testimonialInterval);
            currentTestimonial = (currentTestimonial === testimonials.length - 1) ? 0 : currentTestimonial + 1;
            updateTestimonialSlider();
            startTestimonialSlideshow();
        });
    }
    
    // Dot navigation
    if (dots.length) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                clearInterval(testimonialInterval);
                currentTestimonial = index;
                updateTestimonialSlider();
                startTestimonialSlideshow();
            });
        });
    }
    
    /**
     * Updates the testimonial slider to show the current testimonial
     */
    function updateTestimonialSlider() {
        // Update testimonials
        testimonials.forEach((testimonial, index) => {
            if (index === currentTestimonial) {
                testimonial.classList.add('active');
            } else {
                testimonial.classList.remove('active');
            }
        });
        
        // Update dots
        if (dots.length) {
            dots.forEach((dot, index) => {
                if (index === currentTestimonial) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
    }
    
    /**
     * Starts the automatic testimonial slideshow
     */
    function startTestimonialSlideshow() {
        // Clear any existing interval
        clearInterval(testimonialInterval);
        
        // Set new interval
        testimonialInterval = setInterval(function() {
            currentTestimonial = (currentTestimonial === testimonials.length - 1) ? 0 : currentTestimonial + 1;
            updateTestimonialSlider();
        }, 7000); // Change testimonial every 7 seconds
    }
}
