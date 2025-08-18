import React, { useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonText,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonModal,
  IonInput,
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonBackButton,
  IonButtons,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { hourglass, close } from "ionicons/icons";

import Input from "../../components/general/Input";
import DropoffModal from "../../components/driver/DropoffModal";
import { MultiPageForm } from "../../components/driver/MultiPageForm";
import Header from "../../components/general/Header";
import "../../theme/general.scss";

const dropoffLocations = [
  { title: "123 Main St, Springfield", weight: "150", fuelUsed: "10" },
  { title: "456 Elm St, Metropolis", weight: "200", fuelUsed: "15" },
  { title: "789 Oak Ave, Gotham", weight: "175", fuelUsed: "12" },
  { title: "789 Oak Ave, Gotham", weight: "180", fuelUsed: "13" },
  { title: "789 Oak Ave, Gotham", weight: "160", fuelUsed: "11" },
];

const DriverTimerPage: React.FC = () => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDropoff, setSelectedDropoff] = useState<{
    index: number;
    location: string;
    weight: string;
    fuelUsed: string;
  } | null>(null);
  const [fuelUsed, setFuelUsed] = useState("");
  const [weight, setWeight] = useState("");

  const handleDoneClick = (
    index: number,
    location: { title: string; weight: string; fuelUsed: string }
  ) => {
    setSelectedDropoff({
      index,
      location: location.title,
      weight: location.weight,
      fuelUsed: location.fuelUsed,
    });
    setFuelUsed(location.fuelUsed);
    setWeight(location.weight);
    setIsOpen(true);
  };

  const handleConfirm = () => {
    console.log("Confirmed:", { dropoff: selectedDropoff, fuelUsed, weight });
    setIsOpen(false);
  };

  const handleStopTrip = () => {
    history.push("/driver/dashboard");
  };

  return (
    <IonPage>
      <IonHeader>
        <Header />
        <IonToolbar className="welcome">
          <h1>Delivery Tracker</h1>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/driver/dashboard" text="Dashboard" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <>
          <IonCard className="ion-text-center">
            <IonCardHeader>
              <IonCardTitle>Tracking in Progress</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              <IonIcon
                icon={hourglass}
                style={{ fontSize: "52px", color: "#000" }}
              />

              <IonText>
                <h1
                  style={{
                    margin: "12px 0",
                    fontWeight: "bold",
                    color: "#000",
                    fontSize: "36px",
                  }}
                >
                  00:12:29
                </h1>
              </IonText>

              <IonText color="medium" style={{ fontSize: "14px" }}>
                Trip Duration
              </IonText>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "20px",
                  marginBottom: "8px",
                }}
              >
                <IonText>
                  <h4
                    style={{
                      margin: 0,
                      fontWeight: "bold",
                      color: "#000",
                      fontSize: "16px",
                    }}
                  >
                    Drop-off Locations
                  </h4>
                </IonText>
                <IonText>
                  <h4 style={{ margin: 0, fontSize: "16px" }}>
                    Total Transits: {dropoffLocations.length}
                  </h4>
                </IonText>
              </div>

              <div
                style={{
                  maxHeight: "230px",
                  overflowY: "auto",
                  marginTop: "8px",
                }}
              >
                <IonList>
                  {dropoffLocations.map((location, index) => (
                    <IonItem
                      key={index}
                      button
                      detail={false}
                      onClick={() =>
                        console.log(`Clicked Drop-off ${index + 1}`)
                      }
                    >
                      <IonLabel>
                        <h2>Drop-off {index + 1}</h2>
                        <p>{location.title}</p>
                      </IonLabel>
                      <IonButton
                        slot="end"
                        size="default"
                        fill="solid"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDoneClick(index + 1, location);
                        }}
                      >
                        Done
                      </IonButton>
                    </IonItem>
                  ))}
                </IonList>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  marginTop: "16px",
                }}
              >
                <MultiPageForm
                  triggerButtonText="More Details"
                  triggerButtonStyle={{
                    fill: "outline",
                    size: "default",
                    color: "medium",
                  }}
                  modalTitle="Update Details"
                />
                <IonButton
                  expand="block"
                  color="primary"
                  style={{ borderRadius: "12px" }}
                  onClick={handleStopTrip}
                >
                  Stop Trip
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>

          <DropoffModal
            isOpen={isOpen}
            onDismiss={() => setIsOpen(false)}
            selectedDropoff={selectedDropoff}
            fuelUsed={fuelUsed}
            weight={weight}
            onFuelUsedChange={setFuelUsed}
            onWeightChange={setWeight}
            onConfirm={handleConfirm}
          />
        </>
      </IonContent>
    </IonPage>
  );
};

export default DriverTimerPage;
