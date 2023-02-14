import { createRef, useCallback, useEffect, useState } from "react"
import { AuthKit } from "../../packages/auth-kit/AuthKit"
import { ChatKit } from "../../packages/chat-kit/ChatKit";
import { useLocation } from "react-router";
import './main.css'
import { HistoryRoute, MessageContent, MessageSocketContent } from "../../packages/interfaces";
import ToolbarChats from "src/components/UI/Chat/ToolbarChats";
import ChatMessageList from "src/components/UI/Chat/ChatMessageList";
import ChatInput from "src/components/UI/Chat/ChatInput";
import ChatFlatList from "src/components/UI/Chat/ChatFlatList";
import { SocketKit } from "src/packages/socket-kit/SocketKit";
import io from 'socket.io-client';

const socket = io('http://localhost:3001', {
    transports: ['websocket'],
});

export default function Chat() {
    const contentRef = createRef<HTMLIonContentElement>();
    const data: any = useLocation()
    const Auth = new AuthKit()
    const Socket = new SocketKit()
    const Chat = new ChatKit()
    const [chat, setChat] = useState(data)
    const [messages, setMessages] = useState<any[]>([])
    const [newMessages, setNewMessages] = useState<any>()
    const [messageInput, setMessageInput] = useState('')
    const [user, setUser] = useState<number>()
    const [chatRoom, setChatRoom] = useState<number>(0)
    const [loading, setLoading] = useState(false)
    const [nombre, setNombre] = useState('')
    const [correo, setCorreo] = useState('')
    const [lastConnection, setLastConnection] = useState('')
    const [items, setItems] = useState<string[]>([])

    const getChats = async () => {

        const data_from_chats: HistoryRoute = chat

        const user_data: any = await Auth.getCurrentUser()

        if (user_data?.sub) {
            const idGoogelChat = await Auth.getGoogleIdChat(user_data?.sub)

            setUser(idGoogelChat.data.message.id)
        }else{
            setUser(user_data.user_id)
        }

        setChatRoom(data_from_chats.state.data.message.id)
        setNombre(data_from_chats.state.data.user_to_data.nombre)
        setCorreo(data_from_chats.state.data.user_to_data.correo)

        const chatRoomID = data_from_chats.state.data.message.id

        Socket.subscribeToMessage(chatRoom)

        const messages_container = await Chat.setMessages(chatRoomID)

        const getLastConnection = await Chat.calculateDiffDays(data_from_chats.state.data.user_to_data.last_connection)

        setLastConnection(getLastConnection)

        setMessages(messages_container)

        setItems(prevItems => [...prevItems, newMessages])

        setLoading(true)
    }

    useEffect(() => {
        let isCancelled = false

        if (!isCancelled) {

            const data_from_chats: HistoryRoute = chat

            socket.on('message_data', (message: MessageSocketContent) => {

                getChats()

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
        <div className="App">
            <ToolbarChats
                key={0}
                backButton={true}
                backButtonName={"chats"}
                title={nombre}
            />
            <ChatFlatList
                key={3}
            >
                <ChatMessageList
                    key={1}
                    messages={messages}
                    contentRef={contentRef}
                    currentUser={Number(user)}
                    loading={loading}
                />
                <ChatInput
                    key={2}
                    value={messageInput}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
            </ChatFlatList>
        </div>
    )
}