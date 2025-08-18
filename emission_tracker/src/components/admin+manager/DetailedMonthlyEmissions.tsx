import React from 'react';
import {
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon
} from '@ionic/react';
import { chevronForwardOutline } from 'ionicons/icons';
import '../../theme/general.scss';
import './DetailedMonthlyEmissions.scss';
import { useGeotabData } from '../../hooks/useGeotabData';
import { useTruckEmissions } from '../../hooks/useTruckEmissions';

const DetailedMonthlyEmissions: React.FC = () => {
  const { trips } = useGeotabData();
  const { trucks } = useTruckEmissions();
  const now = new Date();
  const monthName = now.toLocaleString('default', { month: 'long', year: 'numeric' });
  const fleetName = 'VerdaMove';
  const numTrucks = trucks.length;
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  const monthTrips = trips.filter(trip => {
    const d = new Date(trip.rawStart);
    return d.getFullYear() === currentYear && d.getMonth() === currentMonth;
  });

  const uniqueDrivers = new Set<string>();
  monthTrips.forEach(trip => {
    if (trip.driver !== '–') {
      uniqueDrivers.add(trip.driver);
    }
  });
  const numDrivers = uniqueDrivers.size;

  let sumCO = 0, sumCO2 = 0, sumHC = 0, sumNOx = 0, sumPM = 0;
  monthTrips.forEach(trip => {
    sumCO += parseFloat(trip.CO);
    sumCO2 += parseFloat(trip.CO2);
    sumHC += parseFloat(trip.HC);
    sumNOx += parseFloat(trip.NOx);
    sumPM += parseFloat(trip.PM);
  });

  const formatMass = (grams: number): string => {
    return grams >= 1000
      ? `${(grams / 1000).toFixed(2)} kg`
      : `${grams.toFixed(2)} g`;
  };

  return (
    <IonCard className="card">
      <div className="card-header">
        <span className="title">{monthName}</span>
        <IonIcon icon={chevronForwardOutline} className="details-icon" />
      </div>
      <IonCardContent>
        <IonGrid className="grid">
          <IonRow>
            <IonCol className="fleet-details">
              <IonRow className="label fleet-name">Fleet Name:</IonRow>
              <IonRow className="label no-trucks">Trucks:</IonRow>
              <IonRow className="label no-drivers">Drivers:</IonRow>
            </IonCol>
            <IonCol className="fleet-details values">
              <IonRow className="value fleet-name">{fleetName}</IonRow>
              <IonRow className="value no-trucks">{numTrucks}</IonRow>
              <IonRow className="value no-drivers">{numDrivers}</IonRow>
            </IonCol>
            <IonCol className="emissions-details">
              <IonRow className="label co">Carbon Monoxide (CO):</IonRow>
              <IonRow className="label co2">Carbon Dioxide (CO₂):</IonRow>
              <IonRow className="label hc">Hydrocarbons (HC):</IonRow>
              <IonRow className="label nox">Nitrogen Oxides (NOₓ):</IonRow>
              <IonRow className="label pm">Particulate Matter (PM):</IonRow>
            </IonCol>
            <IonCol className="emissions-details">
              <IonRow className="value co">{formatMass(sumCO)}</IonRow>
              <IonRow className="value co2">{formatMass(sumCO2)}</IonRow>
              <IonRow className="value hc">{formatMass(sumHC)}</IonRow>
              <IonRow className="value nox">{formatMass(sumNOx)}</IonRow>
              <IonRow className="value pm">{formatMass(sumPM)}</IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};

export default DetailedMonthlyEmissions;