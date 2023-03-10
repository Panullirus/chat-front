import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Login from './pages/Auth/Login';

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

/* Theme variables */
import './theme/variables.css';
import Register from './pages/Auth/Register';
import ChatContainer from './pages/Chat/ChatContainer';
import Chat from './pages/Chat/Chat';
import User from './pages/Profile/User';
import ProfileSkeleton from './components/UI/Profile/ProfileSkeleton';
import ChangePassword from './components/UI/Profile/Password/ChangePassword';
import ChangePasswordLogin from './pages/Auth/ChangePasswordLogin';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/ingresar">
          <Login />
        </Route>
        <Route exact path="/registrarse">
          <Register />
        </Route>
        <Route exact path="/chats">
          <ChatContainer />
        </Route>
        <Route exact path="/chat">
          <Chat />
        </Route>
        <Route exact path="/" render={() => <Redirect to="/ingresar" />}></Route>
        <Route exact path="/perfil">
          <User />
        </Route>
        <Route exact path="/loading">
          <ProfileSkeleton />
        </Route>
        <Route exact path="/contraseña">
          <ChangePassword />
        </Route>
        <Route exact path="/check/account">
          <ChangePasswordLogin/>
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
