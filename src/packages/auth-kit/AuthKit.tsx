import axios from 'axios'
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { ChangePassword, User, UserJWTProps } from '../interfaces';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { auth } from 'src/firebase/firebase';
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";
import app from 'src/firebase/firebase';

export class AuthKit {

    public db = getFirestore(app)
    public googleProvider = new GoogleAuthProvider()
    public history = useHistory()

    public validateEmail(email: string): boolean {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return emailRegex.test(email)
    }

    async putUserConnection(data: any) {
        return await axios.put('http://localhost:3000/put_last_connection', data)
    }

    async validateToken() {
        const jwt = localStorage.getItem('jwt')

        if (!jwt) {
            this.history.push('/ingresar')
        }
    }

    async login(email: string, password: string) {

        const login_data = {
            correo: email,
            clave: password
        }

        const request = await axios.post('http://localhost:3000/login', login_data)


        const setDate = {
            id: request.data.data.id,
            last_connection: Date()
        }

        await this.putUserConnection(setDate)

        if (request.data.ok) {
            localStorage.setItem('jwt', request.data.token)
        }

        return request.data
    }

    async register(email: string, password: string, username: string) {

        const create_user: User = {
            correo: email,
            clave: password,
            nombre: username,
        }

        const request = await axios.post('http://localhost:3000/user_create', create_user)

        if (request.data.ok) {
            this.history.push("/ingresar")
        }

        return request.data

    }

    decoteJwt(jwt: string) {
        const decode: UserJWTProps = jwt_decode(jwt)

        return decode
    }

    public getCurrentUser() {
        const jwt = localStorage.getItem('jwt')

        return this.decoteJwt(String(jwt))
    }

    async getUser(id: any) {
        const user = {
            id: id
        }
        return await axios.post('http://localhost:3000/user_find', user)
    }

    loggOut() {
        localStorage.clear()
    }

    async getGoogleIdChat(input: any){

        const data = {
            uidGoogle: input
        }

        return await axios.post('http://localhost:3000/user_uid_find', data)
    }

    async changePassword(input: ChangePassword) {
        return await axios.post('http://localhost:3000/change_password', input)
    }

    async AuthLoginGoogle() {
        try {
            const res = await signInWithPopup(auth, this.googleProvider);
            const user = res.user

            console.log(user)

            const findEmail = {
                correo: user.email
            }

            const email = await axios.post('http://localhost:3000/user_email_find', findEmail)

            console.log(email)

            if (email.data.ok) {
                const q = query(collection(this.db, "users"), where("uid", "==", user.uid))
                const docs = await getDocs(q)

                if (docs.docs.length !== 0) {
                    this.history.push("/chats")
                    localStorage.setItem('jwt', await user.getIdToken())
                }else{
                    alert("Correo ya registrado")
                }

            } else {
                const q = query(collection(this.db, "users"), where("uid", "==", user.uid))
                const docs = await getDocs(q)

                if (docs.docs.length === 0) {
                    await addDoc(collection(this.db, "users"), {
                        uid: user.uid,
                        name: user.displayName,
                        authProvider: "google",
                        email: user.email
                    })

                    const create_user: User = {
                        correo: String(user.email),
                        uidGoogle: String(user.uid),    
                        clave: null,
                        nombre: String(user.displayName),
                    }

                    console.log(create_user)

                    const request = await axios.post('http://localhost:3000/user_create', create_user)

                    if (request.data.ok) {
                        this.history.push("/chats")
                    }
                }

                localStorage.setItem('jwt', await user.getIdToken())
            }

        } catch (error) {
            console.log(error)
        }
    }
}