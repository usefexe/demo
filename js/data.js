/**
 * YaanCarz - Mock Data
 */

// ==================== Morocco Cities ====================
export const MOROCCAN_CITIES = [
  { id: 1, name: 'Casablanca', code: 'CMN' },
  { id: 2, name: 'Rabat', code: 'RAB' },
  { id: 3, name: 'Marrakech', code: 'RAK' },
  { id: 4, name: 'Tanger', code: 'TNG' },
  { id: 5, name: 'Agadir', code: 'AGA' },
  { id: 6, name: 'Fès', code: 'FEZ' },
  { id: 7, name: 'Meknes', code: 'MKN' },
  { id: 8, name: 'Essaouira', code: 'ESS' },
  { id: 9, name: 'Ouarzazate', code: 'OZZ' },
  { id: 10, name: 'Chefchaouen', code: 'CHF' }
];

// ==================== Car Rental Agencies ====================
export const AGENCIES = [
  { id: 1, name: 'YaanExpress', rating: 4.6, reviews: 128, logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXiPbbhrkEthJsZPyMbxa7-XDekeQnPG-7sNkB331DhdKUBP29kizQlitiGzXcX6gk8JMxzQ3F4cUodyTcnC5B7oc8HrKrWNawMbwFjIEzIese5CZ6koOn5A_S5IBpysiusNIr3cC8UZVtxpXsKXPHN309NSKS8muasgWpMnWoZiIAOsA5UF_ZEuIaZIqnDbWwIGpLbwMgdPdTkCdq2su6gJdjQjLWuPFV35t03Jl9mOLFCd2IiYnnkL7McR0OLYvOvoC2JpH3nbk' },
  { id: 2, name: 'Budget Maroc', rating: 4.8, reviews: 85, logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpjvev7CJqi2xQx96yE4ajFbbdd1ldwEGIerRjHFEx7ggIeb9NDCmfuEX7SJeiN_i7q-yyqkbOr-FdfLJBpf1uWHzHmKQQ_80yFiH338905sQYMFULfayIu-XxUfdMFMgbgOpDQ7Add6Yrl70KSnLu001ZomtUZlWnB5Y6k17hhFG-qC7oLquetXGkp_Yvw1WJOcl8POgEReug0HCfeQ_oiuYkGLyxLPcM1Phcm6eBjhngBUUmPv3RtjzkvpnW3IbkPe9EWnf0Rhs' },
  { id: 3, name: 'Hertz Casa', rating: 4.9, reviews: 42, logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdWxYKeE-KB-je_dag2S5zmOpZmZb91GZFZL4XUwrXsF59lX8rnRJDEtbyx0p3g-lw4AdP7p6RX7XnmQt82zHtK1-xu5e0N0G2msmr9WwhN7f6ZUFB_4VtSE7coikcas3r1cInSp9vpyRG5XAkazJYyR2tq-v7TgpTR-iif4FHfu7_1q-cFood_oSwE9g8cXjNQKjvbX-mYW2UH7MItUQIVBJiPaoR4vkG8HPTcmqy-fJBKtEImoFRBJre4_FgM6SRDs5HcXCfK0M' },
  { id: 4, name: 'Sixt Rabat', rating: 4.7, reviews: 156, logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpjvev7CJqi2xQx96yE4ajFbbdd1ldwEGIerRjHFEx7ggIeb9NDCmfuEX7SJeiN_i7q-yyqkbOr-FdfLJBpf1uWHzHmKQQ_80yFiH338905sQYMFULfayIu-XxUfdMFMgbgOpDQ7Add6Yrl70KSnLu001ZomtUZlWnB5Y6k17hhFG-qC7oLquetXGkp_Yvw1WJOcl8POgEReug0HCfeQ_oiuYkGLyxLPcM1Phcm6eBjhngBUUmPv3RtjzkvpnW3IbkPe9EWnf0Rhs' },
  { id: 5, name: 'Europcar', rating: 4.5, reviews: 73, logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpjvev7CJqi2xQx96yE4ajFbbdd1ldwEGIerRjHFEx7ggIeb9NDCmfuEX7SJeiN_i7q-yyqkbOr-FdfLJBpf1uWHzHmKQQ_80yFiH338905sQYMFULfayIu-XxUfdMFMgbgOpDQ7Add6Yrl70KSnLu001ZomtUZlWnB5Y6k17hhFG-qC7oLquetXGkp_Yvw1WJOcl8POgEReug0HCfeQ_oiuYkGLyxLPcM1Phcm6eBjhngBUUmPv3RtjzkvpnW3IbkPe9EWnf0Rhs' }
];

// ==================== Car Fleet ====================
export const CARS = [
  {
    id: 1,
    name: 'Dacia Duster',
    category: 'SUV',
    fuel: 'Diesel',
    transmission: 'Manuelle',
    seats: 5,
    luggage: 2,
    ac: true,
    doors: 4,
    features: ['USB', 'Aux', 'Bluetooth'],
    pricePerDay: 450,
    agencyId: 1,
    rating: 4.6,
    reviews: 128,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCa1IYh2uD7kzyq-zvR-_rDjAd5aGt12GNTlDSlSeMF3_cllG8DOwpZ8GgHz3uB57NXM9KtQ9txaTCuyCNbaHmf7WQjAXQzcvPTi-aH49Ji5VTNLQ-9NvE7_LqGH31yCPuAh2AdwnLJFk9CP_ueeCeti85P6lrK6pYlBncewp6AEQBv9YTVWsI9Si6dX8rArSIhiJACOZvYbK-fyW1inD9CI9TIHcCA29UZZYh_FaFVxzZuQnoZUMKPUfalKgVfP2tg-KN6lmtuieU'
  },
  {
    id: 2,
    name: 'Renault Clio 5',
    category: 'CITADINE',
    fuel: 'Diesel',
    transmission: 'Manuelle',
    seats: 5,
    luggage: 1,
    ac: true,
    doors: 4,
    features: ['USB', 'Bluetooth'],
    pricePerDay: 295,
    agencyId: 2,
    rating: 4.8,
    reviews: 85,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCy8j9tBC5Pw1wTB2vDvVqNHAPbNyxEXpOiOoMym6G7_s1_aRp6uJPD2kjxMlDjXC2V0C10jdEFciuP3OL-bsZl2IULhTbiN35U1n1T_whq0nRd7WYTNp-DQNrVZBr2h0ZOSxxPSNq8nLwPMgzM4wOyQM841DmPeUgtLYOX0-Tb3_4XxXFp7vhBXzNsclDbqm0QLehPjD6KJQ-mCsor77ONJlPnnAaOkknFnopvaOiccPu6N7aRNW818Fio9YFfLLfUvBgBL737TiI'
  },
  {
    id: 3,
    name: 'VW Tiguan R-Line',
    category: 'PREMIUM SUV',
    fuel: 'Diesel',
    transmission: 'Automatique',
    seats: 5,
    luggage: 3,
    ac: true,
    doors: 4,
    features: ['USB', 'Aux', 'Bluetooth', 'Panoramique'],
    pricePerDay: 650,
    agencyId: 3,
    rating: 4.9,
    reviews: 42,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0HYfZOVfY_--2PCLOAUmWdE71rQs88zK66pL6rK3sMYXlTfeFsqWgppo7rrL3DqKrlbt7JgiR7pIeEyRkVkeRJpKqZ5C1g6pSofHDBtpb58QIST5Pci5CWi_vQIMSPPjMgAnoDGBmkCafk84EFezrcllW82PNBns0Gwal7fxGye5Gn7l9zGI6Fw6aHLyP_nX9hs7cmWry7W6pBdRHDI-VK4C7LRxgfOQ9Icyxwutiuf7SvqrT0k3qYIoiT6bjkhgfNK1d-R25ffc'
  },
  {
    id: 4,
    name: 'Toyota Corolla',
    category: 'BERLINE',
    fuel: 'Essence',
    transmission: 'Manuelle',
    seats: 5,
    luggage: 2,
    ac: true,
    doors: 4,
    features: ['USB', 'Bluetooth'],
    pricePerDay: 380,
    agencyId: 4,
    rating: 4.7,
    reviews: 156,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAL52Uo5lvT5DYVYyoNc3flOEK-LxPh0VGdK8lSQT3bDIDn08vP6Sn3mfjfT9gWSNBJAwc4MReFcaho7Vnkl6uhTyjqVZ17MfpQ249klyEAWvuhuZ0ixSqroFuY4xRNq9eXVWj4TIU6LgGVZVJhW18p0l1glNt_XAYsJUjCJ7cXT99V2CFLo3Rh0-9lO8MW3AZMayuZopAZ16HaUc8_-CbVgcwPZh6vqqStQjSqdShluW1fKLs_1Y7Oi1SCt3PPdSiHAVDYSBdc3fI'
  },
  {
    id: 5,
    name: 'Hyundai i10',
    category: 'CITADINE',
    fuel: 'Essence',
    transmission: 'Manuelle',
    seats: 5,
    luggage: 1,
    ac: true,
    doors: 4,
    features: ['Bluetooth'],
    pricePerDay: 220,
    agencyId: 5,
    rating: 4.5,
    reviews: 73,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDe0DKRlfZGz_rvfdpnH1AvyXVDOmXGNal_EswvK7B8wRFQK8m43m0AgffdUAPHK4rMnPcXMbTPIdLLwSey7_NAok6-QmWcInkb2W2PF5FVkJc4Ww1Tr4U-3IG1aJ2wyK6ebSPowNSWNl0VFo3ejaMcmLBJCrp_MOzlvARRicZ1XYSHuaBhvCCOAf2VH3qszvBSwueFLo1Z8Azlkhcqe18K3_baLSfS-PwaIOgSh7oGHhqCu8vm5cks_FxDdGZUnYFazV2B8w6e83w'
  },
  {
    id: 6,
    name: 'Dacia Logan',
    category: 'BERLINE',
    fuel: 'Diesel',
    transmission: 'Manuelle',
    seats: 5,
    luggage: 2,
    ac: true,
    doors: 4,
    features: ['USB', 'Aux'],
    pricePerDay: 270,
    agencyId: 1,
    rating: 4.6,
    reviews: 98,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDecMFZVppD80hz-HKVygcXMeI-jgviGML1aXy9z8HBx-dV_iUTg44NWBR6MyrJpM7nHN-WXVS8jjScOtklpkgX0OuSG7bzn4NmnaLjLwH7WJ_eWUlLBXKCaob11hvU-aJWqCTJoQ0JpU8SGhRsZ-fodQAXyi9qGHF2mTb7h44ukBNuAFKFGad5dpeCjlsCgAzdC5MW1Yl0-3kBLJrFjT943Es11WvAezmQCSL_dShYX-k1vrwIsG8irFNswjSFV3EYVmdN0JyMmHc'
  },
  {
    id: 7,
    name: 'Peugeot 308',
    category: 'BERLINE SPORT',
    fuel: 'Diesel',
    transmission: 'Automatique',
    seats: 5,
    luggage: 2,
    ac: true,
    doors: 4,
    features: ['USB', 'Aux', 'Bluetooth', 'Climatisation Tri-Zone'],
    pricePerDay: 520,
    agencyId: 2,
    rating: 4.7,
    reviews: 112,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCy8j9tBC5Pw1wTB2vDvVqNHAPbNyxEXpOiOoMym6G7_s1_aRp6uJPD2kjxMlDjXC2V0C10jdEFciuP3OL-bsZl2IULhTbiN35U1n1T_whq0nRd7WYTNp-DQNrVZBr2h0ZOSxxPSNq8nLwPMgzM4wOyQM841DmPeUgtLYOX0-Tb3_4XxXFp7vhBXzNsclDbqm0QLehPjD6KJQ-mCsor77ONJlPnnAaOkknFnopvaOiccPu6N7aRNW818Fio9YFfLLfUvBgBL737TiI'
  },
  {
    id: 8,
    name: 'Mercedes-Benz C-Class',
    category: 'LUXE',
    fuel: 'Diesel',
    transmission: 'Automatique',
    seats: 5,
    luggage: 3,
    ac: true,
    doors: 4,
    features: ['USB', 'Aux', 'Bluetooth', 'Sièges Chauffants', 'Panoramique'],
    pricePerDay: 950,
    agencyId: 3,
    rating: 4.9,
    reviews: 45,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0HYfZOVfY_--2PCLOAUmWdE71rQs88zK66pL6rK3sMYXlTfeFsqWgppo7rrL3DqKrlbt7JgiR7pIeEyRkVkeRJpKqZ5C1g6pSofHDBtpb58QIST5Pci5CWi_vQIMSPPjMgAnoDGBmkCafk84EFezrcllW82PNBns0Gwal7fxGye5Gn7l9zGI6Fw6aHLyP_nX9hs7cmWry7W6pBdRHDI-VK4C7LRxgfOQ9Icyxwutiuf7SvqrT0k3qYIoiT6bjkhgfNK1d-R25ffc'
  }
];

// ==================== Car Finder ====================
export function getCarById(carId) {
  return CARS.find(car => car.id === parseInt(carId));
}

export function searchCars(filters = {}) {
  let results = [...CARS];

  if (filters.priceMax) {
    results = results.filter(car => car.pricePerDay <= filters.priceMax);
  }
  if (filters.fuel) {
    results = results.filter(car => car.fuel === filters.fuel);
  }
  if (filters.transmission) {
    results = results.filter(car => car.transmission === filters.transmission);
  }
  if (filters.category) {
    results = results.filter(car => car.category === filters.category);
  }
  if (filters.agencyId) {
    results = results.filter(car => car.agencyId === filters.agencyId);
  }

  return results;
}

// ==================== Agency Finder ====================
export function getAgencyById(agencyId) {
  return AGENCIES.find(agency => agency.id === parseInt(agencyId));
}

// ==================== City Finder ====================
export function getCityByName(name) {
  return MOROCCAN_CITIES.find(city => city.name.toLowerCase() === name.toLowerCase());
}
