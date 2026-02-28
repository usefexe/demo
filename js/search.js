/**
 * YaanCarz - Search Results Page
 */

import { 
  getQueryParam, formatDate, formatDateShort, formatCurrency, 
  showToast, delay, localStorage_get, localStorage_set, createEmptyState 
} from './app.js';
import { CARS, searchCars, getAgencyById, MOROCCAN_CITIES } from './data.js';

// ==================== Initialize Search Results ====================
export async function initSearchResults() {
  const container = document.querySelector('[data-search-results]');
  if (!container) return;

  // Show loading state
  showLoadingSpinner(container);

  // Simulate network delay
  await delay(400);

  // Get query params
  const city = getQueryParam('city') || 'Casablanca';
  const fromDate = getQueryParam('from') || '2024-05-12';
  const toDate = getQueryParam('to') || '2024-05-19';

  // Calculate days
  const days = Math.ceil((new Date(toDate) - new Date(fromDate)) / (1000 * 60 * 60 * 24));

  // Update header with search summary
  updateSearchHeader(city, fromDate, toDate, days);

  // Get filter state from localStorage or use defaults
  const filters = localStorage_get('search_filters', {});

  // Search cars
  const cars = searchCars(filters);

  // Render results
  renderCars(cars, fromDate, toDate, days);

  // Initialize filters
  initializeFilters(fromDate, toDate, days);

  // Setup event listeners
  setupSearchEventListeners(fromDate, toDate, days);
}

// ==================== Update Search Header ====================
function updateSearchHeader(city, fromDate, toDate, days) {
  const headerTitle = document.querySelector('[data-search-title]');
  const headerDesc = document.querySelector('[data-search-desc]');
  
  if (headerTitle) {
    headerTitle.textContent = `${city} : ${CARS.length} véhicules trouvés`;
  }
  
  if (headerDesc) {
    const from = new Date(fromDate);
    const to = new Date(toDate);
    headerDesc.textContent = `Du ${from.getDate()} au ${to.getDate()} (${days} jours)`;
  }

  // Update breadcrumb
  const breadcrumbCity = document.querySelector('[data-breadcrumb-city]');
  if (breadcrumbCity) {
    breadcrumbCity.textContent = city;
  }
}

