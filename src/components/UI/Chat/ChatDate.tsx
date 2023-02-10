import { DateChat } from "src/packages/interfaces";



export default function ChatWithDaySeparator(props: DateChat): JSX.Element {

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