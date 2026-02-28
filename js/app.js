// ============ APP UTILITIES ============

// Query Params Helper
const QueryParams = {
  get(key) {
    const params = new URLSearchParams(window.location.search);
    return params.get(key);
  },
  getAll() {
    const params = new URLSearchParams(window.location.search);
    const obj = {};
    for (let [key, value] of params) {
      obj[key] = value;
    }
    return obj;
  },
  set(key, value) {
    const params = new URLSearchParams(window.location.search);
    params.set(key, value);
    return params.toString();
  },
  build(obj) {
    const params = new URLSearchParams(obj);
    return params.toString();
  }
};

// LocalStorage Helper
const Storage = {
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Storage error:', e);
    }
  },
  get(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error('Storage error:', e);
      return null;
    }
  },
  remove(key) {
    localStorage.removeItem(key);
  },
  clear() {
    localStorage.clear();
  }
};

// Toast Notifications
class Toast {
  static show(message, type = 'info', duration = 3000) {
    const container = document.getElementById('toast-container') || this.createContainer();
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type} animate-in slide-in-from-top`;
    
    const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
    const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';
    
    toast.innerHTML = `
      <div class="fixed top-4 right-4 max-w-sm bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 p-4 flex items-center gap-3 z-[9999] animate-fade-in">
        <div class="flex-shrink-0">
          <div class="${bgColor} text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
            ${icon}
          </div>
        </div>
        <div class="flex-1">
          <p class="text-sm font-medium text-slate-900 dark:text-white">${message}</p>
        </div>
      </div>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, duration);
  }
  
  static createContainer() {
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'fixed top-0 right-0 z-[9999] p-4 pointer-events-none';
    document.body.appendChild(container);
    return container;
  }
  
  static success(message, duration) {
    this.show(message, 'success', duration);
  }
  
  static error(message, duration) {
    this.show(message, 'error', duration);
  }
  
  static info(message, duration) {
    this.show(message, 'info', duration);
  }
}

// Loading Skeleton
class Loading {
  static show(targetElement) {
    const skeleton = document.createElement('div');
    skeleton.className = 'animate-pulse';
    skeleton.innerHTML = `
      <div class="space-y-4">
        <div class="h-12 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
        <div class="h-8 bg-slate-200 dark:bg-slate-700 rounded-lg w-3/4"></div>
        <div class="space-y-2">
          <div class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
          <div class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
        </div>
      </div>
    `;
    targetElement.innerHTML = '';
    targetElement.appendChild(skeleton);
  }
  
  static hide(targetElement) {
    targetElement.innerHTML = '';
  }
}

// Utility: Format Currency
function formatCurrency(amount) {
  return new Intl.NumberFormat('fr-MA', {
    style: 'currency',
    currency: 'MAD',
    minimumFractionDigits: 0
  }).format(amount);
}

// Utility: Format Date
function formatDate(dateStr) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateStr).toLocaleDateString('fr-FR', options);
}

// Utility: Days Between Dates
function daysBetween(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

// Add global CSS for animations
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fade-in 0.3s ease-out;
  }
  .toast-success {
    color: #10a24b;
  }
  .toast-error {
    color: #ef4444;
  }
  .toast-info {
    color: #3b82f6;
  }
`;
document.head.appendChild(style);
