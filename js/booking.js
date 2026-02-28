// ============ BOOKING FLOW ============

class BookingFlow {
  constructor() {
    this.currentStep = 1;
    this.booking = this.loadBooking();
    this.init();
  }
  
  init() {
    const carId = QueryParams.get('carId');
    const from = QueryParams.get('from');
    const to = QueryParams.get('to');
    
    if (!carId) {
      window.location.href = 'aceuil.html';
      return;
    }
    
    this.booking.carId = parseInt(carId);
    this.booking.from = from || this.booking.from;
    this.booking.to = to || this.booking.to;
    
    this.car = getCarById(carId);
    this.setupEventListeners();
  }
  
  loadBooking() {
    return Storage.get('currentBooking') || {
      carId: null,
      from: null,
      to: null,
      customer: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        license: '',
        licenseExpiry: ''
      },
      termsAccepted: false
    };
  }
  
  saveBooking() {
    Storage.set('currentBooking', this.booking);
  }
  
  setupEventListeners() {
    // Step 1 form validation
    const step1Form = document.querySelector('[data-booking-step="1"]');
    if (step1Form) {
      step1Form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.validateStep1();
      });
    }
    
    // Step 2 form validation
    const step2Form = document.querySelector('[data-booking-step="2"]');
    if (step2Form) {
      step2Form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.validateStep2();
      });
    }
    
    // Next button on step 1
    const nextBtn = document.querySelector('[data-next-step]');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.validateStep1();
      });
    }
    
    // Confirm booking button on step 2
    const confirmBtn = document.querySelector('[data-confirm-booking]');
    if (confirmBtn) {
      confirmBtn.addEventListener('click', () => {
        this.validateStep2();
      });
    }
    
    // Back button
    document.querySelectorAll('[data-back-step]').forEach(btn => {
      btn.addEventListener('click', () => {
        const step = parseInt(btn.dataset.backStep);
        this.goToStep(step);
      });
    });
  }
  
  validateStep1() {
    const inputs = {
      firstName: document.querySelector('[name="firstName"]'),
      lastName: document.querySelector('[name="lastName"]'),
      email: document.querySelector('[name="email"]'),
      phone: document.querySelector('[name="phone"]'),
      license: document.querySelector('[name="license"]'),
      licenseExpiry: document.querySelector('[name="licenseExpiry"]')
    };
    
    let isValid = true;
    
    for (const [key, input] of Object.entries(inputs)) {
      if (!input) continue;
      
      if (!input.value.trim()) {
        input.classList.add('border-red-500');
        isValid = false;
      } else {
        input.classList.remove('border-red-500');
        this.booking.customer[key] = input.value;
      }
    }
    
    if (inputs.email && inputs.email.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(inputs.email.value)) {
        inputs.email.classList.add('border-red-500');
        Toast.error('Email invalide');
        isValid = false;
      }
    }
    
    if (inputs.phone && inputs.phone.value) {
      const phoneRegex = /^[0-9]{9,}$/;
      if (!phoneRegex.test(inputs.phone.value.replace(/\D/g, ''))) {
        inputs.phone.classList.add('border-red-500');
        Toast.error('Numéro de téléphone invalide');
        isValid = false;
      }
    }
    
    if (isValid) {
      this.saveBooking();
      this.goToStep(2);
    } else {
      Toast.error('Veuillez remplir tous les champs correctement');
    }
  }
  
  validateStep2() {
    const termsCheckbox = document.querySelector('[name="terms"]');
    
    if (!termsCheckbox || !termsCheckbox.checked) {
      Toast.error('Vous devez accepter les conditions générales');
      return;
    }
    
    this.booking.termsAccepted = true;
    this.completeBooking();
  }
  
  completeBooking() {
    // Generate booking reference
    const bookingRef = 'YAAN-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    this.booking.reference = bookingRef;
    this.booking.status = 'confirmed';
    this.booking.createdAt = new Date().toISOString();
    
    // Save booking to list
    let bookings = Storage.get('bookings') || [];
    bookings.push(this.booking);
    Storage.set('bookings', bookings);
    
    // Clear current booking
    Storage.remove('currentBooking');
    Storage.remove('compareList');
    Storage.remove('selectedCarForBooking');
    
    // Redirect to confirmation
    window.location.href = `reservationconfirm.html?ref=${bookingRef}`;
  }
  
  goToStep(step) {
    // Hide all steps
    document.querySelectorAll('[data-booking-step]').forEach(el => {
      el.classList.add('hidden');
    });
    
    // Show current step
    const stepEl = document.querySelector(`[data-booking-step="${step}"]`);
    if (stepEl) {
      stepEl.classList.remove('hidden');
    }
    
    // Update progress indicators
    document.querySelectorAll('[data-step-indicator]').forEach(el => {
      const stepNum = parseInt(el.dataset.stepIndicator);
      if (stepNum === step) {
        el.classList.add('bg-primary', 'text-white');
        el.classList.remove('bg-slate-200', 'dark:bg-slate-700');
      } else if (stepNum < step) {
        el.classList.add('bg-primary', 'text-white');
      } else {
        el.classList.remove('bg-primary', 'text-white');
        el.classList.add('bg-slate-200', 'dark:bg-slate-700');
      }
    });
    
    this.currentStep = step;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Confirmation Page
class BookingConfirmation {
  constructor() {
    this.init();
  }
  
  init() {
    const ref = QueryParams.get('ref');
    if (!ref) {
      window.location.href = 'aceuil.html';
      return;
    }
    
    const bookings = Storage.get('bookings') || [];
    this.booking = bookings.find(b => b.reference === ref);
    
    if (!this.booking) {
      Toast.error('Réservation non trouvée');
      return;
    }
    
    this.car = getCarById(this.booking.carId);
    this.renderConfirmation();
  }
  
  renderConfirmation() {
    const refEl = document.querySelector('[data-booking-ref]');
    if (refEl) {
      refEl.textContent = this.booking.reference;
    }
    
    const dateEl = document.querySelector('[data-booking-date]');
    if (dateEl) {
      const date = new Date(this.booking.createdAt);
      dateEl.textContent = date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    
    // Render booking summary
    const summaryEl = document.querySelector('[data-booking-summary]');
    if (summaryEl && this.car) {
      const daysCount = daysBetween(this.booking.from, this.booking.to);
      const total = this.car.pricePerDay * daysCount + 100;
      
      summaryEl.innerHTML = `
        <div class="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 space-y-3">
          <div class="flex justify-between">
            <span class="text-slate-600 dark:text-slate-400">Véhicule:</span>
            <span class="font-semibold text-slate-900 dark:text-white">${this.car.name}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-600 dark:text-slate-400">Durée:</span>
            <span class="font-semibold text-slate-900 dark:text-white">${daysCount} jours</span>
          </div>
          <div class="flex justify-between text-primary font-bold">
            <span>Montant total:</span>
            <span>${formatCurrency(total)}</span>
          </div>
        </div>
      `;
    }
  }
}

// Initialize based on page
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('[data-booking-step]')) {
      new BookingFlow();
    } else if (document.querySelector('[data-booking-confirmation]')) {
      new BookingConfirmation();
    }
  });
} else {
  if (document.querySelector('[data-booking-step]')) {
    new BookingFlow();
  } else if (document.querySelector('[data-booking-confirmation]')) {
    new BookingConfirmation();
  }
}
