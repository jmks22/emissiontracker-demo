import React from "react";
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonRow,
  IonCol,
  IonDatetime,
  IonDatetimeButton,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { close } from "ionicons/icons";
import "../../theme/general.scss";

interface CustomerReportRequestProps {
  isOpen: boolean;
  closePopup: () => void;
  request: any;
}

const CustomerReportRequest: React.FC<CustomerReportRequestProps> = ({
  isOpen,
  closePopup,
  request,
}) => {
  if (!request) return null;

  return (
    <IonModal isOpen={isOpen} onDidDismiss={closePopup}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Request Emissions Report for Your Deliveries</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={closePopup}>
              <IonIcon icon={close} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Date From:</IonLabel>
          <div className="ion-margin-bottom"></div>
          <IonDatetimeButton datetime="startDatetime" />
          <IonModal keepContentsMounted={true}>
            <IonDatetime
              id="startDatetime"
              presentation="date"
              showDefaultButtons={true}
            ></IonDatetime>
          </IonModal>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Date to:</IonLabel>
          <div className="ion-margin-bottom"></div>
          <IonDatetimeButton datetime="endDatetime" />
          <IonModal keepContentsMounted={true}>
            <IonDatetime
              id="endDatetime"
              presentation="date"
              showDefaultButtons={true}
            ></IonDatetime>
          </IonModal>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">File Type:</IonLabel>

          <IonSelect placeholder="CSV">
            <IonSelectOption value="csv">CSV</IonSelectOption>
            <IonSelectOption value="xlsx">XLSX</IonSelectOption>
            <IonSelectOption value="pdf">PDF</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonRow className="ion-margin-top space-between">
          <IonCol>
            <IonButton
              expand="block"
              fill="outline"
              color="medium"
              onClick={closePopup}
            >
              Cancel
            </IonButton>
          </IonCol>
          <IonCol>
            <IonButton expand="block" onClick={closePopup}>
              Confirm Request
            </IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonModal>
  );
};

export default CustomerReportRequest;
