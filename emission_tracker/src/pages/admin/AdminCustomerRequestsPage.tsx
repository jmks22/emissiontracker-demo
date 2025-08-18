import React from 'react';
import '../general/Home.css';
import './AdminDashboardPage.scss'
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react';
import Header from '../../components/general/Header';
import CustomerRequestsTable from '../../components/admin/CustomerRequestsTable';
import '../../theme/general.scss';


const AdminCustomerRequestsPage: React.FC = () => {

  return (
    <IonPage>
        <IonHeader>
            <Header></Header>
            <IonToolbar className="welcome">
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/admin/dashboard" text="Dashboard"/>
                    <h1>Customer Requests</h1>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding dashboard">
            <div className="dashboard-wrapper">
                <div className="section-title">Latest Requests</div>
                <CustomerRequestsTable/>
            </div>
        </IonContent>
    </IonPage>
  );
};

export default AdminCustomerRequestsPage;