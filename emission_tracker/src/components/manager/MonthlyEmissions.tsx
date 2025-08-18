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
import './MonthlyEmissions.scss';
import { useGeotabData } from '../../hooks/useGeotabData';

interface MonthlyEmissionsProps {
  linkTo: string;
}

const MonthlyEmissions: React.FC<MonthlyEmissionsProps> = ({ linkTo }) => {
  const { trips } = useGeotabData();

  const now = new Date();
  const monthName = now.toLocaleString('default', { month: 'long', year: 'numeric' });
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  const monthTrips = trips.filter(trip => {
    const d = new Date(trip.rawStart);
    return d.getFullYear() === currentYear && d.getMonth() === currentMonth;
  });

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
        <span className="title">Emissions – {monthName}</span>
        <span className="details">
          <a href={linkTo}>
            Details<IonIcon icon={chevronForwardOutline} className="details-icon" />
          </a>
        </span>
      </div>
      <IonCardContent>
        <IonGrid className="grid">
          <IonRow>
            <IonCol className="chemical co">
              <div className="amount">{formatMass(sumCO)}</div>
              <div className="name">Carbon Monoxide (CO)</div>
            </IonCol>
            <IonCol className="chemical co2">
              <div className="amount">{formatMass(sumCO2)}</div>
              <div className="name">Carbon Dioxide (CO₂)</div>
            </IonCol>
            <IonCol className="chemical hc">
              <div className="amount">{formatMass(sumHC)}</div>
              <div className="name">Hydrocarbons (HC)</div>
            </IonCol>
            <IonCol className="chemical nox">
              <div className="amount">{formatMass(sumNOx)}</div>
              <div className="name">Nitrogen Oxides (NOₓ)</div>
            </IonCol>
            <IonCol className="chemical pm">
              <div className="amount">{formatMass(sumPM)}</div>
              <div className="name">Particulate Matter (PM)</div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};

export default MonthlyEmissions;