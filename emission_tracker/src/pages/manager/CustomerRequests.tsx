import React from 'react';
import '../../theme/general.scss';
import '../general/Home.css';
import './ManagerDashboard.scss'
import './CustomerRequests.scss'
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react';
import Header from '../../components/general/Header';
import RequestsTable from '../../components/manager/RequestTable';


const CustomerRequests: React.FC = () => {

  return (
    <IonPage>
        <IonHeader>
            <Header></Header>
            <IonToolbar className="welcome">
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/manager/dashboard" text="Dashboard"/>
                    <h1>Customer Requests</h1>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding dashboard">
            <div className="dashboard-wrapper">
                <div className="section-title">Latest Requests</div>
                <RequestsTable></RequestsTable>
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
                        Showing 8 of 1,000 results
                    </div>
                </div>
            </div>
        </IonContent>
    </IonPage>
  );
};

export default CustomerRequests;