import React from 'react';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonChip
} from '@ionic/react';
import '../../theme/general.scss';


const CustomerReportRequestsTable: React.FC = () => {

  const requests = [
    { name: "FY 2024-25", requestDate: "13/04/2025", dateRange: "Jul 2024 – Sep 2025", fileType: "CSV"},
    { name: "FY 2024-25", requestDate: "13/04/2025", dateRange: "Jul 2024 – Sep 2025", fileType: "CSV"},
    { name: "Q1 2025", requestDate: "12/04/2025", dateRange: "Jan 2025 – Mar 2025", fileType: "CSV"},
    { name: "Q1 2025", requestDate: "12/04/2025", dateRange: "Jan 2025 – Mar 2025", fileType: "CSV"},
    { name: "Q1 2025", requestDate: "12/04/2025", dateRange: "Jan 2025 – Mar 2025", fileType: "CSV"},
    { name: "Q1 2025", requestDate: "12/04/2025", dateRange: "Jan 2025 – Mar 2025", fileType: "CSV"},
    { name: "Q1 2025", requestDate: "12/04/2025", dateRange: "Jan 2022 – Sep 2023", fileType: "CSV"},
    { name: "FY 2022-23", requestDate: "12/04/2025", dateRange: "Jan 2022 – Sep 2023", fileType: "CSV"},
    { name: "FY 2022-23", requestDate: "12/04/2025", dateRange: "Jan 2022 – Sep 2023", fileType: "CSV"}
  ];

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
                <IonCol>
                  <IonChip color="success">Accepted</IonChip>
                </IonCol>
              </IonRow>
            ))}
          </IonGrid>
        </div>
    </>
  );
};                  


export default CustomerReportRequestsTable;
