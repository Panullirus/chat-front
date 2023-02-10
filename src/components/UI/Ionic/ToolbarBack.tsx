import {
    IonToolbar,
    IonButtons,
    IonTitle,
    IonButton,
    IonIcon,
} from '@ionic/react';
import { ToolbarProps } from 'src/packages/interfaces';
import { arrowBack } from 'ionicons/icons';
import { useHistory } from 'react-router';

export default function ToolbarBack(props: ToolbarProps): JSX.Element {
    
    const history = useHistory();

    const goChats = () => {
        history.push("/chats")
    }

    return (
        <IonToolbar>
            <IonButtons slot="start">
                <IonButton onClick={goChats}>
                    <IonIcon icon={arrowBack}></IonIcon>
                </IonButton>
                <IonTitle>
                    <span>
                        {props.title}
                    </span>
                </IonTitle>
            </IonButtons>
        </IonToolbar>
    )
}