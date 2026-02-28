// ============ SEARCH RESULTS PAGE ============

class SearchResults {
  constructor() {
    this.cars = [];
    this.filteredCars = [];
    this.currentSort = 'relevance';
    this.filters = {};
    this.init();
  }
  
  init() {
    this.loadSearchParams();
    this.renderSearchSummary();
    this.loadResults();
    this.setupEventListeners();
  }
  
  loadSearchParams() {
    const city = QueryParams.get('city') || 'Casablanca';
    const from = QueryParams.get('from') || '';
    const to = QueryParams.get('to') || '';
    
    this.searchParams = { city, from, to };
  }
  
  loadResults() {
    // Show loading
    const container = document.getElementById('cars-container');
    if (container) {
      Loading.show(container);
    }
    
    // Simulate network delay
    setTimeout(() => {
      this.cars = [...CARS];
      this.applyFilters();
      this.renderResults();
    }, 400);
  }
  
  applyFilters() {
    this.filteredCars = getCarsByFilters(this.filters);
    this.filteredCars = sortCars(this.filteredCars, this.currentSort);
  }
  
  renderSearchSummary() {
    const { city, from, to } = this.searchParams;
    const daysCount = from && to ? daysBetween(from, to) : 0;
    const fromFormatted = from ? formatDate(from) : '';
    const toFormatted = to ? formatDate(to) : '';
    
    // Update header title
    const titleEl = document.querySelector('h1.text-2xl');
    if (titleEl) {
      titleEl.textContent = `${city} : ${this.cars.length} véhicules trouvés`;
    }
    
    // Update subtitle
    const subtitleEl = document.querySelector('h1.text-2xl + p');
    if (subtitleEl) {
      subtitleEl.textContent = from && to 
        ? `Du ${fromFormatted} au ${toFormatted} (${daysCount} jours)`
        : 'Sélectionnez vos dates';
    }
    
    // Update filter header badge
    const filterBadge = document.querySelector('[data-filter-count]');
    if (filterBadge) {
      filterBadge.textContent = this.cars.length + ' véhicules disponibles';
    }
  }
  
  renderResults() {
    const container = document.getElementById('cars-container');
    if (!container) return;
    
    if (this.filteredCars.length === 0) {
      container.innerHTML = `
        <div class="col-span-full flex flex-col items-center justify-center py-12">
          <span class="material-symbols-outlined text-6xl text-slate-300 mb-4">directions_car</span>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Aucune voiture trouvée</h3>
          <p class="text-slate-500 dark:text-slate-400">Essayez de modifier vos filtres ou vos dates de recherche.</p>
        </div>
      `;
      return;
    }
    
    container.innerHTML = '';
    this.filteredCars.forEach(car => {
      const card = this.createCarCard(car);
      container.appendChild(card);
    });
  }
  
