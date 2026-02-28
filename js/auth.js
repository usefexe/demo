/**
 * YaanCarz - Simple Authentication System
 * Note: This is a demo implementation. Production would use proper backend auth.
 */

import { 
  localStorage_get, localStorage_set, validateEmail, showToast 
} from './app.js';

// ==================== Mock Users Database ====================
const MOCK_USERS = [
  {
    id: 1,
    email: 'test@example.com',
    password: 'Test123!', // Demo only - never store plain passwords
    firstName: 'Test',
    lastName: 'User',
    phone: '+212612345678',
    createdAt: new Date().toISOString()
  }
];

// ==================== Get Current Session ====================
export function getCurrentUser() {
  return localStorage_get('auth_session', null);
}

export function isAuthenticated() {
  return getCurrentUser() !== null;
}

// ==================== Login ====================
export function login(email, password) {
  if (!validateEmail(email)) {
    showToast('Email invalide', 'error');
    return false;
  }

  if (!password || password.length < 6) {
    showToast('Mot de passe invalide', 'error');
    return false;
  }

  // Find user in mock database
  const user = MOCK_USERS.find(u => u.email === email && u.password === password);

  if (!user) {
    showToast('Email ou mot de passe incorrect', 'error');
    return false;
  }

  // Create session
  const session = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    loginTime: new Date().toISOString()
  };

  localStorage_set('auth_session', session);
  showToast(`Bienvenue ${user.firstName}!`, 'success');
  
  return true;
}

// ==================== Register/Signup ====================
export function register(userData) {
  const { email, password, confirmPassword, firstName, lastName } = userData;

  // Validation
  if (!validateEmail(email)) {
    showToast('Email invalide', 'error');
    return false;
  }

  if (!firstName || !lastName) {
    showToast('Veuillez entrer vos nom et prénom', 'error');
    return false;
  }

  if (!password || password.length < 6) {
    showToast('Le mot de passe doit contenir au moins 6 caractères', 'error');
    return false;
  }

  if (password !== confirmPassword) {
    showToast('Les mots de passe ne correspondent pas', 'error');
    return false;
  }

  // Check if user already exists
  if (MOCK_USERS.find(u => u.email === email)) {
    showToast('Cet email est déjà utilisé', 'error');
    return false;
  }

  // Create new user (in real app, this would be sent to backend)
  const newUser = {
    id: MOCK_USERS.length + 1,
    email,
    password, // Never do this in production!
    firstName,
    lastName,
    phone: '',
    createdAt: new Date().toISOString()
  };

  MOCK_USERS.push(newUser);

  // Auto-login after registration
  return login(email, password);
}

// ==================== Logout ====================
export function logout() {
  localStorage_set('auth_session', null);
  showToast('Déconnexion réussie', 'success');
  window.location.href = 'aceuil.html';
}

// ==================== Update Profile ====================
export function updateProfile(updates) {
  const user = getCurrentUser();

  if (!user) {
    showToast('Vous devez être connecté', 'error');
    return false;
  }

  const updatedSession = {
    ...user,
    ...updates,
    loginTime: user.loginTime // Keep original login time
  };

  localStorage_set('auth_session', updatedSession);
  showToast('Profil mis à jour', 'success');
  
  return true;
}

// ==================== Initialize Auth UI ====================
export function initAuthUI() {
  const user = getCurrentUser();
  const loginBtn = document.querySelector('[data-login-btn]');
  const userMenu = document.querySelector('[data-user-menu]');

  if (user) {
    // User is logged in
    if (loginBtn) loginBtn.style.display = 'none';
    if (userMenu) {
      userMenu.style.display = 'flex';
      const userName = userMenu.querySelector('[data-user-name]');
      if (userName) userName.textContent = user.firstName;
    }
  } else {
    // User is not logged in
    if (loginBtn) loginBtn.style.display = 'block';
    if (userMenu) userMenu.style.display = 'none';
  }

  // Setup logout button
  const logoutBtn = document.querySelector('[data-logout-btn]');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
  }
}

// ==================== Login Form Handler ====================
export function setupLoginForm() {
  const form = document.querySelector('[data-login-form]');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = form.querySelector('[name="email"]')?.value.trim();
    const password = form.querySelector('[name="password"]')?.value;

    if (login(email, password)) {
      // Redirect to previous page or home
      const nextUrl = new URLSearchParams(window.location.search).get('next') || 'aceuil.html';
      window.location.href = nextUrl;
    }
  });
}

// ==================== Register Form Handler ====================
export function setupRegisterForm() {
  const form = document.querySelector('[data-register-form]');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const userData = {
      email: form.querySelector('[name="email"]')?.value.trim(),
      password: form.querySelector('[name="password"]')?.value,
      confirmPassword: form.querySelector('[name="confirmPassword"]')?.value,
      firstName: form.querySelector('[name="firstName"]')?.value.trim(),
      lastName: form.querySelector('[name="lastName"]')?.value.trim()
    };

    if (register(userData)) {
      // Redirect to home
      setTimeout(() => {
        window.location.href = 'aceuil.html';
      }, 1500);
    }
  });
}

// ==================== Export All ====================
export { MOCK_USERS };

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initAuthUI();
    setupLoginForm();
    setupRegisterForm();
  });
} else {
  initAuthUI();
  setupLoginForm();
  setupRegisterForm();
}
