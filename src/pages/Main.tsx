import { IonNav } from "@ionic/react";

import Login from "./Auth/Login";

export default function Main(){
    return <IonNav root={() => <Login/>}></IonNav>
}