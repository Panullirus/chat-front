import axios from 'axios'
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { User } from '../interfaces';

export class AuthKit{

    public history = useHistory()

    public validateEmail(email: string): boolean{
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return emailRegex.test(email)
    }

    async putUserConnection(data: any){
        return await axios.put('http://localhost:3000/put_last_connection', data)
    }

    async validateToken(){
        const jwt = localStorage.getItem('jwt')

        if(!jwt){
          this.history.push('/ingresar')
        }
    }

    async login(email: string, password: string){

        const login_data = {
            correo: email,
            clave: password
        }

        const request = await axios.post('http://localhost:3000/login', login_data)

        console.log(request.data.data.id)

        const setDate = {
            id: request.data.data.id,
            last_connection: Date()
        }

        await this.putUserConnection(setDate)

        if(request.data.ok){
            localStorage.setItem('jwt', request.data.token)
        }

        return request.data
    }

    async register(email: string, password: string, username: string){

        const create_user: User = {
            correo: email,
            clave: password,
            nombre: username,
        }

        const request = await axios.post('http://localhost:3000/user_create', create_user)

        if(request.data.ok){
            this.history.push("/ingresar")
        }

        return request.data

    }

    decoteJwt(jwt: string){
        const decode = jwt_decode(jwt)

        return decode
    }

    public getCurrentUser(){
        const jwt = localStorage.getItem('jwt')

        return this.decoteJwt(String(jwt))
    }

    async getUser(id: any){
        return await axios.post('http://localhost:3000/user_find', id)
    }

    loggOut(){
        localStorage.clear()
    }
}