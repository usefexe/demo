// ============ AUTHENTICATION ============

class AuthManager {
  constructor() {
    this.user = this.loadUser();
    this.init();
  }
  
  init() {
    this.setupEventListeners();
    this.updateAuthUI();
  }
  
  loadUser() {
    return Storage.get('currentUser');
  }
  
  isLoggedIn() {
    return !!this.user;
  }
  
  login(email, password) {
    // Simple fake login - accept any email/password combination
    if (!email || !password) {
      Toast.error('Email et mot de passe requis');
      return false;
    }
    
    if (!this.isValidEmail(email)) {
      Toast.error('Email invalide');
      return false;
    }
    
    // Create user object
    this.user = {
      id: Math.random().toString(36).substring(7),
      email: email,
      name: email.split('@')[0],
      loginTime: new Date().toISOString()
    };
    
    Storage.set('currentUser', this.user);
    Toast.success('Connecté avec succès!');
    return true;
  }
  
  logout() {
    this.user = null;
    Storage.remove('currentUser');
    Storage.remove('currentBooking');
    Toast.info('Déconnecté');
    window.location.href = 'aceuil.html';
  }
  
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  setupEventListeners() {
    // Login modal
    const loginBtn = document.querySelector('[data-login-btn]');
    if (loginBtn) {
      loginBtn.addEventListener('click', () => {
        this.showLoginModal();
      });
    }
    
    // Logout button
    document.querySelectorAll('[data-logout-btn]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.logout();
      });
    });
    
    // Login form
    const loginForm = document.querySelector('[data-login-form]');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = loginForm.querySelector('[name="email"]');
        const passwordInput = loginForm.querySelector('[name="password"]');
        
        if (this.login(emailInput.value, passwordInput.value)) {
          loginForm.reset();
          this.closeLoginModal();
          this.updateAuthUI();
        }
      });
    }
  }
  
  showLoginModal() {
    const modal = document.querySelector('[data-login-modal]');
    if (!modal) {
      this.createLoginModal();
      return;
    }
    modal.classList.remove('hidden');
  }
  
  closeLoginModal() {
    const modal = document.querySelector('[data-login-modal]');
    if (modal) {
      modal.classList.add('hidden');
    }
  }
  
  createLoginModal() {
    const modal = document.createElement('div');
    modal.setAttribute('data-login-modal', '');
    modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] hidden';
    modal.innerHTML = `
      <div class="bg-white dark:bg-slate-900 rounded-xl shadow-lg max-w-sm w-full mx-4 p-8">
        <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">Connexion</h2>
        <form data-login-form="" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-slate-900 dark:text-white mb-2">Email</label>
            <input type="email" name="email" class="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" placeholder="votre@email.com" required>
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-900 dark:text-white mb-2">Mot de passe</label>
            <input type="password" name="password" class="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" placeholder="••••••••" required>
          </div>
          <button type="submit" class="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
            Se connecter
          </button>
          <p class="text-center text-sm text-slate-500 dark:text-slate-400 mt-4">
            (Mode démo - accepte tout email/mot de passe valide)
          </p>
        </form>
        <button class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300" onclick="document.querySelector('[data-login-modal]').classList.add('hidden')">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>
    `;
    document.body.appendChild(modal);
    
    // Setup form
    const form = modal.querySelector('[data-login-form]');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('[name="email"]');
      const passwordInput = form.querySelector('[name="password"]');
      
      if (this.login(emailInput.value, passwordInput.value)) {
        form.reset();
        modal.classList.add('hidden');
        this.updateAuthUI();
      }
    });
  }
  
  updateAuthUI() {
    const loginBtn = document.querySelector('[data-login-btn]');
    const userProfile = document.querySelector('[data-user-profile]');
    
    if (this.isLoggedIn()) {
      if (loginBtn) loginBtn.classList.add('hidden');
      if (userProfile) {
        userProfile.classList.remove('hidden');
        const nameEl = userProfile.querySelector('[data-user-name]');
        if (nameEl) nameEl.textContent = this.user.email;
      }
    } else {
      if (loginBtn) loginBtn.classList.remove('hidden');
      if (userProfile) userProfile.classList.add('hidden');
    }
  }
}

// Initialize auth on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.auth = new AuthManager();
  });
} else {
  window.auth = new AuthManager();
}
