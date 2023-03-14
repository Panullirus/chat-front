import { IonItem, IonLabel, IonThumbnail } from '@ionic/react';
import { UserChatList } from '../../../packages/interfaces';
import { ChatKit } from 'src/packages/chat-kit/ChatKit';
import { useEffect, useState } from 'react';


export default function ChatUserList(props: UserChatList): JSX.Element {

  const Chat = new ChatKit()
  const [lastConnection, setLastConnection] = useState<string>('')
  const [number, setNumber] = useState<number>(0)

  useEffect(() => {
    const connection = async () => {

      if (props.last_connection === null) {
        setLastConnection('En linea')
      } else {
        const LastConnection = await Chat.calculateDiffDays(props.last_connection)
        setLastConnection(LastConnection)
      }


      const id: number = Math.floor(Math.random() * 10)
      setNumber(id)
    }
    connection()
  }, [lastConnection])

  return (
    <IonItem onClick={props.setChatRoom}>
      <IonThumbnail slot="start">
        <img alt="Silhouette of mountains" src={"https://picsum.photos/80/80?random=" + number} style={{
          borderRadius: 50
        }} />
      </IonThumbnail>
      <div>
        <IonLabel>
          <p style={{
            color: "#1d305d",
            fontWeight: 'bolder',
            fontSize: 20,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            width: 150
          }}>{props.name}</p>
        </IonLabel>
        <br />
        <IonLabel>{props?.last_message}</IonLabel>
      </div>
      <IonThumbnail slot='end' style={{ 'width': '100px', 'placeItems': 'end', 'display': 'inherit' }}>
        <span>{lastConnection}</span>
      </IonThumbnail>
    </IonItem>
  )
}