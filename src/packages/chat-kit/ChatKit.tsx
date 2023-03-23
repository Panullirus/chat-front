import axios from 'axios'
import { useHistory } from 'react-router';
import { AuthKit } from '../auth-kit/AuthKit'
import moment from 'moment'
import Environment from 'src/environment';
export class ChatKit {

    public history = useHistory()
    public env = new Environment()
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


        if (diff === 0) {
            return hora_envio
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
        return fetch(`https://${this.env.PROP_URI}/get_users`)
    }

    async getAllmessageRoom(){
        return await axios.get(`https://${this.env.PROP_URI}/get_message_room`)
    }

    async verifyMessageRoom(messageRoomData: any) {
        return await axios.post(`https://${this.env.PROP_URI}/find_message_room`, messageRoomData)
    }

    async createMessageRoom(messageRoomData: any) {
        return await axios.post(`https://${this.env.PROP_URI}/create_message_room`, messageRoomData)

    }

    async getAllMessage(conversaciones_id: any) {
        return await axios.post(`https://${this.env.PROP_URI}/get_all_message`, conversaciones_id)
    }


    async sendMessage(message: any) {
        return await axios.post(`https://${this.env.PROP_URI}/send_message`, message)
    }

    async updateUser(user_data: any){
        return await axios.post(`https://${this.env.PROP_URI}/update_user`, user_data)
    }
}