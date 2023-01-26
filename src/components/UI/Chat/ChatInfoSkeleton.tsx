import {
    IonCol,
    IonRow,
    IonGrid,
    IonLabel,
    IonItem
} from '@ionic/react';
import { ModalChat } from 'src/packages/interfaces';

export default function ChatInfoSkeleton(props: ModalChat): JSX.Element {
    return (
        <IonGrid>
            <IonRow>
                <IonCol size="12" className="col-container">
                    <img src={'https://picsum.photos/80/80?random=1'} className="profile-image" alt="profile_image" />
                    <IonItem>
                        <IonLabel style={{ textAlign: 'center' }}> <span style={{ fontSize: 20, fontWeight: 'semibold' }}>{props.nombre}</span> </IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel style={{ textAlign: 'center' }}>{props.correo}</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel style={{ textAlign: 'center' }}>Últ. vez {props.lastConnection}</IonLabel>
                    </IonItem>
                </IonCol>
            </IonRow>
        </IonGrid>
    )
}