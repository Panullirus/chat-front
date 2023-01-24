import React from 'react';
import {
    IonSkeletonText,
    IonThumbnail,
} from '@ionic/react';

export default function MessageSkeleton(): JSX.Element {
    return (
        <div style={{ padding: 5 }}>
            <div>
                <IonThumbnail slot="start">
                    <IonSkeletonText animated={true} style={{ 'width': '200px' }}></IonSkeletonText>
                </IonThumbnail>
                <br />
                <IonThumbnail slot="start">
                    <IonSkeletonText animated={true} style={{ 'width': '140px' }}></IonSkeletonText>
                </IonThumbnail>
                <br />
            </div>
            <div style={{ paddingLeft: '40%' }}>
                <IonThumbnail slot="start">
                    <IonSkeletonText animated={true} style={{ 'width': '240px' }}></IonSkeletonText>
                </IonThumbnail>
            </div>
            <br />
            <div style={{ paddingLeft: '30%' }}>
                <IonThumbnail slot="start">
                    <IonSkeletonText animated={true} style={{ 'width': '280px' }}></IonSkeletonText>
                </IonThumbnail>
            </div>
            <br />
            <div>
                <IonThumbnail slot="start">
                    <IonSkeletonText animated={true} style={{ 'width': '240px' }}></IonSkeletonText>
                </IonThumbnail>
                <br />
                <IonThumbnail slot="start">
                    <IonSkeletonText animated={true} style={{ 'width': '170px' }}></IonSkeletonText>
                </IonThumbnail>
                <br />
            </div>
            <div>
                <IonThumbnail slot="start">
                    <IonSkeletonText animated={true} style={{ 'width': '200px' }}></IonSkeletonText>
                </IonThumbnail>
                <br />
                <IonThumbnail slot="start">
                    <IonSkeletonText animated={true} style={{ 'width': '140px' }}></IonSkeletonText>
                </IonThumbnail>
                <br />
            </div>
            <div style={{ paddingLeft: '40%' }}>
                <IonThumbnail slot="start">
                    <IonSkeletonText animated={true} style={{ 'width': '240px' }}></IonSkeletonText>
                </IonThumbnail>
            </div>
            <br />
            <div style={{ paddingLeft: '30%' }}>
                <IonThumbnail slot="start">
                    <IonSkeletonText animated={true} style={{ 'width': '280px' }}></IonSkeletonText>
                </IonThumbnail>
            </div>
            <br />
            <div>
                <IonThumbnail slot="start">
                    <IonSkeletonText animated={true} style={{ 'width': '240px' }}></IonSkeletonText>
                </IonThumbnail>
                <br />
                <IonThumbnail slot="start">
                    <IonSkeletonText animated={true} style={{ 'width': '170px' }}></IonSkeletonText>
                </IonThumbnail>
                <br />
            </div>
        </div>
        // <IonList>
        //     <IonItem>
        //         <IonThumbnail slot="start">
        //             <IonSkeletonText animated={true}></IonSkeletonText>
        //         </IonThumbnail>
        //         <IonLabel>
        //             <h3>
        //                 <IonSkeletonText animated={true} style={{ 'width': '80%' }}></IonSkeletonText>
        //             </h3>
        //             <p>
        //                 <IonSkeletonText animated={true} style={{ 'width': '60%' }}></IonSkeletonText>
        //             </p>
        //             <p>
        //                 <IonSkeletonText animated={true} style={{ 'width': '30%' }}></IonSkeletonText>
        //             </p>
        //         </IonLabel>
        //     </IonItem>
        //     <IonItem>
        //         <IonThumbnail slot="start">
        //             <IonSkeletonText animated={true}></IonSkeletonText>
        //         </IonThumbnail>
        //         <IonLabel>
        //             <h3>
        //                 <IonSkeletonText animated={true} style={{ 'width': '80%' }}></IonSkeletonText>
        //             </h3>
        //             <p>
        //                 <IonSkeletonText animated={true} style={{ 'width': '60%' }}></IonSkeletonText>
        //             </p>
        //             <p>
        //                 <IonSkeletonText animated={true} style={{ 'width': '30%' }}></IonSkeletonText>
        //             </p>
        //         </IonLabel>
        //     </IonItem>
        //     <IonItem>
        //         <IonThumbnail slot="start">
        //             <IonSkeletonText animated={true}></IonSkeletonText>
        //         </IonThumbnail>
        //         <IonLabel>
        //             <h3>
        //                 <IonSkeletonText animated={true} style={{ 'width': '80%' }}></IonSkeletonText>
        //             </h3>
        //             <p>
        //                 <IonSkeletonText animated={true} style={{ 'width': '60%' }}></IonSkeletonText>
        //             </p>
        //             <p>
        //                 <IonSkeletonText animated={true} style={{ 'width': '30%' }}></IonSkeletonText>
        //             </p>
        //         </IonLabel>
        //     </IonItem>
        //     <IonItem>
        //         <IonThumbnail slot="start">
        //             <IonSkeletonText animated={true}></IonSkeletonText>
        //         </IonThumbnail>
        //         <IonLabel>
        //             <h3>
        //                 <IonSkeletonText animated={true} style={{ 'width': '80%' }}></IonSkeletonText>
        //             </h3>
        //             <p>
        //                 <IonSkeletonText animated={true} style={{ 'width': '60%' }}></IonSkeletonText>
        //             </p>
        //             <p>
        //                 <IonSkeletonText animated={true} style={{ 'width': '30%' }}></IonSkeletonText>
        //             </p>
        //         </IonLabel>
        //     </IonItem>
        //     <IonItem>
        //         <IonThumbnail slot="start">
        //             <IonSkeletonText animated={true}></IonSkeletonText>
        //         </IonThumbnail>
        //         <IonLabel>
        //             <h3>
        //                 <IonSkeletonText animated={true} style={{ 'width': '80%' }}></IonSkeletonText>
        //             </h3>
        //             <p>
        //                 <IonSkeletonText animated={true} style={{ 'width': '60%' }}></IonSkeletonText>
        //             </p>
        //             <p>
        //                 <IonSkeletonText animated={true} style={{ 'width': '30%' }}></IonSkeletonText>
        //             </p>
        //         </IonLabel>
        //     </IonItem>
        //     <IonItem>
        //         <IonThumbnail slot="start">
        //             <IonSkeletonText animated={true}></IonSkeletonText>
        //         </IonThumbnail>
        //         <IonLabel>
        //             <h3>
        //                 <IonSkeletonText animated={true} style={{ 'width': '80%' }}></IonSkeletonText>
        //             </h3>
        //             <p>
        //                 <IonSkeletonText animated={true} style={{ 'width': '60%' }}></IonSkeletonText>
        //             </p>
        //             <p>
        //                 <IonSkeletonText animated={true} style={{ 'width': '30%' }}></IonSkeletonText>
        //             </p>
        //         </IonLabel>
        //     </IonItem>
        //     <IonItem>
        //         <IonThumbnail slot="start">
        //             <IonSkeletonText animated={true}></IonSkeletonText>
        //         </IonThumbnail>
        //         <IonLabel>
        //             <h3>
        //                 <IonSkeletonText animated={true} style={{ 'width': '80%' }}></IonSkeletonText>
        //             </h3>
        //             <p>
        //                 <IonSkeletonText animated={true} style={{ 'width': '60%' }}></IonSkeletonText>
        //             </p>
        //             <p>
        //                 <IonSkeletonText animated={true} style={{ 'width': '30%' }}></IonSkeletonText>
        //             </p>
        //         </IonLabel>
        //     </IonItem>
        //     <IonItem>
        //         <IonThumbnail slot="start">
        //             <IonSkeletonText animated={true}></IonSkeletonText>
        //         </IonThumbnail>
        //         <IonLabel>
        //             <h3>
        //                 <IonSkeletonText animated={true} style={{ 'width': '80%' }}></IonSkeletonText>
        //             </h3>
        //             <p>
        //                 <IonSkeletonText animated={true} style={{ 'width': '60%' }}></IonSkeletonText>
        //             </p>
        //             <p>
        //                 <IonSkeletonText animated={true} style={{ 'width': '30%' }}></IonSkeletonText>
        //             </p>
        //         </IonLabel>
        //     </IonItem>
        //     <IonItem>
        //         <IonThumbnail slot="start">
        //             <IonSkeletonText animated={true}></IonSkeletonText>
        //         </IonThumbnail>
        //         <IonLabel>
        //             <h3>
        //                 <IonSkeletonText animated={true} style={{ 'width': '80%' }}></IonSkeletonText>
        //             </h3>
        //             <p>
        //                 <IonSkeletonText animated={true} style={{ 'width': '60%' }}></IonSkeletonText>
        //             </p>
        //             <p>
        //                 <IonSkeletonText animated={true} style={{ 'width': '30%' }}></IonSkeletonText>
        //             </p>
        //         </IonLabel>
        //     </IonItem>
        //     <IonItem>
        //         <IonThumbnail slot="start">
        //             <IonSkeletonText animated={true}></IonSkeletonText>
        //         </IonThumbnail>
        //         <IonLabel>
        //             <h3>
        //                 <IonSkeletonText animated={true} style={{ 'width': '80%' }}></IonSkeletonText>
        //             </h3>
        //             <p>
        //                 <IonSkeletonText animated={true} style={{ 'width': '60%' }}></IonSkeletonText>
        //             </p>
        //             <p>
        //                 <IonSkeletonText animated={true} style={{ 'width': '30%' }}></IonSkeletonText>
        //             </p>
        //         </IonLabel>
        //     </IonItem>
        // </IonList>
    )
}