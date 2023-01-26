import { useEffect, useState } from "react"
import { AuthKit } from "../../packages/auth-kit/AuthKit"
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonIcon,
  IonList,
  IonTitle,
  IonButton,
} from '@ionic/react';
import { ChatKit } from "../../packages/chat-kit/ChatKit";
import ChatUserList from "../../components/UI/Chat/ChatUserList";
import { useHistory } from "react-router-dom";
import io from 'socket.io-client'
import './ChatsEstilos.css'
import ChatSkeleton from "../../components/UI/Chat/ChatSkeleton";
import { createOutline, notificationsOutline } from 'ionicons/icons';

export default function ChatContainer() {

  const Auth = new AuthKit()
  const Chat = new ChatKit()
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState([]);
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const socket = io('http://localhost:3001', {
    transports: ["websocket"]
  });

  useEffect(() => {

    Auth.validateToken()

    Chat.getUserList().then((res) => res.json()).then(async (data: any) => {

      const listData = data.message

      const currentUser: any = Auth.getCurrentUser()

      const id = currentUser.user_id

      await Auth.putUserConnection(id)

      setCurrentUser(id)

      const filter: any = listData.filter((obj: any) => obj.id !== id)

      setUsers(filter)

      setLoading(true)

      socket.on('message_data', (data) => {
        console.log("mensaje => ", data)
      })

    })

  }, [])

  const getUserFromList = async (user: any) => {
    const messageRoomData = {
      id_usuario_1: currentUser,
      id_usuario_2: user.id
    }


    const message_room_data = await Chat.verifyMessageRoom(messageRoomData)

    const { data } = await Auth.getUser({ id: messageRoomData.id_usuario_2 })

    console.log(data)

    const message_room = {
      ...message_room_data.data,
      user_to_data: data.message
    }

    console.log(message_room)

    if (message_room_data.data.ok && message_room_data.data.message == null) {
      try {
        const room = await Chat.createMessageRoom(messageRoomData)

        if (room.data.ok) {
          history.push({ pathname: '/chat', state: { data: message_room } })
        }
      } catch (error) {
        console.log("Error al crear el messageRoom")
      }
    } else {
      history.push({ pathname: '/chat', state: { data: message_room } })
    }

  }

  const exit_app = () => {
    Auth.loggOut()
  }

  return (
    <>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton>
              <IonIcon slot="icon-only" md={notificationsOutline}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>
            <img src="https://picsum.photos/80/80?random=1" alt="user" height={50} style={{
              borderRadius: 50
            }} />
          </IonTitle>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon slot="icon-only" md={createOutline}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <div>
          <br />
        <span style={{
          padding: 10,
          fontSize: 35,
          fontWeight: 'bolder',
          color: "#00194a"
        }}>
          Chats
        </span>
      </div>
      <br />
      {loading ? <div>
        <IonList style={{ minHeight: '87vh' }}>
          {
            users.map((item: any, index: any) => {

              const date = new Date(item.last_connection);
              const formattedDate = date.toLocaleString('es-MX', {
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
              })

              return (
                <ChatUserList
                  key={index}
                  name={item.nombre}
                  index={item.id}
                  last_connection={"Última conexión " + formattedDate}
                  setChatRoom={() => getUserFromList(item)}
                  isActive={item.isActive}
                  date={date}
                />
              )
            })
          }
        </IonList>
      </div> : <ChatSkeleton />}
    </>
  )
}