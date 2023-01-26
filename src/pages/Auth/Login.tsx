import { useState } from 'react';
import { AuthKit } from '../../packages/auth-kit/AuthKit';
import { useIonAlert } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { IonButton } from '@ionic/react';
export default function Login() {

    const history = useHistory()

    const Auth = new AuthKit()

    const [dataForm, setDataForm] = useState({
        email: '',
        password: ''
    })

    const [presentAlert] = useIonAlert()

    const getDataForm = (email: any, value: any) => {
        setDataForm({ ...dataForm, [email]: value })
    }

    async function onSignInPressed(email: any, password: any) {

        try {
            if (!Auth.validateEmail(email.target.value)) {
                return (
                    presentAlert({
                        header: 'Correo incorrecto',
                        message: 'Ingresa un correo válido',
                        buttons: ['Aceptar'],
                    })
                )
            } else {
                await Auth.login(email.target.value, password.target.value).then(data => {
                    console.log(data)
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
            marginTop: '200px',
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
                        onChange={(value: any) => getDataForm("email", value)}
                        style={{
                            borderRadius: 15,
                            padding: 10,
                            width: 250
                        }}
                    />
                </div>
                <div style={{
                    paddingTop: 25
                }}>
                    <input
                        type="password"
                        placeholder='Contraseña'
                        onChange={(value: any) => getDataForm("password", value)}

                        style={{
                            borderRadius: 15,
                            padding: 10,
                            width: 250
                        }}
                    />
                    <br />
                    <span style={{
                        paddingRight: 15,
                        fontSize: 10
                    }}>¿Olvidaste tu contraseña?</span>
                </div>
                <div style={{
                    display: 'grid',
                    placeItems: 'center'
                }}>
                    <IonButton
                        onClick={() => onSignInPressed(dataForm.email, dataForm.password)}>ENTRAR</IonButton>
                    <br />
                    <IonButton
                        onClick={() => history.push("/registrarse")}>REGISTRARSE</IonButton>
                </div>
            </div>
        </div>
    )
}