import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import SignUpForm from '../../components/general/SignUpForm';
import UserProfileForm from '../../components/general/UserProfileForm';
import ChangePassword from '../../components/general/ChangePassword';
import '../../theme/general.scss';
import './Home.css';
import LoginForm from '../../components/general/LoginForm';
import Index from '../../components/general/Index';


const UserProfile: React.FC = () => {
  return (
    <Index component={<UserProfileForm />} />
  );
};

export default UserProfile;