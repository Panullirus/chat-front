import { IonButton } from '@ionic/react';
import { AuthKit } from 'src/packages/auth-kit/AuthKit';

export default function LoginFirebase(): JSX.Element {

    const Auth = new AuthKit()

    const signInWithGoogle = async () => {
        await Auth.AuthLoginGoogle()
    }

    return (
        <>
            <hr />
            <IonButton onClick={signInWithGoogle}>INICIAR CON Google</IonButton>
        </>
    )

}