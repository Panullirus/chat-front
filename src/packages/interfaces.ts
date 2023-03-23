import { Ref } from "react"

export interface MessageContent {
    id?: number
    contenido: string
    current_user?: number
    id_usuario_envia: number
    conversaciones_id?: number
    fecha_envio?: any
    hora_envio?: string
    loading?: boolean
    onSend?: () => void
}

export interface DateChat {
    date: string
}

export interface MessageSocketContent {
    contenido: string
    conversaciones_id: number
    id: number
    id_usuario_envia: number
    fecha_envio: string
}

export interface ChatListProps{
    users: any[]
    getUserFromList: (items: []) => void
}

export interface ToolbarProps{
    title?: string
    url: string
    image?: boolean
}

export interface ContainerProps{
    children?: React.ReactNode
}

export interface ProfileCardProps{
    name: string
}

export interface ChatInputProps{
    dataTyping?: {
        nombre: string,
        id: number
    }
    onKeyDown: (event: any) => void
    value: number | string | readonly string[]
    onChange: (event: any) => void
    onPress: () => void
    currentUser: number | undefined
}

export interface ChatMessageListProps{
    messages: any[]
    currentUser: number
    loading: boolean
    contentRef: Ref<HTMLIonContentElement>
}

export interface ToolbarChat{
    startIcon?: string
    title?: string
    image?: boolean
    backButton?: boolean
    backButtonName?: string
    endIcon?: string
    isLoading?: boolean
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
    clave: string | null
    uidGoogle?: string | null
    chatUserContainerID?: number,
    MessageRoomsID?: number
    nombre: string
}

export interface UserUpdateDataProps {
    id: number
    email: string
    name?: string
    password?: string
}

export interface ChangePassword {
    id: number
    correo: string
    lastPassword: string
    newPassword: string
}

export interface LastMessageChat {
    id_usuario_envia: number,
    contenido: string,
    conversaciones_id?: number
}

export interface UserJWTProps{
    user_id: number
    role: number
    iat: number
    exp: number
}

export interface UserChatList {
    name: string,
    setChatRoom: () => void,
    index: number,
    isActive: string,
    date?: any,
    onLine?: string
    last_message: string
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