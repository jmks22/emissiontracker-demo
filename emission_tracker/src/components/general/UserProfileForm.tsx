import React from 'react';
import { 
  IonCard, 
  IonCardContent, 
  IonCardHeader, 
  IonCardTitle, 
  IonButton,
} from '@ionic/react';
import Input from './Input'; // Import the Input component
import InputButton from './InputButton'; // Import the Input component
import ChangePassword from './ChangePassword'; // Import the ChangePassword component
import { Link } from 'react-router-dom'; // Import Link for navigation
import '../../theme/general.scss';

const UserProfileForm: React.FC = () => {
  return (
    <>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Details</IonCardTitle>
        </IonCardHeader>
          
        <IonCardContent style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>       
          <Input
            label="Email"
            placeholder="name@example.com"
            type="text"
          />
          <ChangePassword />
          <Input
            label="Company"
            placeholder="Cargo Transport"
            type="text"
          />

          <IonButton expand="block">Update Details</IonButton>
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default UserProfileForm;
