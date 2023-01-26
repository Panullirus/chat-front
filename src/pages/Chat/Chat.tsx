import { createRef, useEffect, useRef, useState } from "react"
import { AuthKit } from "../../packages/auth-kit/AuthKit"
import {
    IonToolbar,
    IonButtons,
    IonContent,
    IonButton,
    IonTitle,
    IonBackButton,
    IonLabel,
    IonIcon,
    IonItem,
} from '@ionic/react';
import { ChatKit } from "../../packages/chat-kit/ChatKit";
import ChatMessageContainer from "../../components/UI/Chat/ChatMessageContainer";
import { useLocation } from "react-router";
import io from 'socket.io-client'
import { ellipsisHorizontal, ellipsisVertical, send } from 'ionicons/icons';
import './main.css'
import MessageSkeleton from "../../components/UI/Chat/MessageSkeleton";
import { HistoryRoute, MessageContent } from "../../packages/interfaces";
import ChatInfoSkeleton from "src/components/UI/Chat/ChatInfoSkeleton";

export default function Chat() {
    const contentRef = createRef<HTMLIonContentElement>();
    const data: any = useLocation()
    const Auth = new AuthKit()
    const Chat = new ChatKit()
    const [chat, setChat] = useState(data)
    const [messages, setMessages] = useState<any[]>([])
    const [newMessages, setNewMessages] = useState<any>()
    const [messageInput, setMessageInput] = useState('')
    const [user, setUser] = useState<number>()
    const [chatRoom, setChatRoom] = useState<number>()
    const [newMessageAvailable, setNewMessageAvailable] = useState(false);
    const [loading, setLoading] = useState(false)
    const [nombre, setNombre] = useState('')
    const [correo, setCorreo] = useState('')
    const [lastConnection, setLastConnection] = useState('')

    const [items, setItems] = useState<string[]>([])

    const socket = io('http://localhost:3001', {
        transports: ["websocket"]
    });

    useEffect(() => {

        Auth.validateToken()

        const getChats = async () => {
            const data_from_chats: HistoryRoute = chat

            const user_data: any = await Auth.getCurrentUser()


            setChatRoom(data_from_chats.state.data.message.id)
            setNombre(data_from_chats.state.data.user_to_data.nombre)
            setCorreo(data_from_chats.state.data.user_to_data.correo)
            setUser(user_data.user_id)

            const chatRoomID = data_from_chats.state.data.message.id

            const messages_container = await Chat.setMessages(chatRoomID)

            const getLastConnection = await Chat.calculateDiffDays(data_from_chats.state.data.user_to_data.last_connection)

            setLastConnection(getLastConnection)

            setMessages(messages_container)

            socket.on('message_data', (data: any) => {
                setNewMessageAvailable(true)
                setMessages(prevMessages => [...prevMessages, data])
            })
            setItems(prevItems => [...prevItems, newMessages])

            setLoading(true)
        }

        getChats();

        return () => {
            socket.off('message_data');
        }

    }, [newMessages])


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
            <IonToolbar>
                <IonButtons slot="start">
                    <IonButton>
                        <IonBackButton defaultHref="chats"></IonBackButton>
                    </IonButton>
                </IonButtons>
                <img src="https://picsum.photos/80/80?random=1" alt="user" height={40} style={{
                    borderRadius: 60
                }} />
                <IonLabel>asdasdas</IonLabel>
                <IonLabel>asdasdas</IonLabel>

                <IonButtons slot="end">
                    <IonButton>
                        <IonIcon slot="icon-only" md={ellipsisVertical} ios={ellipsisVertical}></IonIcon>
                    </IonButton>
                </IonButtons>
            </IonToolbar>
            <div className="content" style={{
                height: "90vh", // O un alto específico en px    
                paddingBottom: 50
            }}>
                <IonContent ref={contentRef}>
                    {loading ? <div>
                        {
                            messages.map((item: any, index) => {
                                let date = new Date(item?.fecha_envio)
                                let hours = date.getHours();
                                let minutes = date.getMinutes()

                                const hora_envio = `${hours}:${minutes}`

                                return (
                                    <div>
                                        <ChatMessageContainer
                                            current_user={Number(user)}
                                            key={index}
                                            contenido={item.contenido}
                                            id_usuario_envia={item.id_usuario_envia}
                                            fecha_envio={item}
                                            hora_envio={hora_envio}

                                        />
                                    </div>
                                )
                            })
                        }
                    </div> : <MessageSkeleton />}
                </IonContent>
                {/* <button onClick={sendMessageToServer}>Enviar</button> */}

                <div style={{
                    paddingLeft: 30,
                    paddingRight: 30
                }}>
                    <IonItem>
                        <input placeholder="Escribe un mensaje..." id="inputID" value={messageInput} onChange={handleChange} style={{
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
                        }} onKeyDown={handleKeyDown} />
                        <IonIcon slot="end" ios={send} md={send}></IonIcon>
                    </IonItem>
                </div>
            </div>
        </div>
    )
}