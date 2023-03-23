import { useEffect } from "react"
import { useHistory } from "react-router"
import {
    IonList,
    IonSkeletonText,
    IonToolbar,
    IonButtons,
    IonButton,
} from '@ionic/react';

export default function ProfileSkeleton(): JSX.Element {

    const history = useHistory()

    useEffect(() => {
        setTimeout(() => {
            history.push('/perfil')
        }, 500)
    }, [])

    return (
        <>

            <IonToolbar>
                <IonButtons slot="start">
                    <IonButton>
                        <IonSkeletonText animated={true} style={{ 'width': '50px', 'height': '50px' }}></IonSkeletonText>
                    </IonButton>
                </IonButtons>
            </IonToolbar>
            <IonList>
                <div style={{
                    display: 'grid',
                    placeItems: 'center',
                    paddingTop: '8%',
                }}>
                    <IonSkeletonText animated={true} style={{ 'width': '150px', 'height': '150px' }}></IonSkeletonText>
                    <div style={{
                        paddingTop: 10
                    }}>
                        <IonSkeletonText animated={true} style={{ 'width': '190px', 'height': '25px' }}></IonSkeletonText>
                    </div>
                    <div style={{
                        paddingTop: 33
                    }}>
                        <IonSkeletonText animated={true} style={{ 'width': '290px', 'height': '50px' }}></IonSkeletonText>
                    </div>
                    <div style={{
                        paddingTop: 17
                    }}>
                        <IonSkeletonText animated={true} style={{ 'width': '290px', 'height': '50px' }}></IonSkeletonText>
                    </div>
                    <div style={{
                        paddingTop: 17
                    }}>
                        <IonSkeletonText animated={true} style={{ 'width': '290px', 'height': '50px' }}></IonSkeletonText>
                    </div>
                    <div style={{
                        paddingTop: 17
                    }}>
                        <IonSkeletonText animated={true} style={{ 'width': '80px', 'height': '50px' }}></IonSkeletonText>
                    </div>
                </div>


                {/* <IonLabel>
                        <h3>
                            <IonSkeletonText animated={true} style={{ 'width': '80%' }}></IonSkeletonText>
                        </h3>
                        <p>
                            <IonSkeletonText animated={true} style={{ 'width': '60%' }}></IonSkeletonText>
                        </p>
                        <p>
                            <IonSkeletonText animated={true} style={{ 'width': '30%' }}></IonSkeletonText>
                        </p>
                    </IonLabel> */}
            </IonList>
        </>
    )

}