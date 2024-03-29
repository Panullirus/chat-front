import { createRef, useEffect, useState } from "react"
import { AuthKit } from "../../packages/auth-kit/AuthKit"
import { ChatKit } from "../../packages/chat-kit/ChatKit";
import { useLocation } from "react-router";
import './main.css'
import { HistoryRoute, MessageContent, MessageSocketContent } from "../../packages/interfaces";
import ChatMessageList from "src/components/UI/Chat/ChatMessageList";
import ChatInput from "src/components/UI/Chat/ChatInput";
import { SocketKit } from "src/packages/socket-kit/SocketKit";
import io from 'socket.io-client';
import Environment from "src/environment";
import ToolbarBack from "src/components/UI/Ionic/ToolbarBack";

const env = new Environment()

const socket = io(`https://${env.PROP_SOCKET_URI}`, {
  transports: ['polling']
});

export default function Chat() {
    const contentRef = createRef<HTMLIonContentElement>();
    const data: any = useLocation()
    const Auth = new AuthKit()
    const Socket = new SocketKit()
    const Chat = new ChatKit()
    const [messages, setMessages] = useState<any[]>([])
    const [messageInput, setMessageInput] = useState('')
    const [user, setUser] = useState<number>()
    const [chatRoom, setChatRoom] = useState<number>(0)
    const [loading, setLoading] = useState(false)
    const [nombre, setNombre] = useState('')

    const getChats = async () => {

        const data_from_chats: HistoryRoute = data;

        const user_data: any = await Auth.getCurrentUser()

        if (user_data?.sub) {
            const idGoogelChat = await Auth.getGoogleIdChat(user_data?.sub)

            setUser(idGoogelChat.data.message.id)
        } else {
            setUser(user_data.user_id)
        }

        setChatRoom(data_from_chats.state.data.message.id)
        setNombre(data_from_chats.state.data.user_to_data.nombre)

        const chatRoomID = data_from_chats.state.data.message.id

        Socket.subscribeToMessage(chatRoom)

        const messages_container = await Chat.setMessages(chatRoomID)

        console.log(messages_container)

        setMessages(messages_container)

        setLoading(true)
    }

    useEffect(() => {
        let isCancelled = false

        if (!isCancelled) {

            socket.on('message_data', (message: MessageSocketContent) => {

                console.log(message)

                getChats()

                if(message.conversaciones_id !== chatRoom){
                    return
                }else{
                    console.log(message)
                }
            });
        }

        return () => {
            isCancelled = true
        }
    }, [])

    useEffect(() => {

        Auth.validateToken()

        getChats();
    }, [])


    const handleChange = (event: any) => {
        setMessageInput(event.target.value)
    }


    const sendMessageToServer = async () => {

        if (messageInput === '') {
            return null
        }

        const data: MessageContent = {
            contenido: messageInput,
            id_usuario_envia: Number(user),
            fecha_envio: Date(),
            conversaciones_id: Number(chatRoom)
        }

        setMessageInput('')

        await Chat.sendMessage(data)
    }

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            sendMessageToServer();
        }
    }



    return (
        <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
            <ToolbarBack
                url="Chats"
                title={nombre}
                image={true}
            />
            <div style={{ flex: 1, overflowY: "auto" }}>
                <ChatMessageList
                    key={1}
                    messages={messages}
                    contentRef={contentRef}
                    currentUser={Number(user)}
                    loading={loading}
                />
            </div>
            <div style={{ position: "sticky", bottom: 0 }}>
                <ChatInput
                    currentUser={user}
                    key={2}
                    value={messageInput}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onPress={sendMessageToServer}
                />
            </div>
        </div>
        // <div>
        //     <ToolbarChats
        //         key={0}
        //         backButton={true}
        //         backButtonName={"chats"}
        //         title={nombre}
        //     />
        //     <div>
        //         <ChatMessageList
        //             key={1}
        //             messages={messages}
        //             contentRef={contentRef}
        //             currentUser={Number(user)}
        //             loading={loading}
        //         />
        //         <ChatInput
        //             key={2}
        //             value={messageInput}
        //             onChange={handleChange}
        //             onKeyDown={handleKeyDown}
        //         />
        //     </div>
        // </div>
    )
}