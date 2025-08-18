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

const DetailedMonthlyEmissions: React.FC = () => {
  return (
    <IonCard className="card">
      <div className="card-header">
        <span className="title">April 2025</span>
        <IonIcon icon={chevronForwardOutline} className="details-icon" />
      </div>
      <IonCardContent>
        <div className="info-grid">
          <div className="info-row">
            <span className="label">Fleet Name:</span>
            <span className="value">VerdaMove</span>
            <span className="label">Carbon Dioxide (CO₂):</span>
            <span className="value">5,800 kg</span>
          </div>
          <div className="info-row">
            <span className="label">Trucks:</span>
            <span className="value">3</span>
            <span className="label">Nitrogen Oxides (NOₓ):</span>
            <span className="value">340 g</span>
          </div>
          <div className="info-row">
            <span className="label">Drivers:</span>
            <span className="value">3</span>
            <span className="label">Particulate Matter (PM):</span>
            <span className="value">45 g</span>
          </div>
        </div>
      </IonCardContent>
    </IonCard>

  );
};

export default DetailedMonthlyEmissions;
