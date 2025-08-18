import React, { useState } from 'react';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonChip,
  IonItem,
  IonLabel
} from '@ionic/react';
import '../../theme/general.scss';
import './CustomerReportRequestsTables.scss';
import { request } from 'http';

  export type TabType = 'Pending' | 'Approved' | 'Rejected';

  interface CustomerRequestTablesProps {
    selectedTab: TabType;
    setSelectedTab: React.Dispatch<React.SetStateAction<TabType>>;
  }
  
  const CustomerReportRequestsTables: React.FC<CustomerRequestTablesProps> = ({ selectedTab, setSelectedTab }) => {
    const tableTabs: TabType[] = ["Pending", "Approved", "Rejected"];

  const tableData: Record<TabType, any[]> = {
    Pending: [
        { requestID: "REQ-123", status: "Pending", name: "FY 2024-25", requestDate: "13/04/2025", dateRange: "Jul 2024 – Sep 2025", fileType: "CSV"},
        { requestID: "REQ-123", status: "Pending", name: "FY 2024-25", requestDate: "13/04/2025", dateRange: "Jul 2024 – Sep 2025", fileType: "CSV"},
        { requestID: "REQ-123", status: "Pending", name: "Q1 2025", requestDate: "12/04/2025", dateRange: "Jan 2025 – Mar 2025", fileType: "CSV"},
        { requestID: "REQ-123", status: "Pending", name: "Q1 2025", requestDate: "12/04/2025", dateRange: "Jan 2025 – Mar 2025", fileType: "CSV"},
        { requestID: "REQ-123", status: "Pending", name: "Q1 2025", requestDate: "12/04/2025", dateRange: "Jan 2025 – Mar 2025", fileType: "CSV"},
        { requestID: "REQ-123", status: "Pending", name: "Q1 2025", requestDate: "12/04/2025", dateRange: "Jan 2025 – Mar 2025", fileType: "CSV"},
        { requestID: "REQ-123", status: "Pending", name: "Q1 2025", requestDate: "12/04/2025", dateRange: "Jan 2022 – Sep 2023", fileType: "CSV"},
        { requestID: "REQ-123", status: "Pending", name: "FY 2022-23", requestDate: "12/04/2025", dateRange: "Jan 2022 – Sep 2023", fileType: "XLSX"},
        { requestID: "REQ-123", status: "Pending", name: "FY 2022-23", requestDate: "12/04/2025", dateRange: "Jan 2022 – Sep 2023", fileType: "CSV"},
        { requestID: "REQ-123", status: "Pending", name: "FY 2024-25", requestDate: "12/04/2025", dateRange: "Jul 2024 – Sep 2025", fileType: "CSV"},
        { requestID: "REQ-123", status: "Pending", name: "Q1 2020", requestDate: "12/04/2025", dateRange: "Jul 2024 – Sep 2025", fileType: "XLSX"},
        { requestID: "REQ-123", status: "Pending", name: "FY 2019-20", requestDate: "13/04/2025", dateRange: "Jul 2024 – Sep 2025", fileType: "CSV"}
    ],
    Approved: [
        { requestID: "REQ-123", status: "Approved", name: "Q1 2025", requestDate: "12/04/2025", dateRange: "Jan 2025 – Mar 2025", fileType: "CSV"},
        { requestID: "REQ-123", status: "Approved", name: "Q1 2025", requestDate: "12/04/2025", dateRange: "Jan 2022 – Sep 2023", fileType: "CSV"},
        { requestID: "REQ-123", status: "Approved", name: "FY 2022-23", requestDate: "12/04/2025", dateRange: "Jan 2022 – Sep 2023", fileType: "XLSX"},
        { requestID: "REQ-123", status: "Approved", name: "FY 2022-23", requestDate: "12/04/2025", dateRange: "Jan 2022 – Sep 2023", fileType: "CSV"},
        { requestID: "REQ-123", status: "Approved", name: "FY 2024-25", requestDate: "12/04/2025", dateRange: "Jul 2024 – Sep 2025", fileType: "CSV"},
        { requestID: "REQ-123", status: "Approved", name: "Q1 2020", requestDate: "12/04/2025", dateRange: "Jul 2024 – Sep 2025", fileType: "XLSX"},
        { requestID: "REQ-123", status: "Approved", name: "FY 2019-20", requestDate: "13/04/2025", dateRange: "Jul 2024 – Sep 2025", fileType: "CSV"}
    ],
    Rejected: [
        { requestID: "REQ-123", status: "Rejected", name: "FY 2022-23", requestDate: "12/04/2025", dateRange: "Jan 2022 – Sep 2023", fileType: "XLSX"},
        { requestID: "REQ-123", status: "Rejected", name: "FY 2022-23", requestDate: "12/04/2025", dateRange: "Jan 2022 – Sep 2023", fileType: "CSV"},
        { requestID: "REQ-123", status: "Rejected", name: "FY 2024-25", requestDate: "12/04/2025", dateRange: "Jul 2024 – Sep 2025", fileType: "CSV"},
        { requestID: "REQ-123", status: "Rejected", name: "Q1 2020", requestDate: "12/04/2025", dateRange: "Jul 2024 – Sep 2025", fileType: "XLSX"},
        { requestID: "REQ-123", status: "Rejected", name: "FY 2019-20", requestDate: "13/04/2025", dateRange: "Jul 2024 – Sep 2025", fileType: "CSV"}
    ],
  }

const tableFields = [
  { label: "Request ID", key: "requestID" },
  { label: "Status", key: "status"},
  { label: "Name", key: "name" },
  { label: "Request Date", key: "requestDate" },
  { label: "Date Range", key: "dateRange" },
  { label: "File Type", key: "fileType" },
  { label: "Action", key: "action" }
];

const tabHeaderFields: Record<TabType, { label: string; key: string }[]> = {
    Pending: tableFields,
    Approved: tableFields,
    Rejected: tableFields
  };

    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState<Record<string, string> | null>(null);
  
    const handleMoreInfo = (item: any) => {
      setModalData(item);
      setModalOpen(true);
    };

    const formatKey = (key: string) =>
      key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

     const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';

    function handleDownload(id: any) {
      window.open(`${API}/api/emissions-download/${id}/download`, '_blank'); }

  return (
    <>
      <div className="table-tabs">
        {tableTabs.map(tab => (
          <button
            key={tab}
            className={`table-tab ${selectedTab === tab ? "active" : ""}`}
            onClick={() => setSelectedTab(tab)}
          >{tab}</button>
        ))}
      </div>
      <div className="table-container">
        <IonGrid className="table">
          <IonRow className="header-row">
            <IonCol>Request ID</IonCol>
            <IonCol>Status</IonCol>
            <IonCol>Name</IonCol>
            <IonCol>Request Date</IonCol>
            <IonCol>Date Range</IonCol>
            <IonCol>File Type</IonCol>
            <IonCol>Action</IonCol>
          </IonRow>
          {tableData[selectedTab].map((item, index) => (
            <IonRow key={index} className="data-row">
              {tabHeaderFields[selectedTab].map((field, colIndex) => (
                <IonCol key={colIndex} data-label={field.label}>
                  {field.key === "action" ? (
                    <a href="./#" onClick={(e) => {
                      e.preventDefault();
                      handleMoreInfo(item);
                    }}>
                      More Info
                    </a>
                  ) : ["Pending", "Approved", "Rejected"].includes(item[field.key]) ? (
                    <IonChip color={
                      item[field.key] === "Pending" ? "warning" :
                      item[field.key] === "Approved" ? "success" :
                      "danger"
                    }>
                      {item[field.key]}
                    </IonChip>
                  ) : (
                    item[field.key] || "–"
                  )}
                </IonCol>
              ))}
            </IonRow>
          ))}
        </IonGrid>
      </div>
        <IonModal isOpen={modalOpen} onDidDismiss={() => setModalOpen(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Request Details</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
          
            {modalData && Object.entries(modalData).map(([key, value]) => (
              <IonItem lines="full" key={key}><strong>{formatKey(key)}:</strong>‎ {value} </IonItem>
            ))}
            
            <IonItem lines="full">
              <IonLabel> Download Your Emissions Report: <a onClick={() => handleDownload(modalData?.requestID)} >Download</a></IonLabel>
            </IonItem>
            <IonCol>
              <IonButton expand="block" onClick={() => setModalOpen(false)}>
                Close
              </IonButton>
            </IonCol>
          </IonContent>
        </IonModal>
      </>
  );
};

export default CustomerReportRequestsTables;