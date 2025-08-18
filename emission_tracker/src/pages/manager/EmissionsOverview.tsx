import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import '../../theme/general.scss';
import '../general/Home.css';
import './EmissionsOverview.scss';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar
} from '@ionic/react';
import Header from '../../components/general/Header';
import DetailedMonthlyEmissions from '../../components/admin+manager/DetailedMonthlyEmissions';
import EmissionsTable, { TabType, TripForTable, TruckForTable } from '../../components/admin+manager/EmissionsTable';
import CustomerReportRequest from '../../components/pop-ups/CustomerReportRequest';
import { useGeotabData } from '../../hooks/useGeotabData';
import { useTruckEmissions } from '../../hooks/useTruckEmissions';

const EmissionsOverview: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<TabType>("Trips");
  const [modalOpen, setModalOpen] = useState(false);

  const { trips, loading: tripsLoading, error: tripsError } = useGeotabData();
  const { trucks, loading: trucksLoading, error: trucksError } = useTruckEmissions();

  const loading = selectedTab === 'Trips' ? tripsLoading : trucksLoading;
  const error = selectedTab === 'Trips' ? tripsError : trucksError;

  const dummyRequest = {
    dateRange: '',
    fileType: '',
  };

  return (
    <IonPage>
      <IonHeader>
        <Header />
        <IonToolbar className="welcome">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/manager/dashboard" text="Dashboard" />
            <h1>Emissions</h1>
          </IonButtons>
          <IonButtons slot="end">
            <div className="create">
              <button className="manual-button" onClick={() => setModalOpen(true)}>Create</button>
            </div>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding dashboard">
        <div className="dashboard-wrapper">
          <DetailedMonthlyEmissions />
          <div className="section-title">Latest {selectedTab}</div>
          {loading && <p>Loading latest data…</p>}
          {error && <p style={{ color: 'red' }}>Error loading data: {error}</p>}
          {!loading && !error && (
            <EmissionsTable
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
              tripRows={trips}
              truckRows={trucks}
            />
          )}
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
            <div className="results-count">
              Showing {selectedTab === 'Trips' ? trips.length : trucks.length} of 1,000 results
            </div>
          </div>
        </div>
      </IonContent>
      <CustomerReportRequest
        isOpen={modalOpen}
        closePopup={() => setModalOpen(false)}
        request={dummyRequest}
      />
    </IonPage>
  );
};

export default EmissionsOverview;