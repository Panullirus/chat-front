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
        history.push(`/${props.url}`)
    }

    return (
        <IonToolbar>
            <IonButtons slot="start">
                <IonButton onClick={goChats}>
                    <IonIcon icon={arrowBack}></IonIcon>
                </IonButton>
                {props.image ? <img src={"https://picsum.photos/80/80?random=" + 1} alt="perfil" style={{
                        borderRadius: 50,
                        height: 40
                    }}/> : null}
                <IonTitle>
                    <span style={{
                        alignItems: 'center'
                    }}>
                        {props.title}
                    </span>
                </IonTitle>
            </IonButtons>
        </IonToolbar>
    )
}