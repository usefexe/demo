// ============ MOCK DATA ============

const CARS = [
  {
    id: 1,
    name: 'Dacia Duster',
    category: 'SUV',
    fuel: 'Diesel',
    transmission: 'Manuelle',
    seats: 5,
    luggage: 2,
    ac: true,
    pricePerDay: 450,
    totalDays: 3,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCa1IYh2uD7kzyq-zvR-_rDjAd5aGt12GNTlDSlSeMF3_cllG8DOwpZ8GgHz3uB57NXM9KtQ9txaTCuyCNbaHmf7WQjAXQzcvPTi-aH49Ji5VTNLQ-9NvE7_LqGH31yCPuAh2AdwnLJFk9CP_ueeCeti85P6lrK6pYlBncewp6AEQBv9YTVWsI9Si6dX8rArSIhiJACOZvYbK-fyW1inD9CI9TIHcCA29UZZYh_FaFVxzZuQnoZUMKPUfalKgVfP2tg-KN6lmtuieU',
    agency: 'YaanExpress',
    agencyId: 1,
    rating: 4.6,
    reviews: 128,
    features: ['GPS', 'Bluetooth', 'USB', 'Climatisation'],
    km: 'Illimité',
    cancellation: 'Payante'
  },
  {
    id: 2,
    name: 'Renault Clio 5',
    category: 'Citadine',
    fuel: 'Diesel',
    transmission: 'Manuelle',
    seats: 5,
    luggage: 1,
    ac: true,
    pricePerDay: 295,
    totalDays: 3,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCy8j9tBC5Pw1wTB2vDvVqNHAPbNyxEXpOiOoMym6G7_s1_aRp6uJPD2kjxMlDjXC2V0C10jdEFciuP3OL-bsZl2IULhTbiN35U1n1T_whq0nRd7WYTNp-DQNrVZBr2h0ZOSxxPSNq8nLwPMgzM4wOyQM841DmPeUgtLYOX0-Tb3_4XxXFp7vhBXzNsclDbqm0QLehPjD6KJQ-mCsor77ONJlPnnAaOkknFnopvaOiccPu6N7aRNW818Fio9YFfLLfUvBgBL737TiI',
    agency: 'Budget Maroc',
    agencyId: 2,
    rating: 4.8,
    reviews: 85,
    features: ['Bluetooth', 'Climatisation', 'Annulation Gratuite'],
    km: 'Illimité',
    cancellation: 'Gratuite',
    promo: -15
  },
  {
    id: 3,
    name: 'VW Tiguan R-Line',
    category: 'Premium SUV',
    fuel: 'Diesel',
    transmission: 'Automatique',
    seats: 5,
    luggage: 3,
    ac: true,
    pricePerDay: 650,
    totalDays: 3,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0HYfZOVfY_--2PCLOAUmWdE71rQs88zK66pL6rK3sMYXlTfeFsqWgppo7rrL3DqKrlbt7JgiR7pIeEyRkVkeRJpKqZ5C1g6pSofHDBtpb58QIST5Pci5CWi_vQIMSPPjMgAnoDGBmkCafk84EFezrcllW82PNBns0Gwal7fxGye5Gn7l9zGI6Fw6aHLyP_nX9hs7cmWry7W6pBdRHDI-VK4C7LRxgfOQ9Icyxwutiuf7SvqrT0k3qYIoiT6bjkhgfNK1d-R25ffc',
    agency: 'Hertz Maroc',
    agencyId: 3,
    rating: 4.9,
    reviews: 42,
    features: ['GPS Premium', 'Climatisation Dual Zone', 'Toit Panoramique'],
    km: 'Illimité',
    cancellation: 'Gratuite'
  },
  {
    id: 4,
    name: 'Hyundai i10',
    category: 'Citadine',
    fuel: 'Essence',
    transmission: 'Manuelle',
    seats: 5,
    luggage: 1,
    ac: true,
    pricePerDay: 250,
    totalDays: 3,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDe0DKRlfZGz_rvfdpnH1AvyXVDOmXGNal_EswvK7B8wRFQK8m43m0AgffdUAPHK4rMnPcXMbTPIdLLwSey7_NAok6-QmWcInkb2W2PF5FVkJc4Ww1Tr4U-3IG1aJ2wyK6ebSPowNSWNl0VFo3ejaMcmLBJCrp_MOzlvARRicZ1XYSHuaBhvCCOAf2VH3qszvBSwueFLo1Z8Azlkhcqe18K3_baLSfS-PwaIOgSh7oGHhqCu8vm5cks_FxDdGZUnYFazV2B8w6e83w',
    agency: 'Europcar',
    agencyId: 4,
    rating: 4.5,
    reviews: 67,
    features: ['Climatisation', 'Bluetooth'],
    km: 'Illimité',
    cancellation: 'Payante'
  },
  {
    id: 5,
    name: 'Peugeot 3008',
    category: 'SUV',
    fuel: 'Diesel',
    transmission: 'Automatique',
    seats: 5,
    luggage: 2,
    ac: true,
    pricePerDay: 520,
    totalDays: 3,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSfjHsYk2g5NKGzSVOZFPBg3jCN3nrYc4LZ7mYR5Bw7S8QYzKN3L_HmKlbX3GbSPDxQlvZHvM4T_qZPkN5A',
    agency: 'Sixt Maroc',
    agencyId: 5,
    rating: 4.7,
    reviews: 95,
    features: ['GPS', 'Bluetooth', 'Climatisation Dual Zone'],
    km: '200 km/jour',
    cancellation: 'Payante'
  },
  {
    id: 6,
    name: 'Toyota Camry',
    category: 'Berline',
    fuel: 'Essence',
    transmission: 'Automatique',
    seats: 5,
    luggage: 3,
    ac: true,
    pricePerDay: 580,
    totalDays: 3,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5jKlM3nX8pqZ2dGxJ_H9QzRfYkL5mX6R7mN8Ny4Oq9W0S1eP2fG3rI4jK',
    agency: 'Avis Maroc',
    agencyId: 1,
    rating: 4.8,
    reviews: 110,
    features: ['GPS', 'Climatisation', 'Bluetooth', 'Cruise Control'],
    km: 'Illimité',
    cancellation: 'Gratuite'
  }
];

const AGENCIES = [
  {
    id: 1,
    name: 'YaanExpress',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXiPbbhrkEthJsZPyMbxa7-XDekeQnPG-7sNkB331DhdKUBP29kizQlitiGzXcX6gk8JMxzQ3F4cUodyTcnC5B7oc8HrKrWNawMbwFjIEzIese5CZ6koOn5A_S5IBpysiusNIr3cC8UZVtxpXsKXPHN309NSKS8muasgWpMnWoZiIAOsA5UF_ZEuIaZIqnDbWwIGpLbwMgdPdTkCdq2su6gJdjQjLWuPFV35t03Jl9mOLFCd2IiYnnkL7McR0OLYvOvoC2JpH3nbk',
    rating: 4.6,
    reviews: 340
  },
  {
    id: 2,
    name: 'Budget Maroc',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpjvev7CJqi2xQx96yE4ajFbbdd1ldwEGIerRjHFEx7ggIeb9NDCmfuEX7SJeiN_i7q-yyqkbOr-FdfLJBpf1uWHzHmKQQ_80yFiH338905sQYMFULfayIu-XxUfdMFMgbgOpDQ7Add6Yrl70KSnLu001ZomtUZlWnB5Y6k17hhFG-qC7oLquetXGkp_Yvw1WJOcl8POgEReug0HCfeQ_oiuYkGLyxLPcM1Phcm6eBjhngBUUmPv3RtjzkvpnW3IbkPe9EWnf0Rhs',
    rating: 4.5,
    reviews: 280
  },
  {
    id: 3,
    name: 'Hertz Maroc',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdWxYKeE-KB-je_dag2S5zmOpZmZb91GZFZL4XUwrXsF59lX8rnRJDEtbyx0p3g-lw4AdP7p6RX7XnmQt82zHtK1-xu5e0N0G2msmr9WwhN7f6ZUFB_4VtSE7coikcas3r1cInSp9vpyRG5XAkazJYyR2tq-v7TgpTR-iif4FHfu7_1q-cFood_oSwE9g8cXjNQKjvbX-mYW2UH7MItUQIVBJiPaoR4vkG8HPTcmqy-fJBKtEImoFRBJre4_FgM6SRDs5HcXCfK0M',
    rating: 4.8,
    reviews: 560
  },
  {
    id: 4,
    name: 'Europcar',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVpJhE5qkL2dE3fG4hI5jK6lM7nO8pQ9rS0tU1vW2xY3zAcBcD9eEfGhIj',
    rating: 4.4,
    reviews: 195
  },
  {
    id: 5,
    name: 'Sixt Maroc',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKlMnOaPqRsT2uV3wX4yZ5aAcDeFgHiJkLnOpQrStUvWxYzAbCdEfGhIjKl',
    rating: 4.7,
    reviews: 420
  }
];

const CITIES = [
  'Casablanca',
  'Marrakech',
  'Fez',
  'Rabat',
  'Agadir',
  'Tangier',
  'Meknes',
  'Essaouira',
  'Oujda',
  'Safi'
];

// Get car by ID
function getCarById(id) {
  return CARS.find(car => car.id === parseInt(id));
}

// Get cars by filters
function getCarsByFilters(filters = {}) {
  let filtered = [...CARS];
  
  if (filters.priceMin || filters.priceMax) {
    const min = filters.priceMin || 0;
    const max = filters.priceMax || 10000;
    filtered = filtered.filter(car => car.pricePerDay >= min && car.pricePerDay <= max);
  }
  
  if (filters.transmission) {
    filtered = filtered.filter(car => car.transmission.toLowerCase() === filters.transmission.toLowerCase());
  }
  
  if (filters.fuel) {
    filtered = filtered.filter(car => car.fuel.toLowerCase() === filters.fuel.toLowerCase());
  }
  
  if (filters.category) {
    filtered = filtered.filter(car => car.category.toLowerCase().includes(filters.category.toLowerCase()));
  }
  
  if (filters.seats) {
    filtered = filtered.filter(car => car.seats >= parseInt(filters.seats));
  }
  
  return filtered;
}

// Get agency by ID
function getAgencyById(id) {
  return AGENCIES.find(agency => agency.id === parseInt(id));
}

// Sort cars
function sortCars(cars, sortBy = 'relevance') {
  const sorted = [...cars];
  
  switch(sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => a.pricePerDay - b.pricePerDay);
    case 'price-high':
      return sorted.sort((a, b) => b.pricePerDay - a.pricePerDay);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'popularity':
      return sorted.sort((a, b) => b.reviews - a.reviews);
    default:
      return sorted;
  }
}
