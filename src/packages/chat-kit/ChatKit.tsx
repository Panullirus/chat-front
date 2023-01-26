import axios from 'axios'
import { useHistory } from 'react-router';
import { AuthKit } from '../auth-kit/AuthKit'
import moment from 'moment'

export class ChatKit {

    public history = useHistory()

    public Auth = new AuthKit();

    async calculateDiffDays(date: string) {
        const now = moment()
        const date_now = moment(date)
        const diff = now.diff(date_now, 'days')

        const date_format = new Date(date)
        const hours = date_format.getHours()
        const minutes = date_format.getMinutes()
        const hora_envio = `${hours}:${minutes}`

        const formattedDate = date_format.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })

        console.log(formattedDate)

        if (diff === 0) {
            return `Hoy`
        } else if (diff === 1) {
            return `Ayer`
        } else if (diff === 2) {
            return `Anteayer`
        } else if (diff < 7) {
            return formattedDate
        } else {
            return formattedDate
        }
    }

    async setMessages(conversaciones_id: number) {

        const conversacionesId = {
            conversaciones_id: conversaciones_id
        }

        const getMessages = await this.getAllMessage(conversacionesId)

        const messages: [] = getMessages.data.message

        return messages
    }

    async getUserList() {
        return fetch('http://localhost:3000/get_users')
    }

    async verifyMessageRoom(messageRoomData: any) {
        return await axios.post('http://localhost:3000/find_message_room', messageRoomData)
    }

    async createMessageRoom(messageRoomData: any) {
        return await axios.post('http://localhost:3000/create_message_room', messageRoomData)

    }

    async getAllMessage(conversaciones_id: any) {
        return await axios.post('http://localhost:3000/get_all_message', conversaciones_id)
    }


    async sendMessage(message: any) {
        return await axios.post('http://localhost:3000/send_message', message)
    }
}