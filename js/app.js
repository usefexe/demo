/**
 * YaanCarz - App Utilities & Helper Functions
 */

// ==================== URL Query Parameters ====================
export function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

export function setQueryParam(param, value) {
  const params = new URLSearchParams(window.location.search);
  params.set(param, value);
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.pushState({ path: newUrl }, '', newUrl);
}

export function buildQueryString(obj) {
  const params = new URLSearchParams();
  Object.entries(obj).forEach(([key, value]) => {
    if (value) params.append(key, value);
  });
  return params.toString();
}

// ==================== LocalStorage Utilities ====================
export function localStorage_get(key, defaultValue = null) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
  } catch (e) {
    console.error(`Error reading localStorage key "${key}":`, e);
    return defaultValue;
  }
}

export function localStorage_set(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.error(`Error writing to localStorage key "${key}":`, e);
    return false;
  }
}

export function localStorage_remove(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (e) {
    console.error(`Error removing localStorage key "${key}":`, e);
    return false;
  }
}

export function localStorage_clear() {
  try {
    localStorage.clear();
    return true;
  } catch (e) {
    console.error('Error clearing localStorage:', e);
    return false;
  }
}

// ==================== Toast Notifications ====================
export function showToast(message, type = 'info', duration = 3000) {
  // Remove existing toasts
  const existingToasts = document.querySelectorAll('[data-toast]');
  existingToasts.forEach(t => t.remove());

  const toast = document.createElement('div');
  toast.setAttribute('data-toast', 'true');
  
  const bgColor = {
    'success': 'bg-green-100 dark:bg-green-900/30',
    'error': 'bg-red-100 dark:bg-red-900/30',
    'warning': 'bg-amber-100 dark:bg-amber-900/30',
    'info': 'bg-blue-100 dark:bg-blue-900/30'
  }[type] || 'bg-blue-100 dark:bg-blue-900/30';

  const textColor = {
    'success': 'text-green-700 dark:text-green-400',
    'error': 'text-red-700 dark:text-red-400',
    'warning': 'text-amber-700 dark:text-amber-400',
    'info': 'text-blue-700 dark:text-blue-400'
  }[type] || 'text-blue-700 dark:text-blue-400';

  const icon = {
    'success': 'check_circle',
    'error': 'error',
    'warning': 'warning',
    'info': 'info'
  }[type] || 'info';

  toast.className = `fixed bottom-6 right-6 ${bgColor} ${textColor} px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 z-50 animate-slide-in`;
  toast.innerHTML = `
    <span class="material-symbols-outlined text-lg">${icon}</span>
    <span class="font-medium">${message}</span>
  `;

  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), duration);
}

// ==================== Loading States ====================
export function showLoadingState(element) {
  if (!element) return;
  element.classList.add('opacity-50', 'pointer-events-none');
  element.style.minHeight = element.offsetHeight + 'px';
}

export function hideLoadingState(element) {
  if (!element) return;
  element.classList.remove('opacity-50', 'pointer-events-none');
}

// ==================== Skeleton Loader ====================
export function createSkeletonLoader(count = 1) {
  const skeleton = document.createElement('div');
  skeleton.className = 'space-y-4';
  
  for (let i = 0; i < count; i++) {
    const item = document.createElement('div');
    item.className = 'bg-slate-200 dark:bg-slate-700 h-48 rounded-xl animate-pulse';
    skeleton.appendChild(item);
  }
  
  return skeleton;
}

// ==================== Empty State ====================
export function createEmptyState(icon = 'search_off', title = 'Aucun résultat', description = 'Essayez avec d\'autres paramètres de recherche') {
  const empty = document.createElement('div');
  empty.className = 'flex flex-col items-center justify-center py-16 px-6 text-center';
  empty.innerHTML = `
    <span class="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-600 mb-4">${icon}</span>
    <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">${title}</h3>
    <p class="text-slate-500 dark:text-slate-400">${description}</p>
  `;
  return empty;
}

// ==================== Date Formatting ====================
export function formatDate(date, locale = 'fr-FR') {
  if (typeof date === 'string') date = new Date(date);
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

export function formatDateShort(date, locale = 'fr-FR') {
  if (typeof date === 'string') date = new Date(date);
  return new Intl.DateTimeFormat(locale, {
    month: 'short',
    day: 'numeric'
  }).format(date);
}

export function calculateDaysDifference(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
}

// ==================== Currency Formatting ====================
export function formatCurrency(amount, currency = 'MAD') {
  return new Intl.NumberFormat('fr-MA', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0
  }).format(amount);
}

// ==================== Validation ====================
export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePhone(phone) {
  return /^[\d\s\-\+\(\)]{7,}$/.test(phone);
}

export function validateRequired(value) {
  return value && value.trim().length > 0;
}

// ==================== Random ID Generation ====================
export function generateId(prefix = 'ID') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// ==================== Delay/Sleep ====================
export async function delay(ms = 400) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ==================== CSS Animations ====================
export function injectAnimationStyles() {
  if (document.getElementById('yaan-animations')) return;
  
  const style = document.createElement('style');
  style.id = 'yaan-animations';
  style.textContent = `
    @keyframes slide-in {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    .animate-slide-in {
      animation: slide-in 0.3s ease-out;
    }
  `;
  document.head.appendChild(style);
}

// Initialize animations on load
injectAnimationStyles();
