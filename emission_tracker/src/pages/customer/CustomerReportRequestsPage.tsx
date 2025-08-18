import React, { useState } from "react";
import { useUser } from "../../context/UserContext";
import "../../theme/general.scss";
import "../general/Home.css";

import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonButton,
  useIonRouter,
} from "@ionic/react";

import Header from "../../components/general/Header";
import CustomerReportRequestsTables from "../../components/customer/CustomerReportRequestsTables";
import CustomerReportRequest from "../../components/pop-ups/CustomerReportRequest";
import type { TabType } from "../../components/customer/CustomerReportRequestsTables";

const CustomerReportRequestsPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<TabType>("Pending");
  const [modalOpen, setModalOpen] = useState(false);
  const [chosenRequest, setChosenRequest] = useState<any>(null);
  const [showPopup, setShowPopup] = useState(false);

  const dummyRequest = {
    dateRange: "",
    fileType: "",
  };

  const clickedEvaluate = (request: any) => {
    setChosenRequest(request);
    setShowPopup(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <Header />
        <IonToolbar className="welcome">
          <h1>Emission Report Requests</h1>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/customer/dashboard" text="Dashboard" />
          </IonButtons>
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
          <div className="section-title">Latest {selectedTab} Requests</div>

          <CustomerReportRequestsTables
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />

          <div className="table-footer">
            <div className="navigation">
              <button className="nav-btn back">&lt; Back</button>
              <span className="pages">
                <button className="page-btn active">1</button>
                <button className="page-btn">2</button>
                <button className="page-btn">3</button>
                <button className="page-btn">4</button>
                <button className="page-btn">5</button>
                <span className="ellipsis">...</span>
                <button className="page-btn">99</button>
              </span>
              <button className="nav-btn">Next &gt;</button>
            </div>

            <div className="results-count">Showing 8 of 1,000 results</div>
          </div>
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

export default CustomerReportRequestsPage;