// ==================== Render Car Results ====================
function renderCars(cars, fromDate, toDate, days) {
  const container = document.querySelector('[data-cars-grid]');
  if (!container) return;

  container.innerHTML = '';

  if (cars.length === 0) {
    container.appendChild(createEmptyState('directions_car', 'Aucun véhicule trouvé', 'Essayez d\'ajuster vos filtres de recherche'));
    return;
  }

  cars.forEach(car => {
    const totalPrice = car.pricePerDay * days;
    const agency = getAgencyById(car.agencyId);

    const card = document.createElement('div');
    card.className = 'group flex flex-col overflow-hidden rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-all duration-300';
    card.innerHTML = `
      <div class="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img alt="${car.name}" class="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" src="${car.image}" />
        <div class="absolute top-3 right-3 rounded-full bg-white/90 dark:bg-slate-800/90 p-1.5 text-slate-400 hover:text-primary shadow-sm cursor-pointer add-compare-btn" data-car-id="${car.id}">
          <span class="material-symbols-outlined text-lg leading-none">favorite</span>
        </div>
        <div class="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
          <span class="material-symbols-outlined text-[12px] fill-1 text-yellow-400">star</span>
          ${car.rating} (${car.reviews} avis)
        </div>
      </div>
      <div class="flex flex-1 flex-col p-5">
        <div class="flex items-start justify-between">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-[10px] font-bold uppercase tracking-widest text-primary">${car.category}</span>
              <span class="h-1 w-1 rounded-full bg-slate-300"></span>
              <span class="text-[10px] font-bold text-slate-400">${car.fuel}</span>
            </div>
            <h3 class="mt-1 text-lg font-bold">${car.name}</h3>
          </div>
          <div class="flex items-center gap-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 px-2 py-1">
            <img alt="Agency Logo" class="h-4 w-4 rounded-sm" src="${agency.logo}" />
            <span class="text-[10px] font-bold text-slate-600 dark:text-slate-400">${agency.name}</span>
          </div>
        </div>
        <!-- Specs Icons -->
        <div class="mt-4 flex items-center gap-4 text-slate-500">
          <div class="flex items-center gap-1.5">
            <span class="material-symbols-outlined text-lg">group</span>
            <span class="text-xs">${car.seats}</span>
          </div>
          <div class="flex items-center gap-1.5">
            <span class="material-symbols-outlined text-lg">settings</span>
            <span class="text-xs">${car.transmission === 'Manuelle' ? 'Manu.' : 'Auto.'}</span>
          </div>
          <div class="flex items-center gap-1.5">
            <span class="material-symbols-outlined text-lg">luggage</span>
            <span class="text-xs">${car.luggage}</span>
          </div>
          <div class="flex items-center gap-1.5">
            <span class="material-symbols-outlined text-lg">ac_unit</span>
            <span class="text-xs">${car.ac ? 'Oui' : 'Non'}</span>
          </div>
        </div>
        <div class="mt-auto pt-6">
          <div class="flex items-end justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
            <div>
              <p class="text-[10px] font-medium text-slate-400">À partir de</p>
              <p class="text-xl font-bold text-primary">${formatCurrency(car.pricePerDay, 'MAD')}<span class="text-xs font-normal text-slate-400">/jour</span></p>
              <p class="text-[11px] font-semibold text-slate-500">Total : ${formatCurrency(totalPrice, 'MAD')}</p>
            </div>
            <div class="flex flex-col gap-2">
              <button class="rounded-lg bg-primary px-4 py-2 text-xs font-bold text-white hover:bg-primary/90 transition-colors view-details-btn" data-car-id="${car.id}" data-from="${fromDate}" data-to="${toDate}">
                Voir détails
              </button>
              <button class="flex items-center justify-center gap-1 text-[10px] font-bold text-slate-400 hover:text-primary transition-colors add-compare-text-btn" data-car-id="${car.id}">
                <span class="material-symbols-outlined text-xs">compare_arrows</span>
                Comparer
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  // Attach event listeners
  attachCardEventListeners();
}

// ==================== Attach Card Event Listeners ====================
function attachCardEventListeners() {
  // View Details buttons
  document.querySelectorAll('.view-details-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const carId = e.currentTarget.getAttribute('data-car-id');
      const from = e.currentTarget.getAttribute('data-from');
      const to = e.currentTarget.getAttribute('data-to');
      window.location.href = `cardetail.html?id=${carId}&from=${from}&to=${to}`;
    });
  });

  // Compare buttons
  document.querySelectorAll('.add-compare-btn, .add-compare-text-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const carId = parseInt(e.currentTarget.getAttribute('data-car-id'));
      const compareList = localStorage_get('compare_list', []);
      
      if (compareList.includes(carId)) {
        compareList.splice(compareList.indexOf(carId), 1);
        showToast('Removed from comparison', 'info');
      } else {
        if (compareList.length >= 3) {
          showToast('Maximum 3 cars to compare', 'warning');
          return;
        }
        compareList.push(carId);
        showToast('Added to comparison', 'success');
      }
      
      localStorage_set('compare_list', compareList);
      updateCompareButtons();
    });
  });
}

function updateCompareButtons() {
  const compareList = localStorage_get('compare_list', []);
  
  document.querySelectorAll('[data-car-id]').forEach(btn => {
    const carId = parseInt(btn.getAttribute('data-car-id'));
    if (compareList.includes(carId)) {
      btn.classList.add('text-primary');
      btn.querySelector('span').classList.add('fill-current');
    } else {
      btn.classList.remove('text-primary');
      btn.querySelector('span').classList.remove('fill-current');
    }
  });
}

// ==================== Initialize Filters ====================
function initializeFilters(fromDate, toDate, days) {
  const filters = localStorage_get('search_filters', {});

  // Update filter display
  updateFilterDisplay(filters);
}

function updateFilterDisplay(filters) {
  // Update price range
  if (filters.priceMax) {
    const priceDisplay = document.querySelector('[data-price-max]');
    if (priceDisplay) {
      priceDisplay.textContent = `${filters.priceMax} MAD`;
    }
  }

  // Update checkboxes
  if (filters.fuel) {
    document.querySelectorAll('input[name="fuel"]').forEach(checkbox => {
      checkbox.checked = checkbox.value === filters.fuel;
    });
  }

  if (filters.transmission) {
    document.querySelectorAll('input[name="transmission"]').forEach(checkbox => {
      checkbox.checked = checkbox.value === filters.transmission;
    });
  }
}

// ==================== Setup Filter Event Listeners ====================
function setupSearchEventListeners(fromDate, toDate, days) {
  // Price range input
  document.querySelectorAll('[data-price-range]').forEach(input => {
    input.addEventListener('change', () => {
      const maxPrice = parseInt(input.value);
      const filters = localStorage_get('search_filters', {});
      filters.priceMax = maxPrice;
      localStorage_set('search_filters', filters);
      
      const cars = searchCars(filters);
      renderCars(cars, fromDate, toDate, days);
    });
  });

  // Filter checkboxes
  document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const filters = localStorage_get('search_filters', {});

      if (checkbox.name === 'transmission') {
        filters.transmission = checkbox.checked ? checkbox.value : null;
      }
      if (checkbox.name === 'fuel') {
        filters.fuel = checkbox.checked ? checkbox.value : null;
      }

      localStorage_set('search_filters', filters);
      const cars = searchCars(filters);
      renderCars(cars, fromDate, toDate, days);
    });
  });

  // Reset filters button
  const resetBtn = document.querySelector('[data-reset-filters]');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      localStorage_set('search_filters', {});
      location.reload();
    });
  }

  // Sort dropdown
  const sortBtn = document.querySelector('[data-sort-btn]');
  if (sortBtn) {
    sortBtn.addEventListener('click', () => {
      console.log('Sort clicked');
    });
  }
}

// ==================== Loading Spinner ====================
function showLoadingSpinner(container) {
  container.innerHTML = `
    <div class="col-span-full space-y-4">
      <div class="bg-slate-200 dark:bg-slate-700 h-48 rounded-xl animate-pulse"></div>
      <div class="bg-slate-200 dark:bg-slate-700 h-48 rounded-xl animate-pulse"></div>
    </div>
  `;
}

// ==================== Export ====================
export { renderCars, updateCompareButtons };

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSearchResults);
} else {
  initSearchResults();
}
