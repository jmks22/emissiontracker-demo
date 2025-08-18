import React from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonItem,
  IonLabel,
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonBackButton,
  IonButtons,
} from "@ionic/react";

import Index from "../../components/general/Index";
import { MultiPageForm } from "../../components/driver/MultiPageForm";
import Header from "../../components/general/Header";
import "../../theme/general.scss";

const DriverHistoryPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <Header />
        <IonToolbar className="welcome">
          <h1>Delivery History</h1>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/driver/dashboard" text="Dashboard" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonCard>
          <IonCardContent>
            <IonItem lines="full" button detail={false}>
              <IonLabel>
                <h3>#A-1067</h3>
                <p>Type: Double A</p>
                <p>Expected Drops: 6</p>
                <p>Load Weight: 14,800 kg</p>
              </IonLabel>
              <MultiPageForm
                triggerButtonText="Update"
                triggerButtonStyle={{
                  fill: "solid",
                  size: "default",
                  expand: "block",
                }}
                modalTitle="Update Details"
              />
            </IonItem>

            <IonItem lines="full" button detail={false}>
              <IonLabel>
                <h3>#A-1026</h3>
                <p>Type: Double B</p>
                <p>Expected Drops: 8</p>
                <p>Load Weight: 9,340 kg</p>
              </IonLabel>
              <MultiPageForm
                triggerButtonText="Update"
                triggerButtonStyle={{
                  fill: "solid",
                  size: "default",
                  expand: "block",
                }}
                modalTitle="Update Details"
              />
            </IonItem>

            <IonItem lines="full" button detail={false}>
              <IonLabel>
                <h3>#A-1014</h3>
                <p>Type: Double A</p>
                <p>Expected Drops: 4</p>
                <p>Load Weight: 12,100 kg</p>
              </IonLabel>
              <MultiPageForm
                triggerButtonText="Update"
                triggerButtonStyle={{
                  fill: "solid",
                  size: "default",
                  expand: "block",
                }}
                modalTitle="Update Details"
              />
            </IonItem>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default DriverHistoryPage;
