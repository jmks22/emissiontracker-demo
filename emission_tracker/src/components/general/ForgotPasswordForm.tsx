import React, { useState, useRef } from 'react';
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonIcon,
  IonContent,
  IonToolbar,
  IonTitle,
  IonLabel,
} from '@ionic/react';
import { close } from 'ionicons/icons';
import { OverlayEventDetail } from '@ionic/core/components';
import Input from './Input';
import '../../theme/general.scss';

interface ForgotPasswordFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ isOpen, onClose }) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const reset = () => setStep(1);

  const onWillDismiss = (event: CustomEvent<OverlayEventDetail>) => {
    reset();
    onClose();
  };

  const handleSubmit = () => {
    // Add password reset logic here
    console.log('Password reset requested for:', email, 'with code:', confirmationCode);
    modal.current?.dismiss();
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <IonLabel>
              Enter your email to receive a confirmation code
            </IonLabel>

            <Input
              label="Email"
              placeholder="name@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.detail.value!)}
            />

            <IonButton expand="block" onClick={next}>
              Send Code
            </IonButton>
          </div>
        );

      case 2:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <IonLabel>
              Enter the 6-digit code sent to {email}
            </IonLabel>

            <Input
              label="Confirmation Code"
              placeholder="123456"
              type="text"
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.detail.value!)}
            />

            <IonButton expand="block" onClick={next}>
              Verify Code
            </IonButton>
          </div>
        );

      case 3:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <IonLabel>
              Create a new password
            </IonLabel>

            <Input
              label="New Password"
              placeholder="••••••••"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.detail.value!)}
            />

            <Input
              label="Confirm Password"
              placeholder="••••••••"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.detail.value!)}
            />

            <IonButton expand="block" onClick={handleSubmit}>
              Reset Password
            </IonButton>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <IonModal isOpen={isOpen} ref={modal} onWillDismiss={onWillDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Reset Password</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => modal.current?.dismiss()}>
              <IonIcon slot="icon-only" icon={close} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {renderStep()}
      </IonContent>
    </IonModal>
  );
};

export default ForgotPasswordForm;
