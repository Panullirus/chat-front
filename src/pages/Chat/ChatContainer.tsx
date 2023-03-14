import { useEffect, useState } from "react"
import { AuthKit } from "../../packages/auth-kit/AuthKit"
import { ChatKit } from "../../packages/chat-kit/ChatKit";
import { useHistory } from "react-router-dom";
import './ChatsEstilos.css'
import ChatSkeleton from "../../components/UI/Chat/ChatSkeleton";
import { createOutline, exitOutline } from 'ionicons/icons';
import ToolbarChats from "src/components/UI/Chat/ToolbarChats";
import ChatList from "src/components/UI/Chat/ChatList";
import io from 'socket.io-client';
import Environment from "src/environment";

const env = new Environment();

const socket = io(`https://${env.PROP_SOCKET_URI}`, {
  transports: ['polling']
});


export default function ChatContainer() {

  const Auth = new AuthKit()
  const Chat = new ChatKit()
  const [users, setUsers] = useState<any>()
  const [currentUserChatId, setCurrentUserChatId] = useState([]);
  const history = useHistory()
  const [loading, setLoading] = useState(false)

  useEffect(() => {

    socket.on('connection', (data) => {
      console.log(data)
    })

    Chat.getUserList().then((res) => res.json()).then(async (data: any) => {

      socket.emit('connection', true);

      const currentUser: any = Auth.getCurrentUser()

      const listData = data.message

      const id = currentUser.user_id

      const uid = currentUser.sub

      const messageRoom = await Auth.getAllMessageRoom();

      console.log(messageRoom)

      if (currentUser?.sub) {
        const filter: any = listData.filter((obj: any) => obj.uidGoogle !== uid)

        const idGoogelChat = await Auth.getGoogleIdChat(currentUser.sub)

        setCurrentUserChatId(idGoogelChat.data.message.id)

        setUsers(filter)
      } else {

        setCurrentUserChatId(id)

        const filter: any[] = listData.filter((obj: any) => obj.id !== id)
        
        setUsers(filter)
      }

      setLoading(true)

    })


  }, [])

  const getUserFromList = async (user: any) => {

    const messageRoomData = {
      id_usuario_1: currentUserChatId,
      id_usuario_2: user.id
    }

    const message_room_data = await Chat.verifyMessageRoom(messageRoomData)

    const data = await Auth.getUser(messageRoomData.id_usuario_2)

    const message_room = {
      ...message_room_data.data,
      user_to_data: data.data.message
    }

    if (message_room_data.data.message === null) {

      const messageData = await Chat.createMessageRoom(messageRoomData)

      const message_room = {
        ...messageData.data,
        user_to_data: data.data.message
      }

      history.push({ pathname: '/chat', state: { data: message_room } })

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