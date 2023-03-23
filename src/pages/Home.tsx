import { IonContent, IonHeader, IonPage } from '@ionic/react';
import Login from './Auth/Login';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
      </IonHeader>
      <IonContent fullscreen>
        <Login/>
      </IonContent>
    </IonPage>
  );
};

export default Home;
