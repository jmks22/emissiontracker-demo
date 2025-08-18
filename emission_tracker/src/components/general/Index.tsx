import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRouterLink,
} from '@ionic/react';
import '../../theme/general.scss';
import '../../pages/general/Home.css';
import Header from './Header';

interface IndexProps {
  component: React.ReactNode;
}

const Index: React.FC<IndexProps> = ({ component }) => {
  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        {component}
      </IonContent>
    </IonPage>
  );
};

export default Index;
