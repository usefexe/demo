/**
 * YaanCarz - Car Details Page
 */

import { 
  getQueryParam, formatCurrency, showToast, delay, 
  localStorage_get, localStorage_set 
} from './app.js';
import { getCarById, getAgencyById } from './data.js';

// ==================== Initialize Car Details ====================
export async function initCarDetails() {
  const container = document.querySelector('[data-car-details]');
  if (!container) return;

  // Get query params
  const carId = getQueryParam('id');
  const fromDate = getQueryParam('from');
  const toDate = getQueryParam('to');

  if (!carId) {
    window.location.href = 'aceuil.html';
    return;
  }

  const car = getCarById(carId);
  if (!car) {
    window.location.href = 'resultsearch.html';
    return;
  }

  const agency = getAgencyById(car.agencyId);

  // Calculate rental details
  const days = Math.ceil((new Date(toDate) - new Date(fromDate)) / (1000 * 60 * 60 * 24));
  const priceBeforeTax = car.pricePerDay * days;
  const serviceFee = Math.ceil(priceBeforeTax * 0.05);
  const totalPrice = priceBeforeTax + serviceFee;

  // Update page with car details
  updateCarDetails(car, agency);
  updatePricingInfo(car, days, priceBeforeTax, serviceFee, totalPrice);
  setupReserveButton(carId, fromDate, toDate);
  setupCompareButton(parseInt(carId));
}

// ==================== Update Car Details ====================
function updateCarDetails(car, agency) {
  // Title
  const title = document.querySelector('[data-car-title]');
  if (title) {
    title.textContent = `${car.name} - ${car.transmission} / ${car.fuel}`;
  }

  // Location
  const location = document.querySelector('[data-car-location]');
  if (location) {
    location.textContent = 'Casablanca - Aéroport Mohammed V (CMN)';
  }

  // Features
  const featuresContainer = document.querySelector('[data-car-features]');
  if (featuresContainer) {
    const features = [
      { icon: 'event_seat', label: `${car.seats} Sièges` },
      { icon: 'work', label: `${car.luggage} Bagages` },
      { icon: 'settings', label: car.transmission },
      { icon: 'ac_unit', label: 'Climatisation' },
      { icon: 'local_gas_station', label: car.fuel },
      { icon: 'door_front', label: `${car.doors} Portes` },
      { icon: 'bolt', label: car.features[0] || 'USB / Aux' },
      { icon: 'bluetooth', label: 'Bluetooth' }
    ];

    featuresContainer.innerHTML = features.map(f => `
      <div class="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 flex flex-col items-center text-center gap-2">
        <span class="material-symbols-outlined text-3xl text-primary/80">${f.icon}</span>
        <span class="text-sm font-medium">${f.label}</span>
      </div>
    `).join('');
  }

  // Agency Info
  const agencyName = document.querySelector('[data-agency-name]');
  if (agencyName) {
    agencyName.textContent = agency.name;
  }

  const agencyRating = document.querySelector('[data-agency-rating]');
  if (agencyRating) {
    agencyRating.innerHTML = `
      <span class="material-symbols-outlined text-[18px] fill-current">star</span>
      <span class="text-slate-900 dark:text-white font-bold">${agency.rating}</span>
      <span class="text-slate-500 text-sm font-normal">(${agency.reviews} avis)</span>
    `;
  }
}

// ==================== Update Pricing Info ====================
function updatePricingInfo(car, days, priceBeforeTax, serviceFee, totalPrice) {
  const priceDisplay = document.querySelector('[data-total-price]');
  if (priceDisplay) {
    priceDisplay.textContent = formatCurrency(totalPrice, 'MAD');
  }

  const pricePerDay = document.querySelector('[data-price-per-day]');
  if (pricePerDay) {
    pricePerDay.textContent = formatCurrency(car.pricePerDay, 'MAD');
  }

  const rentalPrice = document.querySelector('[data-rental-price]');
  if (rentalPrice) {
    rentalPrice.textContent = formatCurrency(priceBeforeTax, 'MAD');
  }

  const serviceFeeDisplay = document.querySelector('[data-service-fee]');
  if (serviceFeeDisplay) {
    serviceFeeDisplay.textContent = formatCurrency(serviceFee, 'MAD');
  }

  const duration = document.querySelector('[data-duration]');
  if (duration) {
    duration.innerHTML = `<span class="font-bold text-slate-900 dark:text-white">${days} jours</span>`;
  }
}

// ==================== Setup Reserve Button ====================
function setupReserveButton(carId, fromDate, toDate) {
  const reserveBtn = document.querySelector('[data-reserve-btn]');
  if (reserveBtn) {
    reserveBtn.addEventListener('click', () => {
      window.location.href = `reservationinfo.html?carId=${carId}&from=${fromDate}&to=${toDate}`;
    });
  }
}

// ==================== Setup Compare Button ====================
function setupCompareButton(carId) {
  const compareBtn = document.querySelector('[data-compare-btn]');
  if (compareBtn) {
    compareBtn.addEventListener('click', () => {
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
    });
  }
}

// ==================== Export ====================
export { updateCarDetails, updatePricingInfo };

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCarDetails);
} else {
  initCarDetails();
}
