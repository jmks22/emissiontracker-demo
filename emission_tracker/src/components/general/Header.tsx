// src/components/Header.tsx
import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonRouterLink,
  IonButtons,
  IonButton,
  IonIcon,
} from '@ionic/react';
import { personCircle } from 'ionicons/icons';
import { useState } from 'react';
import UserPopover from './UserPopover';
import '../../theme/general.scss';
import '../../pages/general/Home.css';

const Header: React.FC = () => {
  const [showPopover, setShowPopover] = useState(false);
  const [popoverEvent, setPopoverEvent] = useState<MouseEvent | undefined>(undefined);

  const handleUserClick = (e: React.MouseEvent<HTMLIonButtonElement, MouseEvent>) => {
    e.persist();
    setPopoverEvent(e.nativeEvent);
    setShowPopover(true);
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <IonRouterLink routerLink="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
              Emission Tracker
            </IonRouterLink>
          </IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleUserClick}>
              <IonIcon icon={personCircle} size="large" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <UserPopover
        isOpen={showPopover}
        event={popoverEvent}
        onDidDismiss={() => setShowPopover(false)}
        userName="Johns Doe"
      />
    </>
  );
};

export default Header;
