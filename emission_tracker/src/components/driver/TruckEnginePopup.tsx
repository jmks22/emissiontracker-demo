import React from 'react';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonModal,
  IonIcon,
} from '@ionic/react';
import { arrowBack } from 'ionicons/icons';
import Input from '../general/Input';
import '../../theme/general.scss';

interface TruckEnginePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (engineData: any) => void;
}

const TruckEnginePopup: React.FC<TruckEnginePopupProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const handleSave = () => {
    // Add your save logic here
    onSave({});
    onClose();
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onClose}>
              <IonIcon icon={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>Edit Engine Information</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Input 
            label="Engine Displacement" 
            placeholder="Enter displacement in cc" 
            type="number" 
          />
          <Input 
            label="Emission Standard" 
            placeholder="e.g., Euro 6" 
            type="text" 
          />
          <Input 
            label="Model Year" 
            placeholder="Enter year" 
            type="number" 
          />
          <IonButton expand="block" onClick={handleSave}>
            Save Changes
          </IonButton>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default TruckEnginePopup;