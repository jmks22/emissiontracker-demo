import { useState, useEffect } from 'react';
import { estimateEmissions, VehicleType, Emissions } from '../utils/emissions';

interface TripRaw {
  device: { id: string };
  distance: number;
  start: string;
}

interface DeviceRaw {
  id: string;
  name?: string;
  licensePlate: string;
}

export interface TruckForTable {
  licensePlate: string;
  CO: string;
  CO2: string;
  HC: string;
  NOx: string;
  PM: string;
  vehicleId: string;
}

export function useTruckEmissions() {
  const [trucks, setTrucks] = useState<TruckForTable[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchAndAggregate() {
      try {
        const [tripsRes, devicesRes] = await Promise.all([
          fetch('/api/trips').then(r => r.json()) as Promise<TripRaw[]>,
          fetch('/api/devices').then(r => r.json()) as Promise<DeviceRaw[]>,
        ]);

        const deviceMap = new Map<string, DeviceRaw>();
        devicesRes.forEach(d => deviceMap.set(d.id, d));

        const aggMap = new Map<string, Emissions & { totalDistance: number }>();

        tripsRes.forEach(trip => {
          const device = deviceMap.get(trip.device.id);
          if (!device) return;

          const isHeavy = device.name?.toLowerCase().includes('heavy') ?? false;
          const type: VehicleType = isHeavy ? 'heavy' : 'light';

          const emissions: Emissions = estimateEmissions(trip.distance, type);

          if (!aggMap.has(trip.device.id)) {
            aggMap.set(trip.device.id, { 
              CO: emissions.CO, 
              CO2: emissions.CO2, 
              HC: emissions.HC, 
              NOx: emissions.NOx, 
              PM: emissions.PM,
              totalDistance: trip.distance
            });
          } else {
            const prev = aggMap.get(trip.device.id)!;
            aggMap.set(trip.device.id, {
              CO: prev.CO + emissions.CO,
              CO2: prev.CO2 + emissions.CO2,
              HC: prev.HC + emissions.HC,
              NOx: prev.NOx + emissions.NOx,
              PM: prev.PM + emissions.PM,
              totalDistance: prev.totalDistance + trip.distance
            });
          }
        });

        const result: TruckForTable[] = [];
        aggMap.forEach((vals, deviceId) => {
          const device = deviceMap.get(deviceId)!;
          const plate = device.licensePlate?.trim() !== '' 
            ? device.licensePlate 
            : (device.name ?? '–');
          result.push({
            licensePlate: plate,
            CO: `${vals.CO.toFixed(2)} g`,
            CO2: `${vals.CO2.toFixed(2)} g`,
            HC: `${vals.HC.toFixed(2)} g`,
            NOx: `${vals.NOx.toFixed(2)} g`,
            PM: `${vals.PM.toFixed(2)} g`,
            vehicleId: deviceId,
          });
        });

        if (isMounted) {
          setTrucks(result);
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

    fetchAndAggregate();
    return () => { isMounted = false; };
  }, []);

  return { trucks, loading, error };
}