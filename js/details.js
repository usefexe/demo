// ============ CAR DETAILS PAGE ============

class CarDetails {
  constructor() {
    this.car = null;
    this.init();
  }
  
  init() {
    const carId = QueryParams.get('id');
    const from = QueryParams.get('from');
    const to = QueryParams.get('to');
    
    if (!carId) {
      window.location.href = 'aceuil.html';
      return;
    }
    
    this.car = getCarById(carId);
    this.searchParams = { 
      carId, 
      from: from || new Date().toISOString().split('T')[0],
      to: to || new Date(Date.now() + 5*24*60*60*1000).toISOString().split('T')[0]
    };
    
    if (this.car) {
      this.renderDetails();
      this.setupEventListeners();
    }
  }
  
  renderDetails() {
    // Update title
    const title = document.querySelector('h1');
    if (title) {
      title.textContent = `${this.car.name} - ${this.car.transmission} / ${this.car.fuel}`;
    }
    
    // Update breadcrumb
    const breadcrumb = document.querySelector('nav');
    if (breadcrumb) {
      breadcrumb.innerHTML = `
        <a class="hover:text-primary transition-colors" href="aceuil.html">Accueil</a>
        <span class="material-symbols-outlined text-[16px]">chevron_right</span>
        <a class="hover:text-primary transition-colors" href="resultsearch.html">Voitures</a>
        <span class="material-symbols-outlined text-[16px]">chevron_right</span>
        <span class="text-slate-900 dark:text-slate-100">${this.car.name}</span>
      `;
    }
    
    // Render specs
    const specsContainer = document.querySelector('[data-specs-container]');
    if (specsContainer) {
      specsContainer.innerHTML = this.renderSpecs();
    }
    
    // Render booking summary
    this.updateBookingSummary();
    
    // Render reserve button
    const reserveBtn = document.querySelector('[data-reserve-btn]');
    if (reserveBtn) {
      const { from, to } = this.searchParams;
      reserveBtn.addEventListener('click', () => {
        window.location.href = `reservationinfo.html?carId=${this.car.id}&from=${from}&to=${to}`;
      });
    }
  }
  
  renderSpecs() {
    const specs = [
      { icon: 'event_seat', label: `${this.car.seats} Sièges` },
      { icon: 'work', label: `${this.car.luggage} Bagages` },
      { icon: 'settings', label: this.car.transmission },
      { icon: 'ac_unit', label: this.car.ac ? 'Climatisation' : 'Sans clim' },
      { icon: 'local_gas_station', label: this.car.fuel },
      { icon: 'door_front', label: '4 Portes' },
      { icon: 'bolt', label: 'USB / Aux' },
      { icon: 'bluetooth', label: 'Bluetooth' }
    ];
    
    return specs.map(spec => `
      <div class="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 flex flex-col items-center text-center gap-2">
        <span class="material-symbols-outlined text-3xl text-primary/80">${spec.icon}</span>
        <span class="text-sm font-medium">${spec.label}</span>
      </div>
    `).join('');
  }
  
  updateBookingSummary() {
    const { from, to } = this.searchParams;
    const daysCount = daysBetween(from, to);
    const rentalCost = this.car.pricePerDay * daysCount;
    const serviceFee = 100;
    const totalPrice = rentalCost + serviceFee;
    
    // Update price display
    const priceEl = document.querySelector('[data-total-price]');
    if (priceEl) {
      priceEl.textContent = formatCurrency(totalPrice);
    }
    
    const perDayEl = document.querySelector('[data-per-day-price]');
    if (perDayEl) {
      perDayEl.textContent = formatCurrency(this.car.pricePerDay);
    }
    
    // Update dates display
    const datesEl = document.querySelector('[data-rental-dates]');
    if (datesEl) {
      const fromFormatted = formatDate(from);
      const toFormatted = formatDate(to);
      datesEl.innerHTML = `
        <div class="flex justify-between items-center text-sm">
          <div class="font-semibold">${fromFormatted} - 10:00</div>
          <span class="material-symbols-outlined text-slate-300">arrow_forward</span>
          <div class="font-semibold">${toFormatted} - 10:00</div>
        </div>
        <div class="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500">
          Durée totale: <span class="font-bold text-slate-900 dark:text-white">${daysCount} jours</span>
        </div>
      `;
    }
    
    // Update cost breakdown
    const breakdownEl = document.querySelector('[data-cost-breakdown]');
    if (breakdownEl) {
      breakdownEl.innerHTML = `
        <div class="flex justify-between text-sm">
          <span class="text-slate-500">Location (${daysCount} jours)</span>
          <span class="font-medium">${formatCurrency(rentalCost)}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-slate-500">Frais de service</span>
          <span class="font-medium">${formatCurrency(serviceFee)}</span>
        </div>
        <div class="flex justify-between text-sm text-primary font-bold">
          <span>Assurance collision (CDW)</span>
          <span>Inclus</span>
        </div>
        <div class="flex justify-between text-sm text-primary font-bold">
          <span>Kilométrage illimité</span>
          <span>${this.car.km === 'Illimité' ? 'Offert' : this.car.km}</span>
        </div>
      `;
    }
  }
  
  setupEventListeners() {
    // Add to compare button
    const compareBtn = document.querySelector('[data-compare-btn]');
    if (compareBtn) {
      compareBtn.addEventListener('click', () => {
        this.toggleCompare();
      });
    }
  }
  
  toggleCompare() {
    let compareList = Storage.get('compareList') || [];
    const index = compareList.indexOf(this.car.id);
    
    if (index > -1) {
      compareList.splice(index, 1);
      Toast.info('Voiture retirée de la comparaison');
    } else {
      if (compareList.length >= 3) {
        Toast.error('Maximum 3 voitures à comparer');
        return;
      }
      compareList.push(this.car.id);
      Toast.success('Voiture ajoutée à la comparaison');
    }
    
    Storage.set('compareList', compareList);
  }
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new CarDetails();
  });
} else {
  new CarDetails();
}
