import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import '../../theme/general.scss';
import '../general/Home.css';
import './AdminDashboardPage.scss'
import { IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonToolbar } from '@ionic/react';
import { chevronForwardOutline } from 'ionicons/icons';
import Header from '../../components/general/Header';
import DashboardRequestsTable from '../../components/admin/DashboardRequestTable';
import AdminMonthlyEmissions from '../../components/admin/AdminMonthlyEmission';
import MonthlyEmissions from '../../components/manager/MonthlyEmissions';


const AdminDashboardPage: React.FC = () => {
    const { firstName, setName, userType, setUserType } = useUser();
    const userTypes = ["Customer", "Driver", "Manager", "Admin"];

    const welcomeTime = ["Good Morning", "Good Afternoon", "Good Evening"];
    const currentDate = new Date();
    const currentTime = currentDate.getHours();

    let messageIndex = 0;
    if (currentTime >= 4 && currentTime < 12) {
        messageIndex = 0;
    } else if (currentTime >= 12 && currentTime < 17) {
        messageIndex = 1;
    } else {
        messageIndex = 2;
    }

    const [welcomeMessage] = useState<string>(welcomeTime[messageIndex]);

    useEffect(() => {
        // update user details here after grabbing from db
        setName("Ro");
        setUserType(userTypes[3]);
    }, [setName, setUserType]);    

  return (
    <IonPage>
        <IonHeader>
            <Header></Header>
            <IonToolbar className="welcome">
                <h1>👋 {welcomeMessage}, {firstName} - {userType} Dashboard</h1>
            </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding dashboard">
            <div className="dashboard-wrapper">
                <MonthlyEmissions linkTo="/admin/emissions" />
                <div className="section-title">Latest Requests</div>
                <DashboardRequestsTable/>
                <a href="admin/customer-requests" className="card-button">
                    <IonCard className="card hover">
                        <IonCardContent>
                        <IonGrid className="grid">
                            <IonRow>
                            <IonCol className="view-all">
                                <div><p>View All Requests<IonIcon icon={chevronForwardOutline} className="details-icon" /></p></div>
                            </IonCol>
                            </IonRow>
                        </IonGrid>
                        </IonCardContent>
                    </IonCard>
                </a>
            </div>
        </IonContent>
    </IonPage>
  );
};

export default AdminDashboardPage;