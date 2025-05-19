/**
 * NovaNest E-commerce - Authentication JavaScript
 * Handles login, signup, and user account functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize authentication functionality
    initAuth();
});

/**
 * Initializes authentication-related functionality
 */
function initAuth() {
    // Toggle password visibility
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    if (togglePasswordButtons) {
        togglePasswordButtons.forEach(button => {
            button.addEventListener('click', function() {
                const passwordInput = this.previousElementSibling;
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                
                // Toggle eye icon
                const icon = this.querySelector('i');
                icon.classList.toggle('fa-eye');
                icon.classList.toggle('fa-eye-slash');
            });
        });
    }
    
    // Password strength meter
    const passwordInput = document.getElementById('password');
    const strengthMeter = document.querySelector('.strength-meter span');
    const strengthText = document.querySelector('.strength-text span');
    
    if (passwordInput && strengthMeter && strengthText) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const strength = checkPasswordStrength(password);
            
            // Update strength meter
            strengthMeter.style.width = strength.percentage + '%';
            strengthText.textContent = strength.label;
            
            // Update classes
            const meterContainer = strengthMeter.parentElement;
            meterContainer.className = 'strength-meter';
            meterContainer.classList.add('strength-' + strength.level);
        });
    }
    
    // Handle login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember')?.checked || false;
            
            // In a real application, this would send the credentials to a server
            // For demo purposes, we'll simulate a successful login
            loginUser(email, password, remember);
        });
    }
    
    // Handle signup form submission
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const firstName = document.getElementById('first-name').value;
            const lastName = document.getElementById('last-name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            // Validate passwords match
            if (password !== confirmPassword) {
                showNotification('Passwords do not match', 'error');
                return;
            }
            
            // In a real application, this would send the registration data to a server
            // For demo purposes, we'll simulate a successful registration
            registerUser(firstName, lastName, email, password);
        });
    }
    
    // Check if user is logged in
    checkAuthStatus();
}

/**
 * Checks the strength of a password
 * @param {string} password - The password to check
 * @returns {Object} Object containing strength level, label, and percentage
 */
function checkPasswordStrength(password) {
    // Default values
    let strength = {
        level: 'weak',
        label: 'Weak',
        percentage: 25
    };
    
    if (!password) {
        return strength;
    }
    
    // Calculate password strength
    let score = 0;
    
    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    
    // Complexity checks
    if (/[A-Z]/.test(password)) score += 1; // Has uppercase
    if (/[a-z]/.test(password)) score += 1; // Has lowercase
    if (/[0-9]/.test(password)) score += 1; // Has number
    if (/[^A-Za-z0-9]/.test(password)) score += 1; // Has special char
    
    // Determine strength based on score
    if (score >= 5) {
        strength = {
            level: 'strong',
            label: 'Strong',
            percentage: 100
        };
    } else if (score >= 3) {
        strength = {
            level: 'medium',
            label: 'Medium',
            percentage: 50
        };
    }
    
    return strength;
}

/**
 * Simulates a user login
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @param {boolean} remember - Whether to remember the user
 */
function loginUser(email, password, remember) {
    // In a real application, this would validate credentials with a server
    
    // For demo purposes, simulate a successful login
    const user = {
        email: email,
        firstName: 'Demo',
        lastName: 'User',
        isLoggedIn: true
    };
    
    // Store user data in localStorage
    localStorage.setItem('user', JSON.stringify(user));
    
    // Show success notification
    showNotification('Login successful! Redirecting...', 'success');
    
    // Redirect to home page after a short delay
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

/**
 * Simulates a user registration
 * @param {string} firstName - User's first name
 * @param {string} lastName - User's last name
 * @param {string} email - User's email
 * @param {string} password - User's password
 */
function registerUser(firstName, lastName, email, password) {
    // In a real application, this would send registration data to a server
    
    // For demo purposes, simulate a successful registration
    const user = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        isLoggedIn: true
    };
    
    // Store user data in localStorage
    localStorage.setItem('user', JSON.stringify(user));
    
    // Show success notification
    showNotification('Account created successfully! Redirecting...', 'success');
    
    // Redirect to home page after a short delay
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

/**
 * Logs out the current user
 */
function logoutUser() {
    // Remove user data from localStorage
    localStorage.removeItem('user');
    
    // Show notification
    showNotification('You have been logged out', 'info');
    
    // Redirect to home page
    window.location.href = 'index.html';
}

/**
 * Checks if a user is logged in and updates UI accordingly
 */
function checkAuthStatus() {
    const userData = localStorage.getItem('user');
    
    if (userData) {
        const user = JSON.parse(userData);
        
        if (user.isLoggedIn) {
            // User is logged in, update account icon
            const accountIcon = document.getElementById('account-icon');
            if (accountIcon) {
                // Replace icon with user initials or avatar
                const initials = user.firstName.charAt(0) + user.lastName.charAt(0);
                accountIcon.innerHTML = `<span class="user-avatar">${initials}</span>`;
                
                // Update account icon click behavior
                accountIcon.removeAttribute('href');
                accountIcon.addEventListener('click', function(e) {
                    e.preventDefault();
                    toggleAccountDropdown();
                });
                
                // Create account dropdown if it doesn't exist
                if (!document.querySelector('.account-dropdown')) {
                    createAccountDropdown(user);
                }
            }
        }
    }
}

/**
 * Creates the account dropdown menu
 * @param {Object} user - The logged in user
 */
function createAccountDropdown(user) {
    const accountIcon = document.getElementById('account-icon');
    if (!accountIcon) return;
    
    // Create dropdown element
    const dropdown = document.createElement('div');
    dropdown.className = 'account-dropdown';
    
    // Add dropdown content
    dropdown.innerHTML = `
        <div class="dropdown-header">
            <p>Welcome, ${user.firstName}!</p>
            <span>${user.email}</span>
        </div>
        <ul>
            <li><a href="#"><i class="fas fa-user-circle"></i> My Account</a></li>
            <li><a href="#"><i class="fas fa-shopping-bag"></i> My Orders</a></li>
            <li><a href="#"><i class="fas fa-heart"></i> Wishlist</a></li>
            <li><a href="#" id="logout-btn"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
        </ul>
    `;
    
    // Append dropdown to header
    accountIcon.parentNode.appendChild(dropdown);
    
    // Add event listener to logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            logoutUser();
        });
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!accountIcon.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
}

/**
 * Toggles the account dropdown visibility
 */
function toggleAccountDropdown() {
    const dropdown = document.querySelector('.account-dropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
    }
}

// Add CSS for account dropdown and user avatar
const authStyles = document.createElement('style');
authStyles.textContent = `
    .user-avatar {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        background-color: var(--primary-color);
        color: white;
        border-radius: 50%;
        font-size: 12px;
        font-weight: bold;
    }
    
    .account-dropdown {
        position: absolute;
        top: 100%;
        right: 0;
        width: 250px;
        background-color: var(--bg-color);
        border-radius: var(--border-radius-md);
        box-shadow: var(--box-shadow);
        padding: var(--spacing-md);
        z-index: 1000;
        display: none;
        margin-top: var(--spacing-md);
    }
    
    .account-dropdown.active {
        display: block;
    }
    
    .dropdown-header {
        border-bottom: 1px solid var(--border-color);
        padding-bottom: var(--spacing-sm);
        margin-bottom: var(--spacing-sm);
    }
    
    .dropdown-header p {
        font-weight: bold;
        margin-bottom: 0;
    }
    
    .dropdown-header span {
        font-size: 0.9rem;
        color: var(--text-light);
    }
    
    .account-dropdown ul {
        list-style: none;
    }
    
    .account-dropdown ul li {
        margin-bottom: var(--spacing-xs);
    }
    
    .account-dropdown ul li a {
        display: flex;
        align-items: center;
        padding: var(--spacing-xs) 0;
        color: var(--text-color);
    }
    
    .account-dropdown ul li a:hover {
        color: var(--primary-color);
    }
    
    .account-dropdown ul li a i {
        margin-right: var(--spacing-sm);
        width: 20px;
        text-align: center;
    }
`;

document.head.appendChild(authStyles);
