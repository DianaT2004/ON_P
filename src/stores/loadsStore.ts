import { create } from 'zustand';

export interface Load {
  id: string;
  title: string;
  origin: string;
  destination: string;
  distance: number;
  weight: number;
  payment: number;
  pickupDate: string;
  deliveryDate: string;
  cargoType: string;
  status: 'active' | 'in-progress' | 'completed';
  ownerId: string;
  ownerName: string;
  interestedDrivers: string[];
  createdAt: string;
}

export interface Driver {
  id: string;
  name: string;
  rating: number;
  completedLoads: number;
  truckType: string;
  location: string;
  distance: number;
  phone: string;
  verified: boolean;
  responseTime: string;
  aiMatchScore?: number;
}

interface LoadsState {
  loads: Load[];
  drivers: Driver[];
  myInterestedLoads: string[];
  
  addLoad: (load: Load) => void;
  expressInterest: (loadId: string, driverId: string) => void;
  removeInterest: (loadId: string, driverId: string) => void;
  getInterestedDrivers: (loadId: string) => Driver[];
}

const MOCK_DRIVERS: Driver[] = [
  {
    id: 'drv-001',
    name: 'Dachi Ghambashidze',
    rating: 4.8,
    completedLoads: 147,
    truckType: 'Refrigerated Truck',
    location: 'Tbilisi',
    distance: 5,
    phone: '+995 555 123 456',
    verified: true,
    responseTime: 'Within 2 hours',
  },
  {
    id: 'drv-002',
    name: 'Giorgi Beridze',
    rating: 4.6,
    completedLoads: 89,
    truckType: 'Flatbed Truck',
    location: 'Batumi',
    distance: 380,
    phone: '+995 555 234 567',
    verified: true,
    responseTime: 'Within 4 hours',
  },
  {
    id: 'drv-003',
    name: 'Nino Kharaishvili',
    rating: 4.9,
    completedLoads: 203,
    truckType: 'Box Truck',
    location: 'Kutaisi',
    distance: 235,
    phone: '+995 555 345 678',
    verified: true,
    responseTime: 'Within 1 hour',
  },
];

const MOCK_LOADS: Load[] = [
  {
    id: 'load-001',
    title: 'Fresh Produce - Tbilisi to Batumi',
    origin: 'Tbilisi',
    destination: 'Batumi',
    distance: 380,
    weight: 2500,
    payment: 850,
    pickupDate: '2024-12-20T08:00:00',
    deliveryDate: '2024-12-20T16:00:00',
    cargoType: 'Fresh Produce',
    status: 'active',
    ownerId: 'own-001',
    ownerName: 'Fresh Harvest Ltd.',
    interestedDrivers: ['drv-001', 'drv-003'],
    createdAt: '2024-12-15T10:00:00',
  },
  {
    id: 'load-002',
    title: 'Construction Materials - Tbilisi to Kutaisi',
    origin: 'Tbilisi',
    destination: 'Kutaisi',
    distance: 235,
    weight: 5000,
    payment: 650,
    pickupDate: '2024-12-21T07:00:00',
    deliveryDate: '2024-12-21T14:00:00',
    cargoType: 'Construction Materials',
    status: 'active',
    ownerId: 'own-001',
    ownerName: 'Fresh Harvest Ltd.',
    interestedDrivers: ['drv-002'],
    createdAt: '2024-12-15T11:00:00',
  },
  {
    id: 'load-003',
    title: 'Electronics - Batumi to Tbilisi',
    origin: 'Batumi',
    destination: 'Tbilisi',
    distance: 380,
    weight: 1200,
    payment: 780,
    pickupDate: '2024-12-22T09:00:00',
    deliveryDate: '2024-12-22T17:00:00',
    cargoType: 'Electronics',
    status: 'active',
    ownerId: 'own-002',
    ownerName: 'Tech Distributors',
    interestedDrivers: [],
    createdAt: '2024-12-15T12:00:00',
  },
];

export const useLoadsStore = create<LoadsState>((set, get) => ({
  loads: MOCK_LOADS,
  drivers: MOCK_DRIVERS,
  myInterestedLoads: [],
  
  addLoad: (load) => {
    set((state) => ({
      loads: [...state.loads, load],
    }));
  },
  
  expressInterest: (loadId, driverId) => {
    set((state) => ({
      loads: state.loads.map((load) =>
        load.id === loadId && !load.interestedDrivers.includes(driverId)
          ? { ...load, interestedDrivers: [...load.interestedDrivers, driverId] }
          : load
      ),
      myInterestedLoads: [...state.myInterestedLoads, loadId],
    }));
  },
  
  removeInterest: (loadId, driverId) => {
    set((state) => ({
      loads: state.loads.map((load) =>
        load.id === loadId
          ? {
              ...load,
              interestedDrivers: load.interestedDrivers.filter((id) => id !== driverId),
            }
          : load
      ),
      myInterestedLoads: state.myInterestedLoads.filter((id) => id !== loadId),
    }));
  },
  
  getInterestedDrivers: (loadId) => {
    const load = get().loads.find((l) => l.id === loadId);
    if (!load) return [];
    
    return get().drivers.filter((driver) =>
      load.interestedDrivers.includes(driver.id)
    );
  },
}));
