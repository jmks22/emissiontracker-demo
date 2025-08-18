import { useState, useEffect } from 'react';
import { estimateEmissions, VehicleType, Emissions } from '../utils/emissions';

interface TripRaw {
  id: string;
  device: { id: string };
  driver: string;
  start: string;
  stop: string;
  distance: number;
  averageSpeed: number;
  drivingDuration: string;
  maximumSpeed: number;
  engineHours: number;
}

interface DeviceRaw {
  id: string;
  name?: string;
  licensePlate: string;
}

interface UserRaw {
  id: string;
  firstName: string;
  lastName: string;
  isDriver: boolean;
}

export interface TripForTable {
  name: string;
  date: string;
  licensePlate: string;
  distance: string;
  drivingDuration: string;
  CO: string;
  CO2: string;
  HC: string;
  NOx: string;
  PM: string;
  driver: string;
  start: string;
  stop: string;
  averageSpeed: string;
  maximumSpeed: string;
  engineHours: string;
  vehicleType: VehicleType;
  rawStart: string;
}

export function useGeotabData() {
  const [trips, setTrips] = useState<TripForTable[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchAll() {
      try {
        const [tripsRes, devicesRes, usersRes] = await Promise.all([
          fetch('/api/trips').then((r) => r.json()) as Promise<TripRaw[]>,
          fetch('/api/devices').then((r) => r.json()) as Promise<DeviceRaw[]>,
          fetch('/api/users').then((r) => r.json()) as Promise<UserRaw[]>,
        ]);

        const deviceMap = new Map<string, DeviceRaw>();
        devicesRes.forEach((d) => deviceMap.set(d.id, d));
        const userMap = new Map<string, UserRaw>();
        usersRes.forEach((u) => userMap.set(u.id, u));

        const sortedTrips = tripsRes.sort(
          (a, b) => new Date(b.start).getTime() - new Date(a.start).getTime()
        );

        const flatTrips: TripForTable[] = sortedTrips.map((trip) => {
          const idSuffix = trip.id.slice(-3);
          const tripName = `#${idSuffix}`;

          const device = deviceMap.get(trip.device.id);
          let licensePlate = '–';
          let driverName = '–';

          let vehicleType: VehicleType = 'light';
          if (device && device.name && device.name.toLowerCase().includes('heavy')) {
            vehicleType = 'heavy';
          }

          if (device) {
            if (device.licensePlate && device.licensePlate.trim() !== '') {
              licensePlate = device.licensePlate;
            } else if (device.name && device.name.trim() !== '') {
              licensePlate = device.name;
            }
          }

          if (device && device.name === 'Vehicle 1') {
            driverName = 'Rohit R';
          } else if (userMap.has(trip.driver)) {
            const user = userMap.get(trip.driver)!;
            driverName = `${user.firstName} ${user.lastName}`.trim();
          }

          const emissions: Emissions = estimateEmissions(trip.distance, vehicleType);
          const dateOnly = new Date(trip.start).toLocaleDateString();
          const distanceStr = isNaN(trip.distance) ? '–' : `${trip.distance.toFixed(2)} km`;
          const drivingDuration = trip.drivingDuration ? trip.drivingDuration.split('.')[0] : '–';
          const CO = `${emissions.CO.toFixed(2)} g`;
          const CO2 = `${emissions.CO2.toFixed(2)} g`;
          const HC = `${emissions.HC.toFixed(2)} g`;
          const NOx = `${emissions.NOx.toFixed(2)} g`;
          const PM = `${emissions.PM.toFixed(2)} g`;

          const start = new Date(trip.start).toLocaleString();
          const stop = new Date(trip.stop).toLocaleString();
          const averageSpeed = isNaN(trip.averageSpeed) ? '–' : `${trip.averageSpeed.toFixed(1)} km/h`;
          const maximumSpeed = isNaN(trip.maximumSpeed) ? '–' : `${Math.round(trip.maximumSpeed)} km/h`;
          const engineHours = isNaN(trip.engineHours) ? '–' : trip.engineHours.toString();

          return {
            name: tripName,
            date: dateOnly,
            licensePlate,
            distance: distanceStr,
            drivingDuration,
            CO,
            CO2,
            HC,
            NOx,
            PM,
            driver: driverName,
            start,
            stop,
            averageSpeed,
            maximumSpeed,
            engineHours,
            vehicleType,
            rawStart: trip.start,
          };
        });

        if (isMounted) {
          setTrips(flatTrips);
          setLoading(false);
          setError(null);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || 'Unknown error');
          setLoading(false);
        }
      }
    }

    fetchAll();
    return () => {
      isMounted = false;
    };
  }, []);

  return { trips, loading, error };
}