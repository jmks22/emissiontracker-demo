import React from 'react';
import {
  IonPopover,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  useIonRouter
} from '@ionic/react';
import { close } from 'ionicons/icons';
import '../../theme/general.scss';

interface UserPopoverProps {
  isOpen: boolean;
  event: Event | undefined;
  onDidDismiss: () => void;
  userName: string;
}

const UserPopover: React.FC<UserPopoverProps> = ({ isOpen, event, onDidDismiss, userName }) => {
  const router = useIonRouter();

  const handleProfileClick = () => {
    onDidDismiss(); // close the popover first
    router.push('/profile', 'forward'); // then navigate
  };

  return (
    <IonPopover isOpen={isOpen} event={event} onDidDismiss={onDidDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{userName}</IonTitle>
          <IonButtons slot="end">
            <IonButton fill="clear" color="dark" onClick={onDidDismiss}>
              <IonIcon icon={close} slot="icon-only" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonItem lines="none" button detail={false} onClick={handleProfileClick}>
          <IonLabel>User Profile</IonLabel>
        </IonItem>

        <IonButton
          expand="block"
          fill="outline"
          color="danger"
          onClick={() => alert('Sign out')}
          style={{ marginTop: '16px' }}
        >
          Sign Out
        </IonButton>
      </IonContent>
    </IonPopover>
  );
};

export default UserPopover;
