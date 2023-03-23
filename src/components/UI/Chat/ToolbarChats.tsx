import { ToolbarChat } from "src/packages/interfaces"
import {
    IonToolbar,
    IonButtons,
    IonIcon,
    IonTitle,
    IonButton,
    IonBackButton,
    IonProgressBar
} from '@ionic/react';
import { useHistory } from "react-router";

export default function ToolarChats(props: ToolbarChat): JSX.Element {

    const history = useHistory()

    const handlerOpenProfile = () => {
        history.push("/perfil")
    }

    const exit_app = () => {
        localStorage.clear()
        history.push("/ingresar")
    }


    return (
        <IonToolbar>
            <IonButtons slot="start">
                <IonButton>
                    {props.backButton ? <IonButton>
                        <IonBackButton defaultHref={props.backButtonName}></IonBackButton>
                    </IonButton> : <IonButton onClick={exit_app}>
                        <IonIcon slot="icon-only" md={props.startIcon} ></IonIcon>
                    </IonButton>}
                </IonButton>
            </IonButtons>
            <IonTitle>
                {props.image ? <img src="https://picsum.photos/80/80?random=1" alt="user" height={50} style={{
                    borderRadius: 50
                }} /> : <span>{props.title}</span>}
            </IonTitle>
            <IonButtons slot="end">
                <IonButton onClick={handlerOpenProfile}>
                    <IonIcon slot="icon-only" md={props.endIcon}></IonIcon>
                </IonButton>
            </IonButtons>
            {props?.isLoading ? <IonProgressBar type="indeterminate"></IonProgressBar> : null}
        </IonToolbar>
    )
}