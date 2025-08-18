import React, { useState, useRef } from 'react';
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonFooter,
  IonLabel,
  IonIcon,
} from '@ionic/react';
import { close } from 'ionicons/icons';
import { OverlayEventDetail } from '@ionic/core/components';
import Input from './Input'; // Your custom input component
import ForgotPasswordForm from './ForgotPasswordForm';
import '../../theme/general.scss';

const ChangePassword: React.FC = () => {
  const modal = useRef<HTMLIonModalElement>(null);

  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Step state: 'auth' for authentication, 'change' for new password
  const [step, setStep] = useState<'auth' | 'change'>('auth');

  // Optional message display
  const [message, setMessage] = useState('');

  function handleAuthenticate() {
    // TODO: Add real authentication logic
    // If successful:
    setStep('change');
  }

  function handleSaveNewPassword() {
    // TODO: Add real password change logic
    modal.current?.dismiss();
    setMessage('Password successfully changed!');
  }

  function onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    setStep('auth'); // reset the step when modal closes
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <IonLabel>Password</IonLabel>
      <IonButton id="open-modal" expand="block" fill="outline" color="medium">
        Change Password
      </IonButton>
      <p>{message}</p>

      <IonModal ref={modal} trigger="open-modal" onWillDismiss={onWillDismiss}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>
              {step === 'auth' ? 'Enter Password' : 'Change Password'}
            </IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => modal.current?.dismiss()}>
                <IonIcon slot="icon-only" icon={close}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          {step === 'auth' ? (
            <Input
              label="Password"
              placeholder="••••••••"
              type="password"
              linkText="Forgotten Password?"
              onClick={() => setShowForgotPassword(true)}
            />
          ) : (
            <>
              <Input
                label="New Password"
                placeholder="New password"
                type="password"
              />
              <Input
                label="Confirm Password"
                placeholder="Confirm new password"
                type="password"
              />
            </>
          )}
        </IonContent>

        <IonFooter>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton fill="outline" onClick={() => modal.current?.dismiss()}>
                Cancel
              </IonButton>
            </IonButtons>
            <IonButtons slot="end">
              {step === 'auth' ? (
                <IonButton strong={true} fill="solid" onClick={handleAuthenticate}>
                  Authenticate
                </IonButton>
              ) : (
                <IonButton strong={true} fill="solid" onClick={handleSaveNewPassword}>
                  Save
                </IonButton>
              )}
            </IonButtons>
          </IonToolbar>
        </IonFooter>
      </IonModal>

      <ForgotPasswordForm 
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />
    </div>
  );
};

export default ChangePassword;
