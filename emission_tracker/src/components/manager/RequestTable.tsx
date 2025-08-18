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
import EditEvaluation from '../pop-ups/EditEvaluation';

const RequestsTable: React.FC = () => {

  type TabType = 'Pending' | 'Approved' | 'Rejected';
  const tableTabs: TabType[] = ["Pending", "Approved", "Rejected"];
  const [selectedTab, setSelectedTab] = useState<TabType>('Pending');

  const tableData: Record<TabType, any[]> = {
    Pending: [
        { name: "FY 2024-25", requestDate: "13/04/2025", dateRange: "Jul 2024 – Sep 2025", fileType: "CSV", requester: "IKEA"},
        { name: "FY 2024-25", requestDate: "13/04/2025", dateRange: "Jul 2024 – Sep 2025", fileType: "CSV", requester: "Post"},
        { name: "Q1 2025", requestDate: "12/04/2025", dateRange: "Jan 2025 – Mar 2025", fileType: "CSV", requester: "Core Electronics"},
        { name: "Q1 2025", requestDate: "12/04/2025", dateRange: "Jan 2025 – Mar 2025", fileType: "CSV", requester: "IKEA"},
        { name: "Q1 2025", requestDate: "12/04/2025", dateRange: "Jan 2025 – Mar 2025", fileType: "CSV", requester: "Post"},
        { name: "Q1 2025", requestDate: "12/04/2025", dateRange: "Jan 2025 – Mar 2025", fileType: "CSV", requester: "Core Electronics"},
        { name: "Q1 2025", requestDate: "12/04/2025", dateRange: "Jan 2022 – Sep 2023", fileType: "CSV", requester: "IKEA"},
        { name: "FY 2022-23", requestDate: "12/04/2025", dateRange: "Jan 2022 – Sep 2023", fileType: "XLSX", requester: "Post"},
        { name: "FY 2022-23", requestDate: "12/04/2025", dateRange: "Jan 2022 – Sep 2023", fileType: "CSV", requester: "Core Electronics"},
        { name: "FY 2024-25", requestDate: "12/04/2025", dateRange: "Jul 2024 – Sep 2025", fileType: "CSV", requester: "IKEA"},
        { name: "Q1 2020", requestDate: "12/04/2025", dateRange: "Jul 2024 – Sep 2025", fileType: "XLSX", requester: "Post"},
        { name: "FY 2019-20", requestDate: "13/04/2025", dateRange: "Jul 2024 – Sep 2025", fileType: "CSV", requester: "Core Electronics"}
    ],
    Approved: [
        { name: "Q1 2025", requestDate: "12/04/2025", dateRange: "Jan 2025 – Mar 2025", fileType: "CSV", requester: "IKEA"},
        { name: "Q1 2025", requestDate: "12/04/2025", dateRange: "Jan 2022 – Sep 2023", fileType: "CSV", requester: "Post"},
        { name: "FY 2022-23", requestDate: "12/04/2025", dateRange: "Jan 2022 – Sep 2023", fileType: "XLSX", requester: "Core Electronics"},
        { name: "FY 2022-23", requestDate: "12/04/2025", dateRange: "Jan 2022 – Sep 2023", fileType: "CSV", requester: "IKEA"},
        { name: "FY 2024-25", requestDate: "12/04/2025", dateRange: "Jul 2024 – Sep 2025", fileType: "CSV", requester: "Post"},
        { name: "Q1 2020", requestDate: "12/04/2025", dateRange: "Jul 2024 – Sep 2025", fileType: "XLSX", requester: "Core Electronics"},
        { name: "FY 2019-20", requestDate: "13/04/2025", dateRange: "Jul 2024 – Sep 2025", fileType: "CSV", requester: "IKEA"}
    ],
    Rejected: [
        { name: "FY 2022-23", requestDate: "12/04/2025", dateRange: "Jan 2022 – Sep 2023", fileType: "XLSX", requester: "IKEA"},
        { name: "FY 2022-23", requestDate: "12/04/2025", dateRange: "Jan 2022 – Sep 2023", fileType: "CSV", requester: "Post"},
        { name: "FY 2024-25", requestDate: "12/04/2025", dateRange: "Jul 2024 – Sep 2025", fileType: "CSV", requester: "Core Electronics"},
        { name: "Q1 2020", requestDate: "12/04/2025", dateRange: "Jul 2024 – Sep 2025", fileType: "XLSX", requester: "IKEA"},
        { name: "FY 2019-20", requestDate: "13/04/2025", dateRange: "Jul 2024 – Sep 2025", fileType: "CSV", requester: "Post"}
    ],
  }

const tableFields = [
  { label: "Name", key: "name" },
  { label: "Request Date", key: "requestDate" },
  { label: "Date Range", key: "dateRange" },
  { label: "File Type", key: "fileType" },
  { label: "Requester", key: "requester" },
  { label: "Action", key: "action" }
];

const tabHeaderFields: Record<TabType, { label: string; key: string }[]> = {
    Pending: tableFields,
    Approved: tableFields,
    Rejected: tableFields
  };

  const [chosenRequest, setChosenRequest] = useState<any>(null);
  const [showPopup, setShowPopup] = useState(false);

  const [modalType, setModalType] = useState<'evaluate' | 'edit'>('evaluate');

  const clickedEvaluate = (request: any) => {
    setChosenRequest(request);
    setModalType('evaluate');
    setShowPopup(true);
  }

  const clickedEdit = (request: any) => {
    setChosenRequest(request);
    setModalType('edit');
    setShowPopup(true);
  }

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
            <IonCol>Name</IonCol>
            <IonCol>Request Date</IonCol>
            <IonCol>Date Range</IonCol>
            <IonCol>File Type</IonCol>
            <IonCol>Requester</IonCol>
            <IonCol>Action</IonCol>
          </IonRow>
          {tableData[selectedTab].map((item, index) => (
            <IonRow key={index} className="data-row">
              {tabHeaderFields[selectedTab].map((field, colIndex) => (
                <IonCol key={colIndex} data-label={field.label}>
                  {field.key === "action" ? (
                    selectedTab === "Pending" ? (
                      <IonButton onClick={() => clickedEvaluate(item)}>Evaluate</IonButton>
                    ) : (
                      <IonButton className="outline-button" onClick={() => clickedEdit(item)}>Edit</IonButton>
                    )
                  ) : (
                    item[field.key] || "–"
                  )}
                </IonCol>
              ))}
            </IonRow>
          ))}
        </IonGrid>
      </div>
      {modalType === 'evaluate' ? (
        <EvaluateRequest
          isOpen={showPopup}
          closePopup={() => setShowPopup(false)}
          request={chosenRequest}
        />
      ) : (
        <EditEvaluation
          isOpen={showPopup}
          closePopup={() => setShowPopup(false)}
          request={chosenRequest}
        />
      )}
    </>
  );
};

export default RequestsTable;
