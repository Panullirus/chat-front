import { useState } from 'react';
import { AuthKit } from '../../packages/auth-kit/AuthKit';
import { useIonAlert } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { IonButton, IonButtons } from '@ionic/react';
import { IonItem, IonLabel, IonInput, } from '@ionic/react';

export default function Login() {

    const history = useHistory()

    const Auth = new AuthKit()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [presentAlert] = useIonAlert()


    const goToChangePassword = () => {
        history.push("/check/account")
    }


    async function onSignInPressed() {
        console.log(email, password)

        try {
            if (!Auth.validateEmail(email)) {
                return (
                    presentAlert({
                        header: 'Correo incorrecto',
                        message: 'Ingresa un correo válido',
                        buttons: ['Aceptar'],
                    })
                )
            } else {
                await Auth.login(email, password).then(data => {
                    if (!data.ok) {
                        return (
                            presentAlert({
                                header: 'Datos incorrectos',
                                message: 'Revisa tus datos he intentalo de nuevo',
                                buttons: ['Aceptar'],
                            })
                        )
                    }

                    history.push("/chats")
                })
            }
        } catch (error) {
            presentAlert({
                header: 'Datos inválidos',
                message: 'Llena los campos correctamente',
                buttons: ['Aceptar'],
            })
        }
    }



    return (
        <div style={{
            marginTop: '120px',
            display: 'grid',
            placeItems: 'center',
        }}>
            <img src="https://cdn-icons-png.flaticon.com/512/9263/9263544.png" alt="login" height={150} />
            <br />
            <div style={{
                paddingBottom: 50
            }}>
                <div>
                    <IonItem>
                        <IonLabel position="floating">Correo electrónico</IonLabel>
                        <IonInput placeholder="ejemplo@correo.com" onIonInput={(e: any) => setEmail(e.target.value)}></IonInput>
                    </IonItem>
                </div>
                <div style={{
                    paddingTop: 25
                }}>
                    <IonItem>
                        <IonLabel position="floating">Contraseña</IonLabel>
                        <IonInput placeholder="Contraseña123" type='password' onIonInput={(e: any) => setPassword(e.target.value)}></IonInput>
                    </IonItem>
                    <br />
                    <span style={{
                        fontSize: 12,
                        cursor: 'pointer'
                    }} onClick={goToChangePassword}>¿Olvidaste tu contraseña?</span>
                </div>
                <br />
                <div style={{
                    display: 'grid',
                    placeItems: 'center'
                }}>
                    <IonButton
                        onClick={() => onSignInPressed()} style={{
                            width: "100%"
                        }}>ENTRAR</IonButton>
                    <br />
                    <IonButton
                        onClick={() => history.push("/registrarse")} style={{
                            width: "100%"
                        }}>REGISTRARSE</IonButton>
                </div>
            </div>
        </div>
    )
}