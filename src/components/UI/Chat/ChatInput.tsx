import { IonItem, IonIcon } from "@ionic/react"
import { ChatInputProps, UserJWTProps } from "src/packages/interfaces"
import { useEffect, useState } from "react";
import { AuthKit } from "src/packages/auth-kit/AuthKit";
import { sendOutline } from "ionicons/icons";
import './Chat.css'

export default function ChatInput(props: ChatInputProps): JSX.Element {
    const [name, setName] = useState<string>('')
    const Auth = new AuthKit()

    useEffect(() => {
        const fetchData = async () => {
            const current_user: UserJWTProps = Auth.getCurrentUser()
            const user = await Auth.getUser(current_user.user_id)

            setName(user.data.message.nombre)
        }

        fetchData()
    }, [])

    return (
        <div style={{
            paddingBottom: 10
        }}>
            {props.dataTyping?.nombre !== name ? null : <p style={{
                paddingLeft: 20,
                height: 5
            }}>{props.dataTyping?.nombre} está escribiendo...</p>}
            { }
            <IonItem>
                <div>
                    <input placeholder="Escribe un mensaje..." id="inputID" value={props.value} onChange={props.onChange} style={{
                        width: '100vw',
                        borderEndEndRadius: 5,
                        borderEndStartRadius: 5,
                        borderStartStartRadius: 5,
                        borderStartEndRadius: 5,
                        padding: 15,
                        backgroundColor: '#e7eaed',
                        borderColor: '#e7eaed',
                        fontSize: 16,
                        color: '#4f667a',
                        position: 'relative',
                    }} onKeyDown={props.onKeyDown} />
                    <IonIcon md={sendOutline} onClick={props.onPress} style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        right: 30,
                        margin: 'auto',
                    }} />
                </div>
            </IonItem>
        </div >
    )
}