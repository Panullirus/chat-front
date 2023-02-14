import ChatUserList from "./ChatUserList";
import { IonList } from "@ionic/react";
import { ChatListProps, UserJWTProps } from "src/packages/interfaces";
import { AuthKit } from "src/packages/auth-kit/AuthKit";
import { ChatKit } from "src/packages/chat-kit/ChatKit";

export default function ChatList(props: ChatListProps): JSX.Element {

    const Chat = new ChatKit()
    const Auth = new AuthKit()

    const checkChatRoom = async (getChatRoom: any) => {
        await Chat.verifyMessageRoom(getChatRoom)
    }

    return (
        <IonList style={{ minHeight: '87vh' }}>
            {
                props.users.map((item: any, index: any) => {

                    const current_user: UserJWTProps = Auth.getCurrentUser()

                    const getChatRoom = {
                        id_usuario_1: item.id,
                        id_usuario_2: current_user.user_id
                    }


                    checkChatRoom(getChatRoom)

                    // const last_message_content = localStorage.getItem()

                    return (
                        <ChatUserList
                            key={index}
                            last_message=""
                            name={item.nombre}
                            index={item.id}
                            last_connection={item.last_connection}
                            setChatRoom={() => props.getUserFromList(item)}
                            isActive={item.last_connection}
                        />
                    )
                })
            }
        </IonList>
    )
}