import React, { useEffect, useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
  IonPage,
  IonButtons,
  IonHeader,
  IonToolbar,
} from "@ionic/react";

import { MultiPageForm } from "../../components/driver/MultiPageForm";
import Greetings from "../../components/general/Greetings";
import { useUser } from "../../context/UserContext";
import Header from "../../components/general/Header";
import "../../theme/general.scss";

const DriverDashboardPage: React.FC = () => {
  const { firstName, setName, userType, setUserType } = useUser();
  const userTypes = ["Customer", "Driver", "Manager", "Admin"];
  const welcomeTime = ["Good Morning", "Good Afternoon", "Good Evening"];

  const currentDate = new Date();
  const currentTime = currentDate.getHours();

  let messageIndex = 0;
  if (currentTime >= 4 && currentTime < 12) {
    messageIndex = 0;
  } else if (currentTime >= 12 && currentTime < 17) {
    messageIndex = 1;
  } else {
    messageIndex = 2;
  }

  const [welcomeMessage] = useState<string>(welcomeTime[messageIndex]);

  useEffect(() => {
    // Update user details here after grabbing from db
    setName("Jeren");
    setUserType(userTypes[1]);
  }, [setName, setUserType]);

  return (
    <IonPage>
      <IonHeader>
        <Header />
        <IonToolbar className="welcome">
          <h1>
            👋 {welcomeMessage}, {firstName} - {userType} Dashboard
          </h1>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding dashboard">
        <IonCard>
          <IonCardContent>
            <IonItem lines="full" button detail={false}>
              <IonLabel>
                <h3>#A-1067</h3>
                <p>Type: Double A</p>
                <p>Expected Drops: 6</p>
                <p>Load Weight: 14,800 kg</p>
              </IonLabel>
              <MultiPageForm />
            </IonItem>

            <IonItem lines="full" button detail={false}>
              <IonLabel>
                <h3>#A-1026</h3>
                <p>Type: Double B</p>
                <p>Expected Drops: 8</p>
                <p>Load Weight: 9,340 kg</p>
              </IonLabel>
              <MultiPageForm />
            </IonItem>

            <IonItem lines="full" button detail={false}>
              <IonLabel>
                <h3>#A-1014</h3>
                <p>Type: Double A</p>
                <p>Expected Drops: 4</p>
                <p>Load Weight: 12,100 kg</p>
              </IonLabel>
              <MultiPageForm />
            </IonItem>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default DriverDashboardPage;
