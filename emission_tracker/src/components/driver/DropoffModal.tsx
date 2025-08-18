import React from 'react';
import {
  IonModal,
  IonContent,
  IonIcon,
  IonButton,
} from '@ionic/react';
import { close } from 'ionicons/icons';
import Input from '../general/Input';
import '../../theme/general.scss';

interface DropoffModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  selectedDropoff: {
    index: number;
    location: string;
    weight: string;
    fuelUsed: string;
  } | null;
  fuelUsed: string;
  weight: string;
  onFuelUsedChange: (value: string) => void;
  onWeightChange: (value: string) => void;
  onConfirm: () => void;
}

const DropoffModal: React.FC<DropoffModalProps> = ({
  isOpen,
  onDismiss,
  selectedDropoff,
  fuelUsed,
  weight,
  onFuelUsedChange,
  onWeightChange,
  onConfirm
}) => {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDismiss} style={{ '--border-radius': '16px' }}>
      <IonContent className="ion-padding">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          marginBottom: '24px' 
        }}>
          <div>
            <h1 style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              margin: '0 0 8px 0' 
            }}>
              Confirm Details
            </h1>
            <h2 style={{ 
              fontSize: '18px', 
              color: '#666', 
              margin: 0,
              fontWeight: 'normal' 
            }}>
              Drop-off {selectedDropoff?.index} Details
            </h2>
          </div>
          <IonIcon 
            icon={close} 
            onClick={onDismiss} 
            style={{ 
              fontSize: '24px', 
              cursor: 'pointer',
              padding: '8px'
            }} 
          />
        </div>
        
        <div style={{ marginBottom: '16px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            color: '#333',
            fontWeight: '500'
          }}>
            Drop-off Location
          </label>
          <Input
            value={selectedDropoff?.location}
            placeholder="Location"
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            color: '#333',
            fontWeight: '500'
          }}>
            Fuel Used (liters)
          </label>
          <Input
            type="number"
            value={fuelUsed}
            onChange={(e) => onFuelUsedChange(e.target.value)}
            placeholder="Enter fuel used"
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            color: '#333',
            fontWeight: '500'
          }}>
            Weight (kg)
          </label>
          <Input
            type="number"
            value={weight}
            onChange={(e) => onWeightChange(e.target.value)}
            placeholder="Enter weight"
          />
        </div>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '16px',
          marginTop: '32px' 
        }}>
          <IonButton 
            expand="block" 
            fill="outline"
            color="medium" 
            onClick={onDismiss}
            style={{ width: '45%', '--border-radius': '12px' }}
          >
            Cancel
          </IonButton>
          <IonButton 
            expand="block" 
            onClick={onConfirm}
            style={{ width: '45%', '--border-radius': '12px' }}
          >
            Confirm
          </IonButton>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default DropoffModal;