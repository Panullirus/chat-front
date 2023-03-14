import { useState } from "react"
import { AuthKit } from '../../packages/auth-kit/AuthKit';
import { IonButton, useIonToast } from '@ionic/react';
import { checkmark } from 'ionicons/icons';
import { useIonAlert } from '@ionic/react';
import { IonInput, IonItem, IonLabel } from '@ionic/react';
import ToolbarBack from "src/components/UI/Ionic/ToolbarBack";
import TyC from "../Profile/TyC";
export default function Register() {

    const [presentAlert] = useIonAlert()

    const Auth = new AuthKit()

    const [presentToast] = useIonToast()

    const [dataForm, setDataForm] = useState({
        email: '',
        username: ''
    })

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')

    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const [secondPassword, setSecondPassword] = useState('')
    const [secondPasswordError, setSecondPasswordError] = useState('')

    async function onSignUpPressed() {

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
                if (await Auth.register(email, password, username)) {
                    return (
                        presentToast({
                            message: 'Te haz registrado exitosamente!!',
                            duration: 2000,
                            icon: checkmark
                        })
                    )
                }
            }
        } catch (error) {

        }

    }

    const validatePassword = (password: string) => {
        if (password.length < 8) {
            setPasswordError('La contraseña debe tener al menos 8 caracteres')
        } else {
            setPasswordError('')
        }
    }

    const validatePasswords = (password1: string, password2: string) => {
        if (password1 !== password2) {
            setSecondPasswordError('Las contraseñas no coinciden')
        } else {
            setSecondPasswordError('')
        }
    }

    return (
        <div>
            <ToolbarBack 
            url="ingresar"
            />
            <div style={{
                paddingTop: '25px',
                display: 'grid',
                placeItems: 'center',
            }}>
            <img src="https://cdn-icons-png.flaticon.com/512/9263/9263537.png" alt="login" height={150} />
                <br />
                <div style={{
                    paddingBottom: 10
                }}>
                    <div>
                        <IonItem>
                            <IonLabel position="floating">Correo electrónico</IonLabel>
                            <IonInput placeholder="ejemplo@correo.com" onIonInput={(value: any) => setEmail(value.target.value)} ></IonInput>
                        </IonItem>
                    </div>
                    <div style={{
                        paddingTop: 25
                    }}></div>
                    <div>
                        <IonItem>
                            <IonLabel position="floating">Nombre completo</IonLabel>
                            <IonInput placeholder="tu nombre completo" onIonInput={(value: any) => setUsername(value.target.value)} ></IonInput>
                        </IonItem>
                    </div>
                    <div style={{
                        paddingTop: 25
                    }}></div>
                    <div>
                        <IonItem>
                            <IonLabel position="floating">Contraseña</IonLabel>
                            <IonInput placeholder="Contraseña123" type="password" onBlur={() => validatePassword(password)} onIonInput={(e: any) => setPassword(e.target.value)} ></IonInput>
                        </IonItem>
                        {passwordError && <p style={{
                            fontSize: 12,
                            color: 'red'
                        }}>{passwordError}</p>}
                    </div>
                    <div style={{
                        paddingTop: 25
                    }}>
                        <IonItem>
                            <IonLabel position="floating">Confiram tu contraseña</IonLabel>
                            <IonInput placeholder="Contraseña123" type="password" onBlur={() => validatePasswords(password, secondPassword)} onIonInput={(e: any) => setSecondPassword(e.target.value)}></IonInput>
                        </IonItem>
                        {secondPasswordError && <p style={{
                            fontSize: 12,
                            color: 'red'
                        }}>{secondPasswordError}</p>}
                        <br />
                    </div>
                    <TyC/>
                    <IonButton
                    onClick={() => onSignUpPressed()} style={{
                        width: "100%"
                    }}>ENTRAR</IonButton>
                </div>
            </div>
        </div>
    )
}