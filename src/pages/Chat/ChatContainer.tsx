import { useEffect, useState } from "react"
import { AuthKit } from "../../packages/auth-kit/AuthKit"
import { ChatKit } from "../../packages/chat-kit/ChatKit";
import { useHistory } from "react-router-dom";
import './ChatsEstilos.css'
import ChatSkeleton from "../../components/UI/Chat/ChatSkeleton";
import { createOutline, notificationsOutline, exitOutline } from 'ionicons/icons';
import ToolbarChats from "src/components/UI/Chat/ToolbarChats";
import ChatList from "src/components/UI/Chat/ChatList";
import { SocketKit } from "src/packages/socket-kit/SocketKit";
import { UserJWTProps } from "src/packages/interfaces";
import io from 'socket.io-client';

const socket = io('http://localhost:3001', {
  transports: ['websocket'],
});

export default function ChatContainer() {

  const Auth = new AuthKit()
  const Socket = new SocketKit()
  const Chat = new ChatKit()
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState([]);
  const history = useHistory()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    socket.on('new_user_connected', (data: any) => {
      console.log(data)
    });
  }, [])

  useEffect(() => {

    const currentUser: any = Auth.getCurrentUser()

    // const update_connection = {
    //   id: currentUser.user_id,
    //   last_connection: "online"
    // }

    // Auth.putUserConnection(update_connection)


    Socket.setNewUserConnected(currentUser)

    Auth.validateToken()

    Chat.getUserList().then((res) => res.json()).then(async (data: any) => {

      const listData = data.message

      const id = currentUser.user_id

      await Auth.putUserConnection(id)

      setCurrentUser(id)

      const filter: any = listData.filter((obj: any) => obj.id !== id)

      setUsers(filter)

      setLoading(true)

    })

  }, [])

  const getUserFromList = async (user: any) => {
    const messageRoomData = {
      id_usuario_1: currentUser,
      id_usuario_2: user.id
    }

    const message_room_data = await Chat.verifyMessageRoom(messageRoomData)

    console.log(messageRoomData.id_usuario_2)

    const data = await Auth.getUser(messageRoomData.id_usuario_2)

    const message_room = {
      ...message_room_data.data,
      user_to_data: data.data.message
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

  return (
    <>
      <ToolbarChats
        startIcon={exitOutline}
        image={true}
        endIcon={createOutline}
      />
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
        <ChatList
          users={users}
          getUserFromList={getUserFromList}
        />
      </div> : <ChatSkeleton />}
    </>
  )
}