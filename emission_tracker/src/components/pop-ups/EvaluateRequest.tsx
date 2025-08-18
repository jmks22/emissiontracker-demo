import React from 'react';
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonRow,
  IonCol
} from '@ionic/react';
import { close } from 'ionicons/icons';
import '../../theme/general.scss';
import './EvaluateRequest.scss'

interface EvaluateRequestProps {
  isOpen: boolean;
  closePopup: () => void;
  request: any;
}

const EvaluateRequest: React.FC<EvaluateRequestProps> = ({ isOpen, closePopup, request }) => {
  if (!request) return null;

   const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';

  function handleDownload() {
    const hardcodedId = "REQ-123"; 
    window.open(`${API}/api/emissions-download/${hardcodedId}/download`, '_blank');
  }

  return (
    <IonModal isOpen={isOpen} onDidDismiss={closePopup}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Evaluate Request</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={closePopup}>
              <IonIcon icon={close} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Date Range:</IonLabel>
          <IonInput readonly value={request.dateRange} />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">File Type:</IonLabel>
          <IonInput readonly value={request.fileType} />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Requester:</IonLabel>
          <IonInput readonly value={request.requester} />
        </IonItem>
        <IonItem lines="none">
          <IonLabel>Verify Generated Report: <a href="#" onClick={(e) => { e.preventDefault(); handleDownload(); }}>
              Download
            </a></IonLabel>
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

export default EvaluateRequest;