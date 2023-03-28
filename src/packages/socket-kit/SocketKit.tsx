import axios from 'axios';
import { MessageSocketContent, UserJWTProps, UserUpdateDataProps } from '../interfaces';
import io from 'socket.io-client';
import Environment from 'src/environment';

const env = new Environment()

const socket = io(`https://${env.PROP_SOCKET_URI}`, {
  transports: ['polling']
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

    return axios.post(`https://${env.PROP_URI}:3000/user_connected`, user_connections);
  }
  
}