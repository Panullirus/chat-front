import { IonItem, IonLabel, IonInput } from "@ionic/react"
import { UserUpdateDataProps } from "src/packages/interfaces"
import { IonButton } from '@ionic/react';
import { useEffect, useState } from "react";
import { ChatKit } from "src/packages/chat-kit/ChatKit";
import { useIonAlert } from '@ionic/react';
import { useHistory, useLocation } from "react-router";

export default function ProfileInputs(props: UserUpdateDataProps): JSX.Element {

    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const Chat = new ChatKit()
    const history = useHistory()


    useEffect(() => {

        setName(String(props.name));
        setEmail(String(props.email));

    }, [props]);

    const goToChangePassword = () => {
        history.push({pathname: "/contraseña", state: { data: email }})
    }

    const getData = async () => {
        const user_data: UserUpdateDataProps = {
            id: props.id,
            email: email,
            name: name
        }

        const req = await Chat.updateUser(user_data)

        if (req.data.ok) {
            history.push('/loading')

        }

    }

    return (
        <div style={{
            display: 'grid',
            placeItems: 'center',
            paddingTop: 35,
            paddingLeft: 30,
            paddingRight: 30
        }}>
            <IonItem style={{
                width: '100%',
                paddingBottom: 25
            }}>
                <IonLabel position="floating">Correo electrónico</IonLabel>
                <IonInput placeholder="Enter text" value={email} onIonChange={(e: any) => setEmail(e.target.value)}></IonInput>
            </IonItem>
            <IonItem style={{
                width: '100%',
                paddingBottom: 25
            }}>
                <IonLabel position="floating">Nombre de usuario</IonLabel>
                <IonInput placeholder="Enter text" value={name} onIonChange={(e: any) => setName(e.target.value)}></IonInput>
            </IonItem>
            <div style={{
                display: 'grid',
                placeItems: 'center'
            }}>
                <IonButton fill="solid" onClick={getData}>Guardar</IonButton>
            </div>
            <div style={{
                paddingTop: 25,
                cursor: 'pointer'
            }} onClick={goToChangePassword}>
                <span>Cambiar la contraseña</span>
            </div>
        </div>
    )
}