# YaanCarz JavaScript Implementation Guide

This document outlines the JavaScript enhancements added to the YaanCarz car rental portal. All functionality uses pure JavaScript with localStorage for state management and no external dependencies besides Tailwind CSS.

## Project Structure

```
/js
├── app.js              # Core utilities & helpers
├── data.js             # Mock data (cars, agencies, cities)
├── search.js           # Search results page logic
├── details.js          # Car details page logic
├── compare.js          # Compare cars page logic
├── booking.js          # Booking flow (3-step process)
└── auth.js             # Authentication system
```

## File Overview

### `app.js` - Core Utilities
Contains reusable functions across the application:
- **URL Query Parameters**: `getQueryParam()`, `setQueryParam()`, `buildQueryString()`
- **localStorage Wrapper**: `localStorage_get()`, `localStorage_set()`, `localStorage_remove()`
- **UI Notifications**: `showToast()` - displays success/error/warning messages
- **Loading States**: `showLoadingState()`, `hideLoadingState()`
- **Skeleton Loaders**: `createSkeletonLoader()` for loading UI
- **Empty States**: `createEmptyState()` for no results
- **Date Formatting**: `formatDate()`, `calculateDaysDifference()`
- **Currency**: `formatCurrency()` - formats amounts in MAD
- **Validation**: `validateEmail()`, `validatePhone()`, `validateRequired()`
- **Utilities**: `generateId()`, `delay()`, CSS animations injection

### `data.js` - Mock Data
Contains all demo data for the application:
- **MOROCCAN_CITIES**: 10 cities with codes
- **AGENCIES**: 5 rental agencies with ratings
- **CARS**: 8 vehicles with full details (price, fuel, transmission, features)
- **Search Functions**: `getCarById()`, `searchCars()`, `getAgencyById()`, `getCityByName()`

### `search.js` - Search Results Page
Manages the car search results and filtering:
- `initSearchResults()` - Main initialization
- `updateSearchHeader()` - Updates page title with search criteria
- `renderCars()` - Renders car cards with all details
- Filtering by price, fuel type, transmission
- "Add to comparison" functionality (max 3 cars)
- "View details" navigation to car details page
- Loading state with fake 400ms delay

### `details.js` - Car Details Page
Handles the car details view:
- `initCarDetails()` - Loads car data from query params
- `updateCarDetails()` - Displays car specs, features, agency info
- `updatePricingInfo()` - Calculates total price for rental period
- "Reserve Now" button redirects to booking step 1
- "Add to comparison" button with toast notification

### `compare.js` - Comparison Page
Manages the car comparison table:
- `initComparePage()` - Loads cars from compare list
- `renderComparisonTable()` - Creates dynamic comparison table
- Remove buttons for each compared car
- "Choose this offer" buttons to proceed to booking
- Empty state when no cars are selected for comparison

### `booking.js` - Booking Flow (3 Steps)
Implements the complete reservation process:

**Step 1 (reservationinfo.html):**
- Form validation for customer info (name, email, phone)
- License number and passport validation
- Terms & conditions checkbox
- Saves data to localStorage

**Step 2 (resevationlaststape.html):**
- Recap of customer info
- Selected car details
- Pricing breakdown
- Accepts terms checkbox
- Generates unique booking reference (YAAN-xxxxx)

**Step 3 (resevationsucses.html):**
- Success message with booking reference
- Displays booking details
- Links to home and bookings page

### `auth.js` - Authentication System
Simple fake authentication (demo only):
- `login()` - Authenticates user with email/password
- `register()` - Creates new user account
- `logout()` - Clears session
- `getCurrentUser()` - Gets current session
- `isAuthenticated()` - Checks if user is logged in
- Mock user: test@example.com / Test123!
- Updates UI based on auth state

## How It Works

### 1. Home Page (aceuil.html)
- Search form with city, from date, to date
- Triggers redirect to search results with query params

### 2. Search Results (resultsearch.html)
- Reads query params (city, from, to)
- Displays cars matching those criteria
- Filters update the results instantly
- Each car shows price, agency, features
- "Add to comparison" stores car IDs in localStorage

### 3. Car Details (cardetail.html)
- Reads car ID and dates from query params
- Displays full car info and specs
- Calculates rental total
- "Reserve" goes to booking form

### 4. Compare Page (compareoffre.html)
- Reads compare list from localStorage
- Shows comparison table
- "Choose offer" proceeds to booking

### 5. Booking (3-step process)
- Step 1: Collect customer info + validation
- Step 2: Review + confirm reservation
- Step 3: Success confirmation

## Data Persistence

All data is stored in localStorage:
```javascript
// Search filters
localStorage.getItem('search_filters')

// Comparison list (car IDs)
localStorage.getItem('compare_list')

// Booking data
localStorage.getItem('booking_customer')
localStorage.getItem('booking_car_id')

// All bookings history
localStorage.getItem('bookings')

// User session
localStorage.getItem('auth_session')
```

## Navigation Flow

```
aceuil.html (home)
    ↓ (search form)
resultsearch.html (results + filters)
    ├→ cardetail.html?id=X&from=DATE&to=DATE
    │   ↓ (reserve)
    │   reservationinfo.html (step 1)
    │       ↓
    │   resevationlaststape.html (step 2)
    │       ↓
    │   resevationsucses.html (success)
    │
    └→ compareoffre.html
        ↓ (choose offer)
        reservationinfo.html
```

## Key Features Implemented

✅ **Search & Filter**
- Search by city and dates
- Filter by price, fuel type, transmission
- Real-time results update
- Empty state when no results

✅ **Car Comparison**
- Add up to 3 cars to comparison
- Dynamic comparison table
- Remove cars from list
- Direct booking from comparison

✅ **Booking Flow**
- 3-step reservation process
- Form validation with error messages
- Toast notifications for actions
- Booking reference generation
- Booking history in localStorage

✅ **UI/UX Improvements**
- Loading states with skeleton loaders
- Toast notifications (success/error/warning)
- Empty states for no results
- Proper date formatting (French locale)
- Currency formatting (MAD)
- Responsive design across all pages

✅ **Authentication**
- Simple login/signup system (demo)
- Session management
- Auth UI updates
- Protected booking flow (checks if logged in)

✅ **State Management**
- All state in localStorage
- Query params for navigation
- No backend required

## Testing the Application

### Default Test User
```
Email: test@example.com
Password: Test123!
```

### Test Workflow
1. Go to home page
2. Select city and dates
3. Browse search results
4. Try filters
5. Add cars to comparison
6. View car details
7. Start booking (no login required)
8. Fill customer form
9. Review on step 2
10. Complete and see confirmation

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires ES6+ support (modules, arrow functions, etc.)
- localStorage support required
- Tested with Tailwind CSS v4

## Future Enhancements

- Backend API integration
- Real user authentication
- Payment processing
- Email confirmations
- SMS notifications
- User dashboard
- Booking history management
- Admin panel for car/agency management

## Notes

- No external JavaScript libraries used (besides Tailwind for CSS)
- All styling is Tailwind CSS classes
- Mock data in data.js - easily replaceable with API calls
- localStorage used for demo - replace with backend in production
- Authentication is fake - for demo only
- No real payments - booking confirmation is instant

---

**Version**: 1.0  
**Last Updated**: 2024  
**Status**: Production Ready (Demo)
