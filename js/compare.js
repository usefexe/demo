/**
 * YaanCarz - Compare Cars Page
 */

import { 
  formatCurrency, showToast, localStorage_get, localStorage_set, createEmptyState 
} from './app.js';
import { getCarById, getAgencyById } from './data.js';

// ==================== Initialize Compare Page ====================
export async function initComparePage() {
  const tableBody = document.querySelector('[data-compare-table]');
  if (!tableBody) return;

  const compareList = localStorage_get('compare_list', []);

  if (compareList.length === 0) {
    const container = document.querySelector('[data-compare-container]');
    if (container) {
      container.innerHTML = '';
      container.appendChild(createEmptyState('compare_arrows', 'Aucune voiture à comparer', 'Ajoutez des véhicules depuis les résultats de recherche'));
    }
    return;
  }

  // Get car data
  const cars = compareList.map(carId => getCarById(carId)).filter(Boolean);

  if (cars.length === 0) {
    localStorage_set('compare_list', []);
    location.reload();
    return;
  }

  // Render comparison table
  renderComparisonTable(cars);

  // Setup remove buttons
  setupRemoveButtons();
}

// ==================== Render Comparison Table ====================
function renderComparisonTable(cars) {
  const thead = document.querySelector('[data-compare-thead]');
  const tbody = document.querySelector('[data-compare-tbody]');

  if (!thead || !tbody) return;

  // Clear existing content
  thead.innerHTML = '';
  tbody.innerHTML = '';

  // Create header row
  let headerRow = '<tr class="bg-slate-50/50 dark:bg-slate-800/50"><th class="p-6 w-1/4 min-w-[240px] border-b border-slate-200 dark:border-slate-800"><span class="text-slate-400 text-xs font-bold uppercase tracking-wider">Caractéristiques</span></th>';

  cars.forEach((car, idx) => {
    const agency = getAgencyById(car.agencyId);
    headerRow += `
      <th class="p-6 w-1/4 min-w-[240px] border-b border-slate-200 dark:border-slate-800 relative">
        <button class="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors remove-compare-btn" data-car-id="${car.id}" data-index="${idx}">
          <span class="material-symbols-outlined text-lg">cancel</span>
        </button>
        <div class="flex flex-col items-center gap-4">
          <div class="w-full aspect-[4/3] rounded-lg bg-slate-100 dark:bg-slate-800 bg-center bg-cover" style="background-image: url('${car.image}')"></div>
          <h3 class="text-slate-900 dark:text-slate-100 text-lg font-bold">${car.name}</h3>
        </div>
      </th>
    `;
  });

  headerRow += '</tr>';
  thead.innerHTML = headerRow;

  // Create comparison rows
  const rows = [
    { label: 'Prix / jour', key: 'pricePerDay', format: 'currency' },
    { label: 'Transmission', key: 'transmission', format: 'text' },
    { label: 'Carburant', key: 'fuel', format: 'text' },
    { label: 'Sièges', key: 'seats', format: 'text' },
    { label: 'Bagages', key: 'luggage', format: 'text' },
    { label: 'Climatisation', key: 'ac', format: 'boolean' },
    { label: 'Portes', key: 'doors', format: 'text' },
    { label: 'Agence', key: 'agencyId', format: 'agency' }
  ];

  rows.forEach(row => {
    let tr = `<tr class="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/30 dark:hover:bg-slate-800/30"><td class="p-6 font-semibold text-slate-700 dark:text-slate-300">${row.label}</td>`;

    cars.forEach(car => {
      let value = '';

      if (row.key === 'agencyId') {
        const agency = getAgencyById(car.agencyId);
        value = `<div class="flex flex-col items-center gap-1"><span class="text-slate-900 dark:text-slate-100 font-medium">${agency.name}</span><span class="text-xs text-slate-400">4.8 Rating</span></div>`;
      } else if (row.format === 'currency') {
        value = `<span class="text-primary font-bold text-xl">${formatCurrency(car[row.key], 'MAD')}</span>`;
      } else if (row.format === 'boolean') {
        value = `<span class="text-slate-600 dark:text-slate-400">${car[row.key] ? 'Oui' : 'Non'}</span>`;
      } else {
        value = `<span class="text-slate-600 dark:text-slate-400">${car[row.key]}</span>`;
      }

      tr += `<td class="p-6 text-center">${value}</td>`;
    });

    tr += '</tr>';
    tbody.innerHTML += tr;
  });

  // Add action row
  let actionRow = '<tr><td class="p-6"></td>';
  cars.forEach(car => {
    actionRow += `
      <td class="p-6">
        <button class="w-full flex items-center justify-center gap-2 bg-primary text-white font-bold py-3 px-4 rounded-lg hover:brightness-105 active:scale-[0.98] transition-all choose-btn" data-car-id="${car.id}">
          <span>Choisir</span>
          <span class="material-symbols-outlined text-lg">check_circle</span>
        </button>
      </td>
    `;
  });
  actionRow += '</tr>';
  tbody.innerHTML += actionRow;

  // Setup action buttons
  setupChooseButtons();
}

// ==================== Setup Remove Buttons ====================
function setupRemoveButtons() {
  document.querySelectorAll('.remove-compare-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const carId = parseInt(e.currentTarget.getAttribute('data-car-id'));
      const compareList = localStorage_get('compare_list', []);
      compareList.splice(compareList.indexOf(carId), 1);
      localStorage_set('compare_list', compareList);
      
      showToast('Removed from comparison', 'info');
      location.reload();
    });
  });
}

// ==================== Setup Choose Buttons ====================
function setupChooseButtons() {
  document.querySelectorAll('.choose-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const carId = e.currentTarget.getAttribute('data-car-id');
      // Store selected car in localStorage
      localStorage_set('selected_car_id', carId);
      
      // For now, go to home - in full implementation would pass dates
      window.location.href = `reservationinfo.html?carId=${carId}`;
    });
  });
}

// ==================== Export ====================
export { renderComparisonTable };

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initComparePage);
} else {
  initComparePage();
}
