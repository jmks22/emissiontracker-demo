import React from 'react';
import {
  IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon,
  IonContent, IonItem, IonLabel, IonInput, IonTextarea, IonRow, IonCol
} from '@ionic/react';
import { close } from 'ionicons/icons';
import './EvaluateRequest.scss'

interface OverrideRequestProps {
  isOpen: boolean;
  closePopup: () => void;
  request: any; // using any for now to avoid TS noise
}

const OverrideRequest: React.FC<OverrideRequestProps> = ({ isOpen, closePopup, request }) => {
  if (!isOpen) return null;

  const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';

  function handleDownload() {
    const hardcodedId = "REQ-123"; 
    window.open(`${API}/api/emissions-download/${hardcodedId}/download`, '_blank');
  }

  return (
    <IonModal isOpen={isOpen} onDidDismiss={closePopup}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Override Request</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={closePopup}>
              <IonIcon icon={close} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Date Range</IonLabel>
          <IonInput readonly value={request?.dateRange || '2025-01-01 to 2025-03-31'} />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">File Type</IonLabel>
          <IonInput readonly value={request?.fileType || 'PDF'} />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Requester</IonLabel>
          <IonInput readonly value={request?.requester || 'Placeholder User'} />
        </IonItem>

        <IonItem lines="none">
          <IonLabel>
            Verify Generated Report:{' '}
            <a href="#" onClick={(e) => { e.preventDefault(); handleDownload(); }}>
              Download
            </a>
          </IonLabel>
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Note</IonLabel>
          <IonTextarea placeholder="Why you made that reason?" />
        </IonItem>

        <IonRow className="ion-margin-top space-between">
          <IonCol>
            <IonButton expand="block" fill="outline" color="medium" onClick={closePopup}>Reject</IonButton>
          </IonCol>
          <IonCol>
            <IonButton expand="block" onClick={closePopup}>Approve</IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonModal>
  );
};

export default OverrideRequest;
