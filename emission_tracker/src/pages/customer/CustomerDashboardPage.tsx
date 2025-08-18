import React, { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import "../../theme/general.scss";
import "../general/Home.css";

import {
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonToolbar,
  IonButton,
  IonButtons,
} from "@ionic/react";

import Header from "../../components/general/Header";
import CustomerRequestsTable from "../../components/customer/CustomerReportRequestsTable";
import CustomerReportRequest from "../../components/pop-ups/CustomerReportRequest";

const CustomerDashboardPage: React.FC = () => {
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
  const [chosenRequest, setChosenRequest] = useState<any>(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Update user details here after grabbing from db
    setName("Tom");
    setUserType(userTypes[0]);
  }, [setName, setUserType]);

  const clickedEvaluate = (request: any) => {
    setChosenRequest(request);
    setShowPopup(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <Header />
        <IonToolbar className="welcome">
          <h1>
            👋 {welcomeMessage}, {firstName} - {userType} Dashboard
          </h1>
          <IonButtons slot="end">
            <div className="create">
              <button
                className="manual-button"
                color="dark"
                onClick={() => clickedEvaluate(IonButton)}
              >
                New Request
              </button>
            </div>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding dashboard">
        <div className="dashboard-wrapper">
          <div className="section-title">Latest Emission Report Requests</div>

          <CustomerRequestsTable />

          <a href="customer/reports" className="card-button">
            <IonCard className="card hover">
              <IonCardContent>
                <IonGrid className="grid">
                  <IonRow>
                    <IonCol className="view-all">
                      <div>
                        <p>View All Requests &gt;</p>
                      </div>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCardContent>
            </IonCard>
          </a>
        </div>
      </IonContent>

      <CustomerReportRequest
        isOpen={showPopup}
        closePopup={() => setShowPopup(false)}
        request={chosenRequest}
      />
    </IonPage>
  );
};

export default CustomerDashboardPage;
