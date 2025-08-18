import React, { useState } from 'react';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonButton
} from '@ionic/react';
import '../../theme/general.scss';
import './RequestTable.scss';
import EvaluateRequest from '../pop-ups/EvaluateRequest';

const SimpleRequestsTable: React.FC = () => {

  const requests = [
    { name: "FY 2024-25", requestDate: "13/04/2025", dateRange: "Jul 2024 – Sep 2025", fileType: "CSV", requester: "IKEA" },
    { name: "FY 2024-25", requestDate: "13/04/2025", dateRange: "Jul 2024 – Sep 2025", fileType: "CSV", requester: "Post" },
    { name: "Q1 2025", requestDate: "12/04/2025", dateRange: "Jan 2025 – Mar 2025", fileType: "CSV", requester: "Core Electronics" },
    { name: "Q1 2025", requestDate: "12/04/2025", dateRange: "Jan 2025 – Mar 2025", fileType: "CSV", requester: "IKEA" },
    { name: "Q1 2025", requestDate: "12/04/2025", dateRange: "Jan 2025 – Mar 2025", fileType: "CSV", requester: "Post" },
  ];

  const [chosenRequest, setChosenRequest] = useState<any>(null);
  const [showPopup, setShowPopup] = useState(false);

  const clickedEvaluate = (request: any) => {
    setChosenRequest(request);
    setShowPopup(true);
  }

  {/* TO DO - add Pending, Approved & Rejected tabs to table */}
  
  return (
    <>
        <div className="table-container">
          <IonGrid className="table">
            <IonRow className="header-row">
              <IonCol>Name</IonCol>
              <IonCol>Request Date</IonCol>
              <IonCol>Date Range</IonCol>
              <IonCol>File Type</IonCol>
              <IonCol>Requester</IonCol>
              <IonCol>Action</IonCol>
            </IonRow>
            {requests.map((row, index) => (
              <IonRow key={index} className="data-row">
                <IonCol data-label="Name">{row.name}</IonCol>
                <IonCol data-label="Request Date">{row.requestDate}</IonCol>
                <IonCol data-label="Date Range">{row.dateRange}</IonCol>
                <IonCol data-label="File Type">{row.fileType}</IonCol>
                <IonCol data-label="Requester">{row.requester}</IonCol>
                <IonCol data-label="Action">
                  <IonButton onClick={() => clickedEvaluate(row)}>Evaluate</IonButton>
                </IonCol>
              </IonRow>
            ))}
          </IonGrid>
        </div>
        <EvaluateRequest
          isOpen={showPopup}
          closePopup={() => setShowPopup(false)}
          request={chosenRequest}
        />
    </>
  );
};

export default SimpleRequestsTable;
