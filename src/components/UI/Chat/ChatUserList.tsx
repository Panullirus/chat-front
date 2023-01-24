import { IonItem, IonLabel, IonAvatar } from '@ionic/react';
import { UserChatList } from '../../../packages/interfaces';

export default function ChatUserList(props: UserChatList): JSX.Element {
  return (
    <IonItem key={props.index} onClick={props.setChatRoom}>
      <IonAvatar slot="start">
        <img src={'https://picsum.photos/80/80?random=' + props.index} alt="avatar"/>
      </IonAvatar>
      <IonLabel>
        <span style={{
          fontWeight: 'semibold'
        }}>{props.name} </span><br />
        <span style={{
          color: 'gray'
        }}>hola</span>
      </IonLabel>
      <IonLabel>
        {props.last_connection}
      </IonLabel>
    </IonItem>
  )
}