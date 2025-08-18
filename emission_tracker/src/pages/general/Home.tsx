import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import '../../theme/general.scss';
import './Home.css';
import Header from '../../components/general/Header';

const Home: React.FC = () => {
  return (
    <IonPage>
      <Header />
      <IonContent fullscreen className="home-container">
        <div className="global-section">
          <h1>Global</h1>
          <div className="button-group">
            <a className="nav-button" href="/login">Login Page</a>
            <a className="nav-button" href="/signup">SignUp Page</a>
            <a className="nav-button" href="/profile">UserProfile Page</a>
          </div>
        </div>
        <hr className="divider" />
        <div className="role-sections">
          <div className="role-column">
            <h1>Driver</h1>
            <a className="nav-button" href="/driver/dashboard">Dashboard</a>
            <a className="nav-button" href="/driver/history">History</a>
            <a className="nav-button" href="/driver/timer">Timer</a>
          </div>

          <div className="role-column">
            <h1>Customer</h1>
            <a className="nav-button" href="/customer/dashboard">Dashboard</a>
            <a className="nav-button" href="/customer/reports">Reports</a>
          </div>

          <div className="role-column">
            <h1>Manager</h1>
            <a className="nav-button" href="/manager/dashboard">Dashboard</a>
            <a className="nav-button" href="/manager/requests">Requests</a>
            <a className="nav-button" href="/manager/emissions">Emissions</a>
          </div>

          <div className="role-column">
            <h1>Admin</h1>
            <a className="nav-button" href="/admin/dashboard">Dashboard</a>
            <a className="nav-button" href="/admin/emissions">Emissions</a>
            <a className="nav-button" href="/admin/fleet-details">Fleet Details</a>
            <a className="nav-button" href="/admin/customer-requests">Requests</a>
            <a className="nav-button" href="/admin/settings">Settings</a>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;