import { ContainerProps } from "src/packages/interfaces";

export default function ChatFlatList(props: ContainerProps) {

    return (
        <div className="content" style={{
            height: "80vh", // O un alto específico en px    
            paddingBottom: 50
        }}>
            {props.children}
        </div>
    )
}