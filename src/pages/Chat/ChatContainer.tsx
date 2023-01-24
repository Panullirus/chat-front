import { useEffect, useState } from "react"
import { AuthKit } from "../../packages/auth-kit/AuthKit"
import {
  IonHeader,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonList,
  IonTitle
} from '@ionic/react';
import { ChatKit } from "../../packages/chat-kit/ChatKit";
import ChatUserList from "../../components/UI/Chat/ChatUserList";
import { useHistory } from "react-router-dom";
import io from 'socket.io-client'
import './ChatsEstilos.css'
import ChatSkeleton from "../../components/UI/Chat/ChatSkeleton";

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

    Chat.getUserList().then((res) => res.json()).then((data: any) => {

      const listData = data.message

      const currentUser: any = Auth.getCurrentUser()

      const id = currentUser.user_id

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

    const data = await Auth.getUser({ id: messageRoomData.id_usuario_2 })

    const message_room = { ...message_room_data.data, nombre: data.data.message.nombre }

    const set_date_message_room = { ...message_room, last_connection: data.data.message.last_connection }

    if (message_room_data.data.ok && message_room_data.data.message == null) {
      try {
        const room = await Chat.createMessageRoom(messageRoomData)

        if (room.data.ok) {
          history.push({ pathname: '/chat', state: { data: set_date_message_room } })
        }
      } catch (error) {
        console.log("Error al crear el messageRoom")
      }
    } else {
      history.push({ pathname: '/chat', state: { data: message_room } })
    }

  }

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="chat">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Lista de usuarios</IonTitle>
        </IonToolbar>
      </IonHeader>
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
                />
              )
            })
          }
        </IonList>
      </div> : <ChatSkeleton />}
    </>
  )
}