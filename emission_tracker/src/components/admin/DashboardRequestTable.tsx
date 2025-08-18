import React, { useEffect, useState } from 'react';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonIcon
} from '@ionic/react';
import { createOutline } from 'ionicons/icons';
import '../../theme/general.scss';
import './DashboardRequestTable.scss';
import OverrideRequest from '../pop-ups/OverrideRequest';
import axios from 'axios';

interface Request {
  name: string;
  requestDate: string;
  dateRange: string;
  fileType: string;
  status: string;
}

const RequestsTable: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [chosenRequest, setChosenRequest] = useState<Request | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const clickedEvaluate = (request: Request) => {
    setChosenRequest(request);
    setShowPopup(true);
  };

  useEffect(() => {
    axios.get('http://localhost:4000/api/customer-requests')
      .then(res => setRequests(res.data))
      .catch(err => console.error('Failed to fetch requests:', err));
  }, []);

  return (
    <>
      <div className="table-container">
        <IonGrid className="table">
          <IonRow className="header-row">
            <IonCol>Name</IonCol>
            <IonCol>Request Date</IonCol>
            <IonCol>Date Range</IonCol>
            <IonCol>File Type</IonCol>
            <IonCol>Status</IonCol>
          </IonRow>
          {requests.map((row, index) => (
            <IonRow key={index} className="data-row">
              <IonCol>{row.name}</IonCol>
              <IonCol>{row.requestDate}</IonCol>
              <IonCol>{row.dateRange}</IonCol>
              <IonCol>{row.fileType}</IonCol>
              <IonCol className={`status ${row.status.toLowerCase()}`}>
                {row.status}
                <IonIcon
                  icon={createOutline}
                  className="edit-icon"
                  onClick={() => clickedEvaluate(row)}
                />
              </IonCol>
            </IonRow>
          ))}
        </IonGrid>
      </div>

      <OverrideRequest
        isOpen={showPopup}
        closePopup={() => setShowPopup(false)}
        request={chosenRequest}
      />
    </>
  );
};

export default RequestsTable;
