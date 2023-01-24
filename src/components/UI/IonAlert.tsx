import { useIonAlert } from "@ionic/react"
import { AlertProps } from "../../packages/interfaces";

export default function Alert(props: AlertProps){

    const [presentAlert] = useIonAlert();

    return(
        presentAlert({
            header: props?.content,
            subHeader: props?.subTitle,
            message: props?.content,
            buttons: ['OK']
        })
    )
}