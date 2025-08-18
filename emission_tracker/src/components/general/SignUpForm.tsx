import React from 'react';
import { 
  IonCard, 
  IonCardContent, 
  IonCardHeader, 
  IonCardTitle, 
  IonButton 
} from '@ionic/react';
import Input from './Input'; // Import the Input component
import '../../theme/general.scss';

const SignupForm: React.FC = () => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Sign Up</IonCardTitle>
      </IonCardHeader>
        
      <IonCardContent style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>       
        <Input
          label="Email"
          placeholder="name@example.com"
          type="text"
        />
        <Input
          label="Password"
          placeholder="••••••••"
          type="password"
        />
        <Input
          label="Company"
          placeholder="Cargo Transport"
          type="text"
        />

        <IonButton expand="block">Create Account</IonButton>

        <div style={{ textAlign: 'center'}}>
          Already have an account?{' '}
          <a href="/login" style={{ color: '#6e6e6e' }}>
            Login
          </a>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default SignupForm;
