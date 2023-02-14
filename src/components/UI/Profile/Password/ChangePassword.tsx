import {
    IonToolbar,
    IonButtons,
    IonTitle,
    IonButton,
    IonIcon,
    IonItem,
    IonLabel,
    IonInput,
    useIonToast
} from '@ionic/react';
import { arrowBack, checkmark, warningOutline } from 'ionicons/icons';
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { AuthKit } from 'src/packages/auth-kit/AuthKit';
import { ChangePassword } from 'src/packages/interfaces';
import TyC from 'src/pages/Profile/TyC';

export default function ChangePasswordInput() {

    const Auth = new AuthKit()
    const history = useHistory()
    const [lastPassword, setLastPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const data: any = useLocation()
    const [presentToast] = useIonToast()

    const saveNewPassword = async () => {
        const current_user = Auth.getCurrentUser()

        if (lastPassword === '' && newPassword === '' && confirmNewPassword === '') {
            presentToast({
                message: 'Debes de llenar todos los campos!!',
                duration: 2000,
                icon: warningOutline
            })
        } else {
            if (newPassword === confirmNewPassword) {
                const input: ChangePassword = {
                    id: current_user.user_id,
                    correo: data.state.data,
                    lastPassword: lastPassword,
                    newPassword: newPassword
                }

                const req = await Auth.changePassword(input)

                if (req.data.message === null) {
                    presentToast({
                        message: 'Contraseña actual incorrecta!!',
                        duration: 2000,
                        icon: warningOutline
                    })
                }

                if (req.data.ok && lastPassword !== '' && newPassword !== '' && confirmNewPassword !== '') {
                    history.push("/chats")
                    presentToast({
                        message: 'Contraseña cambiada con éxito',
                        duration: 2000,
                        icon: checkmark
                    })
                } else {
                    presentToast({
                        message: 'Ingresa la nueva contraseña',
                        duration: 2000,
                        icon: warningOutline
                    })
                }
            }else{
                presentToast({
                    message: 'Las contraseñas deben de coincidir',
                    duration: 2000,
                    icon: warningOutline
                })
            }
        }

    }

    const goToMain = () => {
        history.push("/perfil")
    }

    return (
        <>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonButton onClick={goToMain}>
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
                        <IonLabel position="floating">Contraseña acutal</IonLabel>
                        <IonInput placeholder="Ingresa tu contraseña" type='password' onIonChange={(e: any) => setLastPassword(e.target.value)}></IonInput>
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