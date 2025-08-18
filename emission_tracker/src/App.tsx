import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/general/Home';
// import SignUp from './pages/global/SignUp';
// import Login from './pages/global/Login';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
// import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import Login from './pages/general/Login';
import SignUp from './pages/general/SignUp';
import UserProfile from './pages/general/UserProfile';
import DriverDashboardPage from './pages/driver/DriverDashboardPage';
import DriverHistoryPage from './pages/driver/DriverHistoryPage';
import DriverTimerPage from './pages/driver/DriverTimerPage';
import CustomerDashboardPage from './pages/customer/CustomerDashboardPage';
import CustomerReportRequestsPage from './pages/customer/CustomerReportRequestsPage';
import ManagerDashboard from './pages/manager/ManagerDashboard';
import { UserProvider } from './context/UserContext';
import CustomerRequests from './pages/manager/CustomerRequests';
import EmissionsOverview from './pages/manager/EmissionsOverview';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminCustomerRequestsPage from './pages/admin/AdminCustomerRequestsPage';
import AdminEmissionsPage from './pages/admin/AdminEmissionsPage';
import FleetDetailsPage from './pages/admin/FleetDetailsPage';
import SettingsPage from './pages/admin/SettingsPage';

setupIonicReact();

const App: React.FC = () => (
  <UserProvider>
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/profile">
            <UserProfile />
          </Route>
          <Route exact path="/driver/dashboard">
            <DriverDashboardPage />
          </Route>
          <Route exact path="/driver/history">
            <DriverHistoryPage />
          </Route>
          <Route exact path="/driver/timer">
            <DriverTimerPage />
          </Route>
          <Route exact path="/customer/dashboard">
            <CustomerDashboardPage />
          </Route>
          <Route exact path="/customer/reports">
            <CustomerReportRequestsPage />
          </Route>
          <Route exact path="/manager/dashboard">
            <ManagerDashboard />
          </Route>
          <Route exact path="/manager/requests">
            <CustomerRequests />
          </Route>
          <Route exact path="/manager/emissions">
            <EmissionsOverview />
          </Route>
          <Route exact path="/admin/dashboard">
            <AdminDashboardPage />
          </Route>
          <Route exact path="/admin/emissions">
            <AdminEmissionsPage />
          </Route>
           <Route exact path="/admin/customer-requests">
            <AdminCustomerRequestsPage />
          </Route>
          <Route exact path="/admin/fleet-details" >
            <FleetDetailsPage/>
          </Route>
          <Route exact path="/admin/settings" >
            <SettingsPage/>
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  </UserProvider>
);

export default App;
