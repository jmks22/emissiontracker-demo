import React, { useState } from 'react';
import '../../theme/general.scss';
import './FleetDetailsPage.scss';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar
} from '@ionic/react';
import Header from '../../components/general/Header';
import EmissionsTable from '../../components/admin+manager/EmissionsTable';
import FleetInfo from '../../components/admin/FleetInfo';
import AddFleetModal from '../../components/admin/AddFleetModal';
import type { TabType } from '../../components/admin+manager/EmissionsTable';
import { useGeotabData } from '../../hooks/useGeotabData';
import { useTruckEmissions } from '../../hooks/useTruckEmissions';

const FleetDetailsPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<TabType>('Trips');
  const [showAddModal, setShowAddModal] = useState(false);
  const { trips, loading: tripsLoading, error: tripsError } = useGeotabData();
  const { trucks, loading: trucksLoading, error: trucksError } = useTruckEmissions();

  const loading = selectedTab === 'Trips' ? tripsLoading : trucksLoading;
  const error = selectedTab === 'Trips' ? tripsError : trucksError;

  return (
    <IonPage>
      <IonHeader>
        <Header />
        <IonToolbar className="welcome">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/admin/dashboard" text="Dashboard" />
            <h1>Fleet Details</h1>
          </IonButtons>
          <IonButtons slot="end">
            <div className="create">
              <button className="manual-button" onClick={() => setShowAddModal(true)}>
                Create
              </button>
            </div>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding dashboard">
        <div className="dashboard-wrapper">
          <FleetInfo />
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
          {/* Match EmissionsOverview Pagination UI */}
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

        {/* Add Fleet Modal */}
        <AddFleetModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default FleetDetailsPage;
