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
import './DetailedFleetEmissions.scss';

const DetailedMonthlyEmissions: React.FC = () => {
  return (
    <IonCard className="card">
      <div className="card-header">
        <span className="title">April 2025</span>
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
            <IonCol className="fleet-details">
              <IonRow className="value fleet-name">VerdaMove</IonRow>
              <IonRow className="value no-trucks">3</IonRow>
              <IonRow className="value no-drivers">3</IonRow>
            </IonCol>
            <IonCol className="emissions-details">
              <IonRow className="label fleet-name">Carbon Dioxide (CO2):</IonRow>
              <IonRow className="label no-trucks">Nitrogen oxides (NOx):</IonRow>
              <IonRow className="label no-drivers">Particulate Matter (PM):</IonRow>
            </IonCol>
            <IonCol className="emissions-details">
              <IonRow className="value fleet-name">5,800 kg</IonRow>
              <IonRow className="value no-trucks">340 g</IonRow>
              <IonRow className="value no-drivers">45 g</IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};

export default DetailedMonthlyEmissions;
