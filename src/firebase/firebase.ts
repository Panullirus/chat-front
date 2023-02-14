// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZIm1zxbYZwDipLWdXD4wEUjy7yikTy7w",
  authDomain: "chat-ionic-8bad3.firebaseapp.com",
  projectId: "chat-ionic-8bad3",
  storageBucket: "chat-ionic-8bad3.appspot.com",
  messagingSenderId: "537314736770",
  appId: "1:537314736770:web:295b7c996134a7ecc8529b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export default app;