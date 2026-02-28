# YaanCarz JavaScript Implementation Guide

## Overview
This document outlines the pure JavaScript functionality added to the YaanCarz car rental portal while maintaining the existing HTML structure and Tailwind CSS styling.

## File Structure

```
js/
├── app.js           # Core utilities (Query params, LocalStorage, Toasts, Loading)
├── data.js          # Mock data (Cars, Agencies, Cities, helper functions)
├── search.js        # Search results page functionality
├── details.js       # Car details page functionality
├── compare.js       # Compare page functionality
├── booking.js       # Booking flow (3-step process)
└── auth.js          # Authentication management
```

## Features Implemented

### 1. Core Utilities (app.js)
- **QueryParams**: Get/set URL query parameters
- **Storage**: LocalStorage wrapper with JSON serialization
- **Toast**: Non-blocking notifications (success, error, info)
- **Loading**: Skeleton loading states
- **Formatting**: Currency & date formatting utilities

### 2. Mock Data (data.js)
- **CARS**: 6 car models with complete specs (pricing, transmission, fuel, features)
- **AGENCIES**: 5 rental agencies with logos and ratings
- **CITIES**: 10 Moroccan cities
- Helper functions: `getCarById()`, `getCarsByFilters()`, `sortCars()`

### 3. Search Results (search.js)
- Dynamic car card rendering from mock data
- **Filters**: Price range, transmission, fuel type, category
- **Sorting**: Relevance, price (low-high), price (high-low), rating, popularity
- **Compare feature**: Add/remove up to 3 cars for comparison
- **Navigation**: Links to car details with query params (dates & location)
- **Loading state**: 400ms fake delay with skeleton UI

### 4. Car Details (details.js)
- Load car data from URL query params (`id`, `from`, `to`, `city`)
- **Dynamic specs rendering**: All vehicle specifications
- **Booking summary**: Price calculation based on rental dates
- **Cost breakdown**: Daily rate, service fees, insurance, mileage
- **Compare button**: Add to comparison list
- **Reserve button**: Navigate to booking flow

### 5. Compare Page (compare.js)
- Render comparison table from localStorage list
- **Max 3 cars** to compare
- **Comparison rows**: Price/day, transmission, fuel, category, seats, luggage, km, agency, rating
- **Remove button**: Delete car from comparison
- **Choose button**: Select a car to proceed to booking
- **Empty state**: Message when no cars selected

### 6. Booking Flow (booking.js)
**3-Step Process:**

**Step 1 - Customer Info:**
- First name, last name, email, phone, license number, license expiry
- Real-time validation
- Error highlighting for invalid fields
- Next button to proceed to Step 2

**Step 2 - Recap & Terms:**
- Display booking summary (car, dates, cost)
- Accept terms & conditions checkbox
- Confirm button to complete booking

**Step 3 - Confirmation:**
- Generate unique booking reference (YAAN-XXXXX)
- Display confirmation details
- Show booking summary with car and total cost
- Save booking to localStorage under "bookings" key

### 7. Authentication (auth.js)
- **Simple fake login**: Accepts any valid email/password
- Modal-based login interface
- User state stored in localStorage
- Update UI based on auth state
- Logout functionality with cleanup

## Navigation Flow

```
aceuil.html (home)
    ↓ [Search form]
    ↓
resultsearch.html?city=...&from=...&to=...
    ├─ [Voir détails] → cardetail.html?id=CAR_ID&from=...&to=...
    │                     ├─ [Réserver] → reservationinfo.html?carId=CAR_ID
    │                     │                   ↓
    │                     │              reservationlaststape.html (Step 2)
    │                     │                   ↓
    │                     │              reservationconfirm.html?ref=YAAN-XXXXX
    │                     └─ [Ajouter à comparer]
    │
    └─ [Comparer] → compareoffre.html
                        ├─ [Choisir cette offre] → reservationinfo.html?carId=CAR_ID
                        └─ [Retirer]
```

## Key Features

### 1. LocalStorage Management
- **compareList**: Array of car IDs to compare (max 3)
- **currentBooking**: Active booking form data (Steps 1-2)
- **bookings**: Completed bookings with references
- **currentUser**: Logged-in user information

### 2. Data Attributes Used
- `data-cars-container`: Target div for car results
- `data-specs-container`: Car specs grid
- `data-compare-table`: Comparison table container
- `data-total-price`: Total price display
- `data-per-day-price`: Daily rate display
- `data-rental-dates`: Rental dates container
- `data-cost-breakdown`: Cost breakdown container
- `data-reserve-btn`: Reserve button
- `data-booking-step`: Booking form step
- `data-booking-confirmation`: Confirmation page flag

### 3. Toast Notifications
```javascript
Toast.success('Message'); // Green toast
Toast.error('Message');   // Red toast
Toast.info('Message');    // Blue toast
```

### 4. Utility Functions
```javascript
formatCurrency(450);           // "450 MAD"
formatDate('2025-03-15');      // "15 mar. 2025"
daysBetween('2025-03-15', '2025-03-18'); // 3
```

## Demo Data

### Sample Cars
- Dacia Duster: 450 MAD/day (SUV, Diesel, Manual)
- Renault Clio 5: 295 MAD/day (Citadine, Diesel, Manual) - 15% promo
- VW Tiguan R-Line: 650 MAD/day (Premium SUV, Diesel, Auto)
- Hyundai i10: 250 MAD/day (Citadine, Essence, Manual)
- Peugeot 3008: 520 MAD/day (SUV, Diesel, Auto)
- Toyota Camry: 580 MAD/day (Berline, Essence, Auto)

### Sample Agencies
- YaanExpress, Budget Maroc, Hertz Maroc, Europcar, Sixt Maroc

## Browser Compatibility
- Uses modern ES6+ features
- Requires localStorage support
- Tested on Chrome, Firefox, Safari, Edge

## Performance Notes
- Simulated 400ms network delay on search/details pages
- Mock data only (no backend calls)
- Relative paths for all JS imports
- GitHub Pages compatible

## Future Enhancements
- Backend API integration (replace mock data)
- Real payment processing
- Email confirmation notifications
- SMS reminders
- Admin dashboard for bookings
- User reviews and ratings

---

**Status**: Demo-ready with all features working in standalone mode.
**Last Updated**: 2025-02-28
