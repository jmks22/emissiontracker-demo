import React, { useState } from 'react';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonChip,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton
} from '@ionic/react';
import '../../theme/general.scss';
import './EmissionsTable.scss';

export type TabType = 'Trips' | 'Drivers' | 'Trucks';

export interface TripForTable {
  name: string;
  date: string;
  licensePlate: string;
  distance: string;
  drivingDuration: string;
  CO: string;
  CO2: string;
  HC: string;
  NOx: string;
  PM: string;
  driver: string;
  start: string;
  stop: string;
  averageSpeed: string;
  maximumSpeed: string;
  engineHours: string;
  vehicleType: 'light' | 'heavy';
}

export interface TruckForTable {
  licensePlate: string;
  CO: string;
  CO2: string;
  HC: string;
  NOx: string;
  PM: string;
  vehicleId: string;
}

interface EmissionsTableProps {
  selectedTab: TabType;
  setSelectedTab: React.Dispatch<React.SetStateAction<TabType>>;
  tripRows: TripForTable[];
  truckRows: TruckForTable[];
}

const EmissionsTable: React.FC<EmissionsTableProps> = ({
  selectedTab,
  setSelectedTab,
  tripRows,
  truckRows
}) => {
  const tableTabs: TabType[] = ["Trips", "Drivers", "Trucks"];

  const tableData: Record<TabType, any[]> = {
    Trips: tripRows,
    Drivers: [
      { name: "Rohit R", acceleration: "Efficient", cruising: "Optimal", deceleration: "Inefficient", status: "Optimal" },
    ],
    Trucks: truckRows,
  };

  const tableFields: Record<TabType, { label: string; key: string }[]> = {
    Trips: [
      { label: "Date", key: "date" },
      { label: "License Plate", key: "licensePlate" },
      { label: "Distance", key: "distance" },
      { label: "Duration", key: "drivingDuration" },
      { label: "CO", key: "CO" },
      { label: "CO₂", key: "CO2" },
      { label: "HC", key: "HC" },
      { label: "NOₓ", key: "NOx" },
      { label: "PM", key: "PM" },
      { label: "Driver", key: "driver" },
      { label: "Action", key: "action" }
    ],
    Drivers: [
      { label: "Name", key: "name" },
      { label: "Acceleration", key: "acceleration" },
      { label: "Cruising", key: "cruising" },
      { label: "Deceleration", key: "deceleration" },
      { label: "Status", key: "status" },
      { label: "Action", key: "action" }
    ],
    Trucks: [
      { label: "License Plate", key: "licensePlate" },
      { label: "CO", key: "CO" },
      { label: "CO₂", key: "CO2" },
      { label: "HC", key: "HC" },
      { label: "NOₓ", key: "NOx" },
      { label: "PM", key: "PM" },
      { label: "Action", key: "action" }
    ]
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<Record<string, string> | null>(null);

  const handleMoreInfo = (item: any) => {
    setModalData(item);
    setModalOpen(true);
  };

  const formatKey = (key: string) =>
    key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

  return (
    <>
      <div className="table-tabs">
        {tableTabs.map(tab => (
          <button
            key={tab}
            className={`table-tab ${selectedTab === tab ? "active" : ""}`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="table-container">
        <IonGrid className="table">
          <IonRow className="header-row">
            {tableFields[selectedTab].map((field, index) => (
              <IonCol key={index}>{field.label}</IonCol>
            ))}
          </IonRow>
          {tableData[selectedTab].map((item, index) => (
            <IonRow key={index} className="data-row">
              {tableFields[selectedTab].map((field, colIndex) => (
                <IonCol key={colIndex} data-label={field.label} className={`col-${field.key}`}>
                  {field.key === "action" ? (
                    <a
                      href="./#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleMoreInfo(item);
                      }}
                    >
                      More Info
                    </a>
                  ) : ["Efficient", "Optimal", "Inefficient"].includes(item[field.key]) ? (
                    <IonChip
                      color={
                        item[field.key] === "Efficient"
                          ? "success"
                          : item[field.key] === "Optimal"
                          ? "warning"
                          : "danger"
                      }
                    >
                      {item[field.key]}
                    </IonChip>
                  ) : (
                    (item[field.key] as string) || "–"
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
            <IonTitle>Details</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          {modalData &&
            Object.entries(modalData).map(([key, value]) => (
              <p key={key}>
                <strong>{formatKey(key)}:</strong> {value}
              </p>
            ))}
          <IonButton expand="block" onClick={() => setModalOpen(false)}>
            Close
          </IonButton>
        </IonContent>
      </IonModal>
    </>
  );
};

export default EmissionsTable;