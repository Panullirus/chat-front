import { DateChat } from "src/packages/interfaces";

export default function ChatWithDaySeparator(props: DateChat) {

    function validarFormatoFecha(fecha: string): boolean {
        const regex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
        return regex.test(fecha);
    }

    const data = validarFormatoFecha(props.date)

    if (!data) {
        return null
    }

    return (
        <div style={{
            display: 'grid',
            placeItems: 'center'
        }}>
            <span style={{
                backgroundColor: 'blueviolet',
                borderRadius: 50,
                padding: 10,
                color: "#ffe2ea"
            }}>{props?.date}</span>
        </div>
    );
}