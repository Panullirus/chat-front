import { IonIcon, IonItem } from "@ionic/react"
import { send } from "ionicons/icons"
import { ChatInputProps } from "src/packages/interfaces"

export default function ChatInput(props: ChatInputProps): JSX.Element {

    return (
        <div style={{
            paddingLeft: 30,
            paddingRight: 30
        }}>
            <IonItem>
                <input placeholder="Escribe un mensaje..." id="inputID" value={props.value} onChange={props.onChange} style={{
                    width: '100%',
                    borderEndEndRadius: 5,
                    borderEndStartRadius: 5,
                    borderStartStartRadius: 5,
                    borderStartEndRadius: 5,
                    padding: 15,
                    backgroundColor: '#e7eaed',
                    borderColor: '#e7eaed',
                    fontSize: 16,
                    color: '#4f667a'
                }} onKeyDown={props.onKeyDown} />
                <IonIcon slot="end" ios={send} md={send}></IonIcon>
            </IonItem>
        </div>
    )
}