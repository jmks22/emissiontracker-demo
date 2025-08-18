import React from 'react';
import { 
  IonCard, 
  IonCardContent, 
  IonCardHeader, 
  IonCardTitle, 
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
  IonChip
} from '@ionic/react';
import '../../theme/general.scss';


const CustomerDashboard: React.FC = () => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>👋 Good Morning, John</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonItem lines="full" button detail={false} >
          <IonLabel>
            <h3>FY 2024-25</h3>
            <p>Request Date: 13/04/2025</p>
            <p>Date Range: Jul 2024 to Sep 2025</p>
            <p>File Type: CSV</p>
          </IonLabel>
          <IonChip slot="end" color="warning">Pending</IonChip>
        </IonItem>
        <IonItem lines="full" button detail={false} >
          <IonLabel>
            <h3>Q1 2025</h3>
            <p>Request Date: 12/04/2025</p>
            <p>Date Range: Jan 2025 to Mar 2025</p>
            <p>Load Weight: 9,340 kg</p>
          </IonLabel>
          <IonChip slot="end" color="success">Approved</IonChip>
        </IonItem>
        <IonItem lines="full" button detail={false} >
          <IonLabel>
            <h3>FY 2022-23</h3>
            <p>Request Date: 12/04/2025</p>
            <p>Date Range: Jan 2022 to Sep 2023</p>
            <p>File Type: CSV</p>
          </IonLabel>
          <IonChip slot="end" color="danger">Rejected</IonChip>
        </IonItem>
      </IonCardContent>
      <IonItem lines="full" button detail={true}>
          <IonLabel>
            <h3>View all requests</h3>
          </IonLabel>
        </IonItem>
    </IonCard>
  );
};

export default CustomerDashboard;