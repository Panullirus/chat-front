export interface MessageContent {
    id?: number
    contenido: string
    current_user?: number
    id_usuario_envia: number
    conversaciones_id?: number
    fecha_envio: string
    hora_envio?: string
    onSend?: () => void
}

export interface AlertProps {
    title: string
    subTitle?: string
    content: string
}

export interface Day {
    date: string,
    messages: MessageContent[]
}

export interface ChatWithDaySeparatorProps {
    messages: MessageContent[];
}

export interface User {
    id?: number,
    correo: string
    image_uri?: string
    user_to?: string,
    clave: string
    chatUserContainerID?: number,
    MessageRoomsID?: number
    nombre: string
}

export interface UserChatList {
    name: string,
    setChatRoom: () => void,
    index: number,
    isActive: string,
    date: any,
    last_connection: string
}

export interface ModalChat{
    nombre: string
    correo: string
    lastConnection: string
}

export interface ChatCardProps {
    name: string,
    onPress: () => void
}

export interface HistoryRoute {
    hash: string
    key: string
    pathname: string
    search: string
    state: {
        data: {
            message: {
                id: number
                id_usuario_1: number
                id_usuario_2: number
            }
            ok: boolean
            user_to_data: {
                clave: string
                correo: string
                id: number
                last_connection: string
                nombre: string
            }
        }
    }
}