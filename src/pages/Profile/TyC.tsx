import { useState } from 'react';
import { IonButtons, IonButton, IonModal, IonHeader, IonContent, IonToolbar, IonTitle, } from '@ionic/react';

export default function TyC(): JSX.Element {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <span style={{
                fontSize: 10,
                color: 'blue',
                cursor: 'pointer'
            }}
                onClick={() => setIsOpen(true)}
            >Al registrarte aceptas los términos y condiciones</span>

            <IonModal isOpen={isOpen}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Términos y Condiciones</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={() => setIsOpen(false)}>Cerrar</IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <p>
                        Recopilación de información: Al registrarse en nuestro sitio web, se le pedirá que proporcione información personal, incluyendo nombre, correo electrónico y contraseña. La información recopilada se utilizará para proporcionar una experiencia más personalizada y para mejorar los servicios que ofrecemos.
                        <br />
                        <br />
                        Protección de datos personales: Nos tomamos muy en serio la protección de sus datos personales y nos esforzamos por garantizar que sean tratados de manera segura y confidencial. Cumple con todas las leyes y regulaciones aplicables, incluyendo la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.
                        <br />
                        <br />
                        Uso de información: La información recopilada se utilizará para proporcionar y mejorar los servicios que ofrecemos. También podemos utilizar su información para enviarle correos electrónicos con notificaciones y actualizaciones importantes.
                        <br />
                        <br />
                        Compartir información: No compartiremos su información personal con terceros sin su consentimiento explícito, a menos que se requiera por ley.
                        <br />
                        <br />
                        Cambios en estos términos y condiciones: Nos reservamos el derecho a modificar estos términos y condiciones en cualquier momento y sin previo aviso. Le recomendamos que revise periódicamente esta página para asegurarse de estar al tanto de cualquier cambio.
                        <br />
                        <br />
                        Acceso y control de su información: En cualquier momento, puede acceder, corregir o eliminar su información personal contactándonos a través de nuestro sitio web.
                        <br />
                        <br />
                        Contacto: Si tiene alguna pregunta o comentario sobre nuestra política de privacidad o sobre el manejo de su información personal, no dude en ponerse en contacto con nosotros.
                    </p>
                </IonContent>
            </IonModal>
        </>
    )
}