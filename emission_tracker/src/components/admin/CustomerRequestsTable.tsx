import React, { useEffect, useState } from 'react';
import { IonGrid, IonRow, IonCol, IonIcon } from '@ionic/react';
import { createOutline } from 'ionicons/icons';
import '../../theme/general.scss';
import axios from 'axios';
import './CustomerRequestsTable.scss';
import OverrideRequest from '../pop-ups/OverrideRequest';

interface Request {
  name: string;
  requestDate: string;
  dateRange: string;
  fileType: string;
  requester: string;
  status: string;
}

const CustomerRequestsTable: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const openPopup = (request: Request) => {
    setSelectedRequest(request);
    setShowPopup(true);
  };

  useEffect(() => {
    axios.get('http://localhost:4000/api/customer-requests')
      .then((res) => setRequests(res.data))
      .catch((err) => console.error('Failed to fetch requests:', err));
  }, []);

  return (
    <div className="customer-table-container">
      <h2 className="table-title">Requests</h2>
      <IonGrid className="table">
        <IonRow className="header-row">
          <IonCol>Name</IonCol>
          <IonCol>Request Date</IonCol>
          <IonCol>Date Range</IonCol>
          <IonCol>File Type</IonCol>
          <IonCol>Requester</IonCol>
          <IonCol>Status</IonCol>
        </IonRow>
        {requests.map((row, index) => (
          <IonRow key={index} className="data-row">
            <IonCol>{row.name}</IonCol>
            <IonCol>{row.requestDate}</IonCol>
            <IonCol>{row.dateRange}</IonCol>
            <IonCol>{row.fileType}</IonCol>
            <IonCol>{row.requester}</IonCol>
            <IonCol className={`status ${row.status?.toLowerCase() || 'unknown'}`}>
              {row.status}
              <IonIcon icon={createOutline} className="edit-icon" onClick={() => openPopup(row)} />
            </IonCol>
          </IonRow>
        ))}
      </IonGrid>

      <OverrideRequest
        isOpen={showPopup}
        closePopup={() => setShowPopup(false)}
        request={selectedRequest}
      />
    </div>
  );
};

export default CustomerRequestsTable;