  createCarCard(car) {
    const { city, from, to } = this.searchParams;
    const daysCount = from && to ? daysBetween(from, to) : 1;
    const total = car.pricePerDay * daysCount;
    const promoPrice = car.promo ? Math.floor(car.pricePerDay * (1 - car.promo / 100)) : car.pricePerDay;
    const promoTotal = promoPrice * daysCount;
    
    const card = document.createElement('div');
    card.className = 'group flex flex-col overflow-hidden rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-all duration-300';
    card.innerHTML = `
      <div class="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img alt="${car.name}" class="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" src="${car.image}">
        ${car.promo ? `<div class="absolute top-3 left-3 rounded-md bg-primary px-2 py-1 text-[10px] font-bold text-white shadow-sm">PROMO -${car.promo}%</div>` : ''}
        <div class="absolute top-3 right-3 rounded-full bg-white/90 dark:bg-slate-800/90 p-1.5 text-slate-400 hover:text-primary shadow-sm cursor-pointer add-favorite" data-car-id="${car.id}">
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
            <img alt="Agency Logo" class="h-4 w-4 rounded-sm" src="${getAgencyById(car.agencyId)?.logo || ''}">
            <span class="text-[10px] font-bold text-slate-600 dark:text-slate-400">${car.agency}</span>
          </div>
        </div>
        <div class="mt-4 flex items-center gap-4 text-slate-500">
          <div class="flex items-center gap-1.5">
            <span class="material-symbols-outlined text-lg">group</span>
            <span class="text-xs">${car.seats}</span>
          </div>
          <div class="flex items-center gap-1.5">
            <span class="material-symbols-outlined text-lg">settings</span>
            <span class="text-xs">${car.transmission === 'Automatique' ? 'Auto.' : 'Manu.'}</span>
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
              ${car.promo ? `<p class="text-[10px] font-medium text-slate-400 line-through">${formatCurrency(car.pricePerDay)}</p>` : ''}
              <p class="text-xl font-bold text-primary">${formatCurrency(promoPrice)}<span class="text-xs font-normal text-slate-400">/jour</span></p>
              <p class="text-[11px] font-semibold text-slate-500">Total : ${formatCurrency(promoTotal)}</p>
            </div>
            <div class="flex flex-col gap-2">
              <button class="rounded-lg bg-primary px-4 py-2 text-xs font-bold text-white hover:bg-primary/90 transition-colors view-details" data-car-id="${car.id}" data-from="${from}" data-to="${to}" data-city="${city}">
                Voir détails
              </button>
              <button class="flex items-center justify-center gap-1 text-[10px] font-bold text-slate-400 hover:text-primary transition-colors add-compare" data-car-id="${car.id}">
                <span class="material-symbols-outlined text-xs">compare_arrows</span>
                Comparer
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    return card;
  }
  
  setupEventListeners() {
    // View Details buttons
    document.addEventListener('click', (e) => {
      if (e.target.closest('.view-details')) {
        const btn = e.target.closest('.view-details');
        const carId = btn.dataset.carId;
        const from = btn.dataset.from;
        const to = btn.dataset.to;
        const city = btn.dataset.city;
        window.location.href = `cardetail.html?id=${carId}&from=${from}&to=${to}&city=${city}`;
      }
    });
    
    // Compare buttons
    document.addEventListener('click', (e) => {
      if (e.target.closest('.add-compare')) {
        const btn = e.target.closest('.add-compare');
        const carId = parseInt(btn.dataset.carId);
        this.toggleCompare(carId);
      }
    });
    
    // Filter checkboxes
    document.querySelectorAll('[data-filter-type]').forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        this.updateFilters(e.target);
      });
    });
    
    // Sort dropdown
    document.getElementById('sort-select')?.addEventListener('change', (e) => {
      this.currentSort = e.target.value;
      this.applyFilters();
      this.renderResults();
    });
  }
  
  toggleCompare(carId) {
    let compareList = Storage.get('compareList') || [];
    const index = compareList.indexOf(carId);
    
    if (index > -1) {
      compareList.splice(index, 1);
      Toast.info('Voiture retirée de la comparaison');
    } else {
      if (compareList.length >= 3) {
        Toast.error('Maximum 3 voitures à comparer');
        return;
      }
      compareList.push(carId);
      Toast.success('Voiture ajoutée à la comparaison');
    }
    
    Storage.set('compareList', compareList);
    this.renderResults(); // Update button states
  }
  
  updateFilters(checkbox) {
    const type = checkbox.dataset.filterType;
    const value = checkbox.value;
    
    if (checkbox.checked) {
      if (type === 'price') {
        this.filters.priceMin = parseInt(value);
      } else if (type === 'transmission') {
        this.filters.transmission = value;
      } else if (type === 'fuel') {
        this.filters.fuel = value;
      } else if (type === 'category') {
        this.filters.category = value;
      }
    } else {
      delete this.filters[type];
    }
    
    this.applyFilters();
    this.renderResults();
  }
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new SearchResults();
  });
} else {
  new SearchResults();
}
