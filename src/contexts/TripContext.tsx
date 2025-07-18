import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Trip {
  id: string;
  userId: string;
  userName: string;
  tripType: 'offering' | 'looking';
  from: string;
  to: string;
  date: string;
  time: string;
  price: number;
  seats: number;
  availableSeats: number;
  notes: string;
  createdAt: string;
  car?: string;
}

interface TripContextType {
  trips: Trip[];
  addTrip: (trip: Omit<Trip, 'id' | 'createdAt' | 'availableSeats'>) => void;
  bookTrip: (tripId: string, seatsBooked: number) => void;
  getUserTrips: (userId: string) => Trip[];
  searchTrips: (filters: { from?: string; to?: string; date?: string; tripType?: 'offering' | 'looking' }) => Trip[];
}

const TripContext = createContext<TripContextType | undefined>(undefined);

// Mock initial trips for demonstration
const initialTrips: Trip[] = [
  {
    id: "1",
    userId: "demo1",
    userName: "Maria Garcia",
    tripType: "offering",
    from: "Madrid",
    to: "Barcelona",
    date: "2025-01-20",
    time: "09:00",
    price: 25,
    seats: 4,
    availableSeats: 3,
    car: "Toyota Corolla",
    notes: "Non-smoking car, music welcome!",
    createdAt: "2025-01-15T10:00:00Z"
  },
  {
    id: "2",
    userId: "demo2",
    userName: "Carlos López",
    tripType: "offering",
    from: "Valencia",
    to: "Madrid",
    date: "2025-01-21",
    time: "15:30",
    price: 20,
    seats: 3,
    availableSeats: 2,
    car: "Honda Civic",
    notes: "Pet-friendly, comfortable ride",
    createdAt: "2025-01-15T11:00:00Z"
  },
  {
    id: "3",
    userId: "demo3",
    userName: "Ana Martín",
    tripType: "offering",
    from: "Sevilla",
    to: "Granada",
    date: "2025-01-22",
    time: "08:00",
    price: 12,
    seats: 2,
    availableSeats: 1,
    car: "Renault Clio",
    notes: "Early departure, coffee stops included",
    createdAt: "2025-01-15T12:00:00Z"
  },
  {
    id: "4",
    userId: "demo4",
    userName: "Luis Rodriguez",
    tripType: "looking",
    from: "Madrid",
    to: "Valencia",
    date: "2025-01-23",
    time: "14:00",
    price: 15,
    seats: 1,
    availableSeats: 1,
    notes: "Looking for a comfortable ride, can share fuel costs",
    createdAt: "2025-01-15T13:00:00Z"
  }
];

export function TripProvider({ children }: { children: ReactNode }) {
  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    // Load trips from localStorage or use initial mock data
    const savedTrips = localStorage.getItem('hopon_trips');
    if (savedTrips) {
      setTrips(JSON.parse(savedTrips));
    } else {
      setTrips(initialTrips);
      localStorage.setItem('hopon_trips', JSON.stringify(initialTrips));
    }
  }, []);

  const addTrip = (tripData: Omit<Trip, 'id' | 'createdAt' | 'availableSeats'>) => {
    const newTrip: Trip = {
      ...tripData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      availableSeats: tripData.tripType === 'offering' ? tripData.seats : 1
    };

    const updatedTrips = [...trips, newTrip];
    setTrips(updatedTrips);
    localStorage.setItem('hopon_trips', JSON.stringify(updatedTrips));
  };

  const bookTrip = (tripId: string, seatsBooked: number = 1) => {
    const updatedTrips = trips.map(trip => {
      if (trip.id === tripId && trip.availableSeats >= seatsBooked) {
        return {
          ...trip,
          availableSeats: trip.availableSeats - seatsBooked
        };
      }
      return trip;
    });

    setTrips(updatedTrips);
    localStorage.setItem('hopon_trips', JSON.stringify(updatedTrips));
  };

  const getUserTrips = (userId: string) => {
    return trips.filter(trip => trip.userId === userId);
  };

  const searchTrips = (filters: { from?: string; to?: string; date?: string; tripType?: 'offering' | 'looking' }) => {
    return trips.filter(trip => {
      if (filters.from && !trip.from.toLowerCase().includes(filters.from.toLowerCase())) {
        return false;
      }
      if (filters.to && !trip.to.toLowerCase().includes(filters.to.toLowerCase())) {
        return false;
      }
      if (filters.date && trip.date !== filters.date) {
        return false;
      }
      if (filters.tripType && trip.tripType !== filters.tripType) {
        return false;
      }
      return true;
    });
  };

  return (
    <TripContext.Provider value={{ trips, addTrip, bookTrip, getUserTrips, searchTrips }}>
      {children}
    </TripContext.Provider>
  );
}

export function useTrips() {
  const context = useContext(TripContext);
  if (context === undefined) {
    throw new Error('useTrips must be used within a TripProvider');
  }
  return context;
}
