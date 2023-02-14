import { useEffect, useState } from "react"
import ToolbarBack from "src/components/UI/Ionic/ToolbarBack"
import ProfileCard from "src/components/UI/Profile/ProfileCard"
import ProfileInputs from "src/components/UI/Profile/ProfileInputs"
import { AuthKit } from "src/packages/auth-kit/AuthKit"
import { UserJWTProps } from "src/packages/interfaces"
import { SocketKit } from "src/packages/socket-kit/SocketKit"

export default function User(): JSX.Element {

    const Auth = new AuthKit()
    const Socket = new SocketKit()
    const [name, setName] = useState<string>('')
    const [nameImage, setNameImage] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [userID, setUserID] = useState<number>(0)

    useEffect(() => {
        const getUser = async () => {
            const current_user: UserJWTProps = Auth.getCurrentUser()

            setUserID(current_user.user_id)

            const user = await Auth.getUser(current_user.user_id)

            setName(user.data.message.nombre)
            setEmail(user.data.message.correo)
            setPassword(user.data.message.clave)

            Socket.subscribeToUpdate(current_user.user_id)

        }
        getUser()
    }, [])

    return (
        <>
            <ToolbarBack
                url="chats"
            />
            <ProfileCard
                name={name}
            />
            <ProfileInputs
                id={userID}
                email={email}
                password={password}
                name={name}
            />
        </>
    )
}