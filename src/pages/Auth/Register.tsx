import { useState } from "react"
import { AuthKit } from '../../packages/auth-kit/AuthKit';
import { IonButton, useIonToast } from '@ionic/react';
import { checkmark } from 'ionicons/icons';
import { useIonAlert } from '@ionic/react';
import { IonInput, IonItem, IonLabel } from '@ionic/react';

export default function Register() {

    const [presentAlert] = useIonAlert()

    const Auth = new AuthKit()

    const [presentToast] = useIonToast()

    const [dataForm, setDataForm] = useState({
        email: '',
        username: ''
    })

    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const [secondPassword, setSecondPassword] = useState('')
    const [secondPasswordError, setSecondPasswordError] = useState('')

    async function onSignUpPressed(email: string, username: string) {

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

    const getDataForm = (email: any, value: any) => {
        setDataForm({ ...dataForm, [email]: value })
    }

    return (
        <div style={{
            paddingTop: '200px',
            display: 'grid',
            placeItems: 'center',
        }}>
            <div style={{
                paddingBottom: 50
            }}>
                <div>
                    <input
                        type="text"
                        placeholder='Correo electrónico'
                        onChange={(value: any) => getDataForm("email", value.target.value)}
                        style={{
                            borderRadius: 15,
                            padding: 10,
                            width: 250
                        }}
                    />
                </div>
                <div style={{
                    paddingTop: 25
                }}></div>
                <div>
                    <input
                        type="text"
                        placeholder='Nombre'
                        onChange={(value: any) => getDataForm("username", value.target.value)}
                        style={{
                            borderRadius: 15,
                            padding: 10,
                            width: 250
                        }}
                    />
                </div>
                <div style={{
                    paddingTop: 25
                }}></div>
                <div>
                    <input
                        type="text"
                        placeholder='Contraseña'
                        onChange={e => setPassword(e.target.value)}
                        onBlur={() => validatePassword(password)}
                        style={{
                            borderRadius: 15,
                            padding: 10,
                            width: 250
                        }}
                    />
                    {passwordError && <p style={{
                        fontSize: 12,
                        color: 'red'
                    }}>{passwordError}</p>}
                </div>
                <div style={{
                    paddingTop: 25
                }}>
                    <input
                        type="text"
                        placeholder='Confirmar contraseña'
                        onChange={e => setSecondPassword(e.target.value)}
                        onBlur={() => validatePasswords(password, secondPassword)}
                        style={{
                            borderRadius: 15,
                            padding: 10,
                            width: 250
                        }}
                    />
                    {secondPasswordError && <p style={{
                        fontSize: 12,
                        color: 'red'
                    }}>{secondPasswordError}</p>}
                    <br />
                </div>
            </div>
            <IonButton
                onClick={() => onSignUpPressed(dataForm.email, dataForm.username)}>ENTRAR</IonButton>
        </div>
    )
}