import { IonItem, IonLabel, IonAvatar, IonThumbnail } from '@ionic/react';
import { UserChatList } from '../../../packages/interfaces';
import { ChatKit } from 'src/packages/chat-kit/ChatKit';
import { useEffect, useState } from 'react';

export default function ChatUserList(props: UserChatList): JSX.Element {

  const Chat = new ChatKit()
  const [lastConnection, setLastConnection] = useState<string>('')
  const [number, setNumber] = useState<number>(0)

  useEffect(() => {
    const connection = async () => {

      if (props.isActive === 'live') {
        setLastConnection('En linea')
      } else {
        const LastConnection = await Chat.calculateDiffDays(props.date)
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
        }}/>
      </IonThumbnail>
      <div>
        <IonLabel>
          <span style={{
            color: "#1d305d",
            fontWeight: 'bolder',
            fontSize: 20
          }}>{props.name}</span>
        </IonLabel>
        <br />
        <IonLabel>Hola como estás yo...</IonLabel>
      </div>
      <IonLabel></IonLabel>
      <IonLabel></IonLabel>
      <IonLabel>
        <span>{lastConnection}</span>
      </IonLabel>
    </IonItem>
    // <IonItem key={props.index} onClick={props.setChatRoom}>
    //   <IonAvatar slot="start">
    //     <img src={'https://picsum.photos/80/80?random=' + props.index} alt="avatar" style={{
    //       height: 80,
    //       width: 80
    //     }}/>
    //   </IonAvatar>
    //   <IonLabel>
    //     <span style={{
    //       fontWeight: 'semibold'
    //     }}>{props.name} </span><br />
    //     <span style={{
    //       color: 'gray'
    //     }}>hola</span>
    //   </IonLabel>
    //   <IonLabel>
    //     <span>{lastConnection}</span>
    //   </IonLabel>
    // </IonItem>
  )
}