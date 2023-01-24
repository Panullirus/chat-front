import axios from 'axios'
import { useHistory } from 'react-router';
import { AuthKit } from '../auth-kit/AuthKit'

export class ChatKit{

    public history = useHistory()

    public Auth = new AuthKit();

    async setMessages(conversaciones_id: number){

        const conversacionesId = {
            conversaciones_id: conversaciones_id
        }

        const getMessages =  await this.getAllMessage(conversacionesId)

        const messages: [] = getMessages.data.message

        return messages
    }

    async getUserList(){
       return fetch('http://localhost:3000/get_users')
    }

    async verifyMessageRoom(messageRoomData: any){
        return await axios.post('http://localhost:3000/find_message_room', messageRoomData)
    }

    async createMessageRoom(messageRoomData: any){
        return await axios.post('http://localhost:3000/create_message_room', messageRoomData)
        
    }

    async getAllMessage(conversaciones_id: any){
        return await axios.post('http://localhost:3000/get_all_message', conversaciones_id)
    }


    async sendMessage(message: any){
        return await axios.post('http://localhost:3000/send_message', message)
    }
}