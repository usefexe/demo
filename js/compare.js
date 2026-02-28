// ============ COMPARE PAGE ============

class CompareOffers {
  constructor() {
    this.compareList = [];
    this.compareCars = [];
    this.init();
  }
  
  init() {
    this.loadCompareList();
    this.renderCompareTable();
    this.setupEventListeners();
  }
  
  loadCompareList() {
    this.compareList = Storage.get('compareList') || [];
    this.compareCars = this.compareList.map(id => getCarById(id)).filter(car => car);
    
    if (this.compareCars.length === 0) {
      this.renderEmptyState();
    }
  }
  
  renderEmptyState() {
    const tableContainer = document.querySelector('[data-compare-table]');
    if (tableContainer) {
      tableContainer.innerHTML = `
        <div class="flex flex-col items-center justify-center py-20">
          <span class="material-symbols-outlined text-6xl text-slate-300 mb-4">compare_arrows</span>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Aucune voiture à comparer</h3>
          <p class="text-slate-500 dark:text-slate-400 mb-6">Ajoutez des voitures à votre liste de comparaison depuis la page de résultats.</p>
          <a href="aceuil.html" class="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
            Rechercher une voiture
          </a>
        </div>
      `;
    }
  }
  
  renderCompareTable() {
    if (this.compareCars.length === 0) {
      this.renderEmptyState();
      return;
    }
    
    const tableContainer = document.querySelector('[data-compare-table]');
    if (!tableContainer) return;
    
    let html = `
      <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-50/50 dark:bg-slate-800/50">
                <th class="p-6 w-1/4 min-w-[240px] border-b border-slate-200 dark:border-slate-800">
                  <span class="text-slate-400 text-xs font-bold uppercase tracking-wider">Caractéristiques</span>
                </th>
                ${this.compareCars.map((car, idx) => `
                  <th class="p-6 w-1/4 min-w-[240px] border-b border-slate-200 dark:border-slate-800 relative">
                    <button class="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors remove-compare" data-car-id="${car.id}">
                      <span class="material-symbols-outlined text-lg">cancel</span>
                    </button>
                    <div class="flex flex-col items-center gap-4">
                      <div class="w-full aspect-[4/3] rounded-lg bg-slate-100 dark:bg-slate-800 bg-center bg-cover" style="background-image: url('${car.image}')"></div>
                      <h3 class="text-slate-900 dark:text-slate-100 text-lg font-bold">${car.name}</h3>
                    </div>
                  </th>
                `).join('')}
              </tr>
            </thead>
            <tbody>
              ${this.renderComparisonRows()}
              <tr>
                <td class="p-6"></td>
                ${this.compareCars.map((car, idx) => `
                  <td class="p-6">
                    <button class="w-full flex items-center justify-center gap-2 bg-primary text-white font-bold py-3 px-4 rounded-lg hover:brightness-105 active:scale-[0.98] transition-all choose-offer" data-car-id="${car.id}">
                      <span>Choisir</span>
                      <span class="material-symbols-outlined text-lg">check_circle</span>
                    </button>
                  </td>
                `).join('')}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
    
    tableContainer.innerHTML = html;
  }
  
  renderComparisonRows() {
    const rows = [
      {
        label: 'Prix / jour',
        key: 'pricePerDay',
        formatter: (val) => formatCurrency(val),
        highlight: true
      },
      {
        label: 'Transmission',
        key: 'transmission'
      },
      {
        label: 'Carburant',
        key: 'fuel'
      },
      {
        label: 'Catégorie',
        key: 'category'
      },
      {
        label: 'Sièges',
        key: 'seats',
        formatter: (val) => val
      },
      {
        label: 'Bagages',
        key: 'luggage',
        formatter: (val) => val
      },
      {
        label: 'Kilométrage',
        key: 'km'
      },
      {
        label: 'Agence',
        key: 'agency'
      },
      {
        label: 'Note',
        key: 'rating',
        formatter: (val) => `${val} ⭐ (${this.compareCars.find(c => c.rating === val).reviews} avis)`,
        highlight: true
      }
    ];
    
    return rows.map(row => `
      <tr class="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/30 dark:hover:bg-slate-800/30">
        <td class="p-6 font-semibold text-slate-700 dark:text-slate-300">${row.label}</td>
        ${this.compareCars.map(car => {
          const value = car[row.key];
          const displayValue = row.formatter ? row.formatter(value) : value;
          const isHighlight = row.highlight ? 'text-primary font-bold' : 'text-slate-600 dark:text-slate-400';
          return `<td class="p-6 text-center ${isHighlight}">${displayValue}</td>`;
        }).join('')}
      </tr>
    `).join('');
  }
  
  setupEventListeners() {
    document.addEventListener('click', (e) => {
      // Remove from comparison
      if (e.target.closest('.remove-compare')) {
        const btn = e.target.closest('.remove-compare');
        const carId = parseInt(btn.dataset.carId);
        this.removeFromCompare(carId);
      }
      
      // Choose offer button
      if (e.target.closest('.choose-offer')) {
        const btn = e.target.closest('.choose-offer');
        const carId = parseInt(btn.dataset.carId);
        // Store selected car for booking
        Storage.set('selectedCarForBooking', carId);
        // Redirect to booking
        window.location.href = `reservationinfo.html?carId=${carId}`;
      }
    });
  }
  
  removeFromCompare(carId) {
    this.compareList = this.compareList.filter(id => id !== carId);
    Storage.set('compareList', this.compareList);
    this.loadCompareList();
    this.renderCompareTable();
    Toast.info('Voiture retirée de la comparaison');
  }
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new CompareOffers();
  });
} else {
  new CompareOffers();
}
