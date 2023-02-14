import axios from 'axios';
import { LastMessageChat, MessageSocketContent, UserJWTProps, UserUpdateDataProps } from '../interfaces';
import io from 'socket.io-client';

const socket = io('http://localhost:3001', {
  transports: ['websocket'],
});

export class SocketKit {

  subscribeToMessage(conversacion_id: number) {
    socket.on('message_data', (message: MessageSocketContent) => {

      if (conversacion_id === message.conversaciones_id) {

        console.log(message)

        return message
      }

      return

    });
  }

  subscribeToUpdate(user_current: any) {
    socket.on('update_profile', (data: UserUpdateDataProps) => {

      if (user_current === data.id) {

        console.log(data)
      }

      return

    });
  }

  newSocketUser(user_current: any) {
    socket.on('new_user_connected', (data: UserJWTProps) => {

      if (user_current !== data.user_id) {

        return data

      }

      return

    });
  }

  async setNewUserConnected(user: any) {
    
    const user_connections = {
      id: user.user_id,
      last_connection: null
    }

    return axios.post('http://localhost:3000/user_connected', user_connections);
  }
}