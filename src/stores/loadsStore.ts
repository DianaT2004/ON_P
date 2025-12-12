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
  aiScannedLoads: string[];
  
  addLoad: (load: Load) => void;
  expressInterest: (loadId: string, driverId: string) => void;
  removeInterest: (loadId: string, driverId: string) => void;
  getInterestedDrivers: (loadId: string) => Driver[];
  scanAILoads: () => Promise<void>;
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

// Additional mock loads for AI scanning
const AI_GENERATED_LOADS: Load[] = [
  {
    id: 'load-004',
    title: 'Retail Goods - Batumi to Poti',
    origin: 'Batumi',
    destination: 'Poti',
    distance: 65,
    weight: 9900,
    payment: 280,
    pickupDate: '2024-12-16T08:00:00',
    deliveryDate: '2024-12-16T12:00:00',
    cargoType: 'Retail Goods',
    status: 'active',
    ownerId: 'own-003',
    ownerName: 'Retail Express',
    interestedDrivers: [],
    createdAt: '2024-12-15T13:00:00',
  },
  {
    id: 'load-005',
    title: 'Building Materials - Rustavi to Gori',
    origin: 'Rustavi',
    destination: 'Gori',
    distance: 95,
    weight: 17200,
    payment: 380,
    pickupDate: '2024-12-18T07:00:00',
    deliveryDate: '2024-12-18T14:00:00',
    cargoType: 'Building Materials',
    status: 'active',
    ownerId: 'own-004',
    ownerName: 'Construction Plus',
    interestedDrivers: [],
    createdAt: '2024-12-15T14:00:00',
  },
  {
    id: 'load-006',
    title: 'Food & Beverage - Kutaisi to Telavi',
    origin: 'Kutaisi',
    destination: 'Telavi',
    distance: 180,
    weight: 8500,
    payment: 620,
    pickupDate: '2024-12-19T09:00:00',
    deliveryDate: '2024-12-19T16:00:00',
    cargoType: 'Food & Beverage',
    status: 'active',
    ownerId: 'own-005',
    ownerName: 'Food Distributors',
    interestedDrivers: [],
    createdAt: '2024-12-15T15:00:00',
  },
  {
    id: 'load-007',
    title: 'Electronics - Tbilisi to Kutaisi',
    origin: 'Tbilisi',
    destination: 'Kutaisi',
    distance: 235,
    weight: 3200,
    payment: 520,
    pickupDate: '2024-12-17T10:00:00',
    deliveryDate: '2024-12-17T17:00:00',
    cargoType: 'Electronics',
    status: 'active',
    ownerId: 'own-006',
    ownerName: 'Tech Solutions',
    interestedDrivers: [],
    createdAt: '2024-12-15T16:00:00',
  },
  {
    id: 'load-008',
    title: 'Automotive Parts - Tbilisi to Zugdidi',
    origin: 'Tbilisi',
    destination: 'Zugdidi',
    distance: 340,
    weight: 19900,
    payment: 720,
    pickupDate: '2024-12-19T08:00:00',
    deliveryDate: '2024-12-19T18:00:00',
    cargoType: 'Automotive Parts',
    status: 'active',
    ownerId: 'own-007',
    ownerName: 'Auto Supply Co.',
    interestedDrivers: [],
    createdAt: '2024-12-15T17:00:00',
  },
];

export const useLoadsStore = create<LoadsState>((set, get) => ({
  loads: [], // Start empty - loads only appear after AI scan
  drivers: MOCK_DRIVERS,
  myInterestedLoads: [],
  aiScannedLoads: [],
  
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
  
  scanAILoads: async () => {
    // Simulate AI scanning delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    set((state) => {
      // Combine all loads for AI scan
      const allLoads = [...MOCK_LOADS, ...AI_GENERATED_LOADS];
      const newLoads = allLoads.filter(
        load => !state.loads.find(l => l.id === load.id)
      );
      
      return {
        loads: [...state.loads, ...newLoads],
        aiScannedLoads: [...state.aiScannedLoads, ...newLoads.map(l => l.id)],
      };
    });
  },
}));
