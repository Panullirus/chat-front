import ChatMessageContainer from "./ChatMessageContainer";
import MessageSkeleton from "./MessageSkeleton";
import { IonContent } from "@ionic/react";
import { ChatMessageListProps, MessageContent } from "src/packages/interfaces";
import { useEffect, useRef } from "react";
import ChatWithDaySeparator from "./ChatDate";

export default function ChatMessageList(props: ChatMessageListProps): JSX.Element {

    const messagesEndRef = useRef<HTMLDivElement>(null)
    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }

    const groupMessages: { [key: string]: MessageContent[] } = {}

    props.messages.forEach((message: MessageContent) => {
        const date = new Date(message.fecha_envio)

        const dateKey = date.toLocaleDateString();
        if (!groupMessages[dateKey]) {
            groupMessages[dateKey] = [];
        }
        groupMessages[dateKey].push(message)
    })

    useEffect(scrollToBottom, [props.messages])

    return (
        <IonContent ref={props.contentRef}>
            {props.loading ? <div>
                <>
                    {
                        Object.entries(groupMessages).map(([date, messages]) => (
                            <div key={date}>
                                <ChatWithDaySeparator
                                    date={date}
                                />
                                {messages.map((message, index) => {

                                    let date = new Date(message?.fecha_envio)
                                    let hours = date.getHours();
                                    let minutes = date.getMinutes()

                                    const hora_envio = `${hours}:${minutes}`

                                    return (
                                        <div ref={messagesEndRef}>
                                            <ChatMessageContainer
                                                loading={true}
                                                current_user={Number(props.currentUser)}
                                                key={index}
                                                contenido={message.contenido}
                                                id_usuario_envia={message.id_usuario_envia}
                                                fecha_envio={message}
                                                hora_envio={hora_envio}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        ))
                    }
                </>
                {/* {
                    props.messages.map((item: any, index) => {
                        let date = new Date(item?.fecha_envio)
                        let hours = date.getHours();
                        let minutes = date.getMinutes()

                        const hora_envio = `${hours}:${minutes}`

                        return (
                            <div ref={messagesEndRef}>
                                <ChatMessageContainer
                                    loading={true}
                                    current_user={Number(props.currentUser)}
                                    key={index}
                                    contenido={item.contenido}
                                    id_usuario_envia={item.id_usuario_envia}
                                    fecha_envio={item}
                                    hora_envio={hora_envio}
                                />
                            </div>
                        )
                    })
                } */}
            </div> : <MessageSkeleton />}
        </IonContent>
    )
}