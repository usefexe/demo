/**
 * YaanCarz - Booking/Reservation Flow
 */

import { 
  getQueryParam, formatCurrency, showToast, validateEmail, 
  validatePhone, validateRequired, generateId, delay,
  localStorage_get, localStorage_set 
} from './app.js';
import { getCarById } from './data.js';

// ==================== Step 1: Reservation Info ====================
export async function initReservationInfo() {
  const form = document.querySelector('[data-booking-form]');
  if (!form) return;

  const carId = getQueryParam('carId');
  const car = getCarById(carId);

  if (!car) {
    window.location.href = 'aceuil.html';
    return;
  }

  // Setup form validation
  setupFormValidation(form, carId);
}

function setupFormValidation(form, carId) {
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form values
    const firstName = form.querySelector('[name="firstName"]')?.value.trim();
    const lastName = form.querySelector('[name="lastName"]')?.value.trim();
    const email = form.querySelector('[name="email"]')?.value.trim();
    const phone = form.querySelector('[name="phone"]')?.value.trim();
    const licenseNumber = form.querySelector('[name="licenseNumber"]')?.value.trim();
    const passportNumber = form.querySelector('[name="passportNumber"]')?.value.trim();
    const acceptTerms = form.querySelector('[name="acceptTerms"]')?.checked;

    // Validate all fields
    if (!validateRequired(firstName)) {
      showToast('Veuillez entrer votre prénom', 'error');
      return;
    }
    if (!validateRequired(lastName)) {
      showToast('Veuillez entrer votre nom', 'error');
      return;
    }
    if (!validateEmail(email)) {
      showToast('Email invalide', 'error');
      return;
    }
    if (!validatePhone(phone)) {
      showToast('Numéro de téléphone invalide', 'error');
      return;
    }
    if (!validateRequired(licenseNumber)) {
      showToast('Veuillez entrer votre numéro de permis', 'error');
      return;
    }
    if (!validateRequired(passportNumber)) {
      showToast('Veuillez entrer votre numéro de passeport', 'error');
      return;
    }
    if (!acceptTerms) {
      showToast('Veuillez accepter les conditions générales', 'error');
      return;
    }

    // Save customer info
    const customerInfo = {
      firstName,
      lastName,
      email,
      phone,
      licenseNumber,
      passportNumber
    };

    localStorage_set('booking_customer', customerInfo);
    localStorage_set('booking_car_id', carId);

    // Show loading and redirect
    showToast('Information confirmée', 'success');
    await delay(500);
    
    // Get dates if available
    const from = getQueryParam('from');
    const to = getQueryParam('to');
    const dateParams = from && to ? `&from=${from}&to=${to}` : '';
    
    window.location.href = `resevationlaststape.html?carId=${carId}${dateParams}`;
  });
}

// ==================== Step 2: Recap & Confirmation ====================
export async function initReservationRecap() {
  const container = document.querySelector('[data-recap-container]');
  if (!container) return;

  const carId = getQueryParam('carId');
  const car = getCarById(carId);
  const customer = localStorage_get('booking_customer', {});

  if (!car || !customer.firstName) {
    window.location.href = 'aceuil.html';
    return;
  }

  // Display recap
  displayRecap(car, customer);

  // Setup confirm button
  setupConfirmButton(carId, customer);
}

function displayRecap(car, customer) {
  const recap = document.querySelector('[data-recap-content]');
  if (!recap) return;

  const from = getQueryParam('from') || new Date().toISOString().split('T')[0];
  const to = getQueryParam('to') || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const days = Math.ceil((new Date(to) - new Date(from)) / (1000 * 60 * 60 * 24));
  const totalPrice = car.pricePerDay * days;

  recap.innerHTML = `
    <div class="space-y-6">
      <!-- Customer Info -->
      <div class="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
        <h3 class="text-lg font-bold mb-4">Données du client</h3>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="text-xs text-slate-500 uppercase">Prénom</p>
            <p class="font-semibold">${customer.firstName}</p>
          </div>
          <div>
            <p class="text-xs text-slate-500 uppercase">Nom</p>
            <p class="font-semibold">${customer.lastName}</p>
          </div>
          <div>
            <p class="text-xs text-slate-500 uppercase">Email</p>
            <p class="font-semibold text-sm">${customer.email}</p>
          </div>
          <div>
            <p class="text-xs text-slate-500 uppercase">Téléphone</p>
            <p class="font-semibold">${customer.phone}</p>
          </div>
        </div>
      </div>

      <!-- Car Info -->
      <div class="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
        <h3 class="text-lg font-bold mb-4">Véhicule sélectionné</h3>
        <div class="flex gap-4">
          <img src="${car.image}" alt="${car.name}" class="w-32 h-24 rounded-lg object-cover" />
          <div class="flex-1">
            <h4 class="font-bold text-lg">${car.name}</h4>
            <p class="text-sm text-slate-600 dark:text-slate-400">${car.transmission} / ${car.fuel}</p>
            <p class="text-primary font-bold mt-2">${formatCurrency(car.pricePerDay, 'MAD')}/jour</p>
          </div>
        </div>
      </div>

      <!-- Dates & Pricing -->
      <div class="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
        <h3 class="text-lg font-bold mb-4">Détails de la réservation</h3>
        <div class="space-y-3">
          <div class="flex justify-between">
            <span class="text-slate-600 dark:text-slate-400">Dates</span>
            <span class="font-semibold">${from} à ${to}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-600 dark:text-slate-400">Nombre de jours</span>
            <span class="font-semibold">${days} jours</span>
          </div>
          <div class="flex justify-between border-t pt-2">
            <span class="text-slate-600 dark:text-slate-400">Sous-total</span>
            <span class="font-semibold">${formatCurrency(car.pricePerDay * days, 'MAD')}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-primary font-bold">Total</span>
            <span class="text-primary font-bold text-lg">${formatCurrency(totalPrice, 'MAD')}</span>
          </div>
        </div>
      </div>

      <!-- Terms -->
      <label class="flex items-start gap-3">
        <input type="checkbox" id="acceptTermsRecap" class="mt-1" />
        <span class="text-sm text-slate-600 dark:text-slate-400">J'accepte les conditions générales et la politique de confidentialité</span>
      </label>
    </div>
  `;
}

function setupConfirmButton(carId, customer) {
  const confirmBtn = document.querySelector('[data-confirm-btn]');
  if (!confirmBtn) return;

  confirmBtn.addEventListener('click', async () => {
    const termsCheckbox = document.querySelector('#acceptTermsRecap');
    if (!termsCheckbox || !termsCheckbox.checked) {
      showToast('Veuillez accepter les conditions générales', 'error');
      return;
    }

    // Create booking record
    const bookingId = generateId('YAAN');
    const booking = {
      id: bookingId,
      carId,
      customer,
      from: getQueryParam('from'),
      to: getQueryParam('to'),
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    };

    // Save booking
    const bookings = localStorage_get('bookings', []);
    bookings.push(booking);
    localStorage_set('bookings', bookings);

    // Clear temp data
    localStorage_remove('booking_customer');
    localStorage_remove('booking_car_id');

    showToast('Réservation confirmée!', 'success');
    await delay(500);

    window.location.href = `resevationsucses.html?bookingId=${bookingId}`;
  });
}

// ==================== Step 3: Success Confirmation ====================
export async function initSuccessPage() {
  const bookingId = getQueryParam('bookingId');
  const bookings = localStorage_get('bookings', []);
  const booking = bookings.find(b => b.id === bookingId);

  if (!booking) {
    window.location.href = 'aceuil.html';
    return;
  }

  const car = getCarById(booking.carId);

  // Display success message
  const successContent = document.querySelector('[data-success-content]');
  if (successContent) {
    successContent.innerHTML = `
      <div class="text-center space-y-4">
        <div class="flex justify-center mb-6">
          <div class="bg-green-100 dark:bg-green-900/30 p-6 rounded-full">
            <span class="material-symbols-outlined text-6xl text-green-600">check_circle</span>
          </div>
        </div>
        <h2 class="text-4xl font-bold text-slate-900 dark:text-white">Réservation confirmée!</h2>
        <p class="text-xl text-slate-600 dark:text-slate-400">Votre numéro de référence:</p>
        <div class="bg-primary/10 border-2 border-primary p-4 rounded-lg">
          <p class="text-2xl font-black text-primary">${booking.id}</p>
        </div>
        <p class="text-slate-600 dark:text-slate-400">Un email de confirmation a été envoyé à <strong>${booking.customer.email}</strong></p>
        
        <div class="mt-8 p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <h3 class="font-bold text-lg mb-4">Détails de votre réservation</h3>
          <div class="space-y-2 text-sm text-left">
            <div class="flex justify-between">
              <span>Véhicule:</span>
              <span class="font-semibold">${car.name}</span>
            </div>
            <div class="flex justify-between">
              <span>Passager:</span>
              <span class="font-semibold">${booking.customer.firstName} ${booking.customer.lastName}</span>
            </div>
            <div class="flex justify-between">
              <span>Dates:</span>
              <span class="font-semibold">${booking.from} à ${booking.to}</span>
            </div>
          </div>
        </div>

        <div class="mt-8 flex gap-4 justify-center">
          <a href="aceuil.html" class="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary/90">
            Retour à l'accueil
          </a>
          <a href="profile.html" class="bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white px-8 py-3 rounded-lg font-bold hover:bg-slate-300 dark:hover:bg-slate-600">
            Mes Réservations
          </a>
        </div>
      </div>
    `;
  }
}

// ==================== Helper: Remove from localStorage ====================
function localStorage_remove(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (e) {
    console.error(`Error removing localStorage key "${key}":`, e);
    return false;
  }
}

// ==================== Export ====================
export { setupFormValidation, displayRecap, setupConfirmButton };

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('reservationinfo')) {
      initReservationInfo();
    } else if (currentPage.includes('resevationlaststape')) {
      initReservationRecap();
    } else if (currentPage.includes('resevationsucses')) {
      initSuccessPage();
    }
  });
} else {
  const currentPage = window.location.pathname;
  
  if (currentPage.includes('reservationinfo')) {
    initReservationInfo();
  } else if (currentPage.includes('resevationlaststape')) {
    initReservationRecap();
  } else if (currentPage.includes('resevationsucses')) {
    initSuccessPage();
  }
}
