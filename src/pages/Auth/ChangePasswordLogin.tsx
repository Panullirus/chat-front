import {
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    IonItem,
    IonLabel,
    IonInput,
} from '@ionic/react';
import { arrowBack } from 'ionicons/icons';
import { useState } from 'react';
export default function ChangePasswordLogin(): JSX.Element {

    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')

    const saveNewPassword = () => {
        console.log(newPassword, confirmNewPassword)
    }

    return (
        <>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonButton>
                        <IonIcon icon={arrowBack}></IonIcon>
                    </IonButton>
                </IonButtons>
            </IonToolbar>
            <div style={{
                paddingTop: '70px',
                display: 'grid',
                placeItems: 'center',
            }}>
                <img src="https://cdn-icons-png.flaticon.com/512/9263/9263503.png" alt="login" height={150} />
                <br />
                <div style={{
                    paddingBottom: 10
                }}>
                    <IonItem style={{
                        width: '100%',
                        paddingBottom: 25
                    }}>
                        <IonLabel position="floating">Correo electrónico</IonLabel>
                        <IonInput placeholder="Ingresa tu correo" onIonChange={(e: any) => setNewPassword(e.target.value)}></IonInput>
                    </IonItem>
                    <IonItem style={{
                        width: '100%',
                        paddingBottom: 25
                    }}>
                        <IonLabel position="floating">Contraseña nueva</IonLabel>
                        <IonInput placeholder="Ingresa la nueva contraseña" onIonChange={(e: any) => setNewPassword(e.target.value)}></IonInput>
                    </IonItem>
                    <IonItem style={{
                        width: '100%',
                        paddingBottom: 25
                    }}>
                        <IonLabel position="floating">Confirma nueva contraseña</IonLabel>
                        <IonInput placeholder="Ingresa la nueva contraseña" onIonChange={(e: any) => setConfirmNewPassword(e.target.value)}></IonInput>
                    </IonItem>
                    <div style={{
                        display: 'grid',
                        placeItems: 'center'
                    }}>
                        <IonButton fill="solid" onClick={saveNewPassword}>Cambiar contraseña</IonButton>
                    </div>
                </div>
            </div>
            <div style={{
                display: 'grid',
                placeItems: 'center',
                paddingTop: 100,
                paddingLeft: 30,
                paddingRight: 30
            }}>

            </div>
        </>
    )
}