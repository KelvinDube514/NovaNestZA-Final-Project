/**
 * NovaNest E-commerce - Contact Page JavaScript
 * Handles contact form and FAQ functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize contact form validation
    initContactForm();
    
    // Initialize FAQ accordion
    initFaqAccordion();
    
    // Initialize map (placeholder for a real map integration)
    initMap();
});

/**
 * Initializes contact form validation and submission
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value.trim();
        const newsletter = document.getElementById('newsletter').checked;
        
        // Validate form
        if (!validateForm(name, email, subject, message)) {
            return;
        }
        
        // In a real application, this would send the form data to a server
        // For demo purposes, we'll just show a success message
        
        // Create form data object
        const formData = {
            name,
            email,
            phone,
            subject,
            message,
            newsletter
        };
        
        // Log form data to console (for demo purposes)
        console.log('Form submission:', formData);
        
        // Show success message
        showNotification('Your message has been sent! We\'ll get back to you soon.', 'success');
        
        // Reset form
        contactForm.reset();
    });
}

/**
 * Validates the contact form
 * @param {string} name - The name value
 * @param {string} email - The email value
 * @param {string} subject - The subject value
 * @param {string} message - The message value
 * @returns {boolean} Whether the form is valid
 */
function validateForm(name, email, subject, message) {
    let isValid = true;
    
    // Reset previous error messages
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(el => el.remove());
    
    // Validate name
    if (!name) {
        showError('name', 'Please enter your name');
        isValid = false;
    }
    
    // Validate email
    if (!email) {
        showError('email', 'Please enter your email');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate subject
    if (!subject) {
        showError('subject', 'Please select a subject');
        isValid = false;
    }
    
    // Validate message
    if (!message) {
        showError('message', 'Please enter your message');
        isValid = false;
    } else if (message.length < 10) {
        showError('message', 'Your message is too short');
        isValid = false;
    }
    
    return isValid;
}

/**
 * Shows an error message for a form field
 * @param {string} fieldId - The ID of the field
 * @param {string} message - The error message
 */
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    
    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    // Add error class to field
    field.classList.add('error');
    
    // Add error message after field
    field.parentNode.appendChild(errorElement);
    
    // Remove error class when field is focused
    field.addEventListener('focus', function() {
        this.classList.remove('error');
        const errorMsg = this.parentNode.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.remove();
        }
    }, { once: true });
}

/**
 * Validates an email address
 * @param {string} email - The email to validate
 * @returns {boolean} Whether the email is valid
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Initializes the FAQ accordion
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
        
        if (!question || !answer || !toggle) return;
        
        question.addEventListener('click', function() {
            // Toggle active class
            item.classList.toggle('active');
            
            // Toggle icon
            const icon = toggle.querySelector('i');
            if (icon) {
                if (item.classList.contains('active')) {
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                    
                    // Show answer with animation
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                } else {
                    icon.classList.remove('fa-minus');
                    icon.classList.add('fa-plus');
                    
                    // Hide answer with animation
                    answer.style.maxHeight = '0px';
                }
            }
        });
        
        // Initialize all answers as hidden
        answer.style.maxHeight = '0px';
        answer.style.overflow = 'hidden';
        answer.style.transition = 'max-height 0.3s ease';
    });
}

/**
 * Initializes the map (placeholder for a real map integration)
 */
function initMap() {
    // In a real application, this would initialize a map using Google Maps, Mapbox, etc.
    // For demo purposes, we'll just log a message
    console.log('Map would be initialized here in a real application');
}

// Add CSS for form validation and FAQ
const contactStyles = document.createElement('style');
contactStyles.textContent = `
    .error-message {
        color: var(--error-color);
        font-size: 0.9rem;
        margin-top: 5px;
    }
    
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: var(--error-color);
    }
    
    .faq-item {
        margin-bottom: 15px;
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius-md);
        overflow: hidden;
    }
    
    .faq-question {
        padding: 15px 20px;
        background-color: var(--bg-light);
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .faq-question h3 {
        margin: 0;
        font-size: 1.1rem;
    }
    
    .faq-toggle {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .faq-answer {
        padding: 0 20px;
        background-color: white;
    }
    
    .faq-answer p {
        padding: 15px 0;
        margin: 0;
    }
`;

document.head.appendChild(contactStyles);
