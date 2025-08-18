import React, { useState, useEffect } from 'react';
import '../../theme/general.scss';
import './AdminEmissionsPage.scss'
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react';
import Header from '../../components/general/Header';
import DetailedMonthlyEmissions from '../../components/admin+manager/DetailedMonthlyEmissions';
import FleetsTable from '../../components/admin/FleetsTable';
import CreateReportModal from '../../components/admin/CreateReportModal'; // Adjust path as needed

const AdminEmissionsPage: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCreate = () => {
    console.log("Generating emissions report...");
    setShowCreateModal(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <Header />
        <IonToolbar className="emissions-toolbar">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/admin/dashboard" text="Dashboard" />
            <h1 className="emissions-title">Emissions</h1>
          </IonButtons>
          <IonButtons slot="end">
            <button className="create-button" onClick={() => setShowCreateModal(true)}>
              Create
            </button>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding dashboard">
        <div className="dashboard-wrapper">
          <DetailedMonthlyEmissions />
          <FleetsTable />
        </div>

        {/* Report Modal */}
        <CreateReportModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreate}
        />
      </IonContent>
    </IonPage>
  );
};

export default AdminEmissionsPage;
