import { MessageContent } from "../../../packages/interfaces"

export default function ChatMessageContainer(props: MessageContent): JSX.Element {

    if (props.id_usuario_envia === props.current_user) {
        return (
            <div style={{
                display: 'flex',
                paddingTop: 5,
                paddingBottom: 5,
                paddingRight: 5
            }}>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    maxWidth: '80%',
                    backgroundColor: '#2b3595',
                    height: 'auto',
                    marginLeft: 'auto',
                    textAlign: 'left',
                    padding: 12,
                    color: 'white',
                    borderTopLeftRadius: 15,
                    borderBottomLeftRadius: 15,
                    WebkitBorderTopRightRadius: 15
                }}
                    onClick={props.onSend}
                >
                    <span style={{ fontSize: 18, overflow: 'break-all' }}>{props.contenido}
                        <br />
                        <span style={{
                            fontSize: 12
                        }}>{props.hora_envio}</span>
                    </span>
                </div>
            </div>
        )
    }

    return (
        <div style={{
            display: 'flex',
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft: 5
        }}>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                backgroundColor: '#e7eaed',
                width: 'auto',
                height: 'auto',
                color: '#4f667a',
                padding: 12,
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
                borderBottomRightRadius: 15
            }}
                onClick={props.onSend}
            >
                <span style={{ fontSize: 18, overflow: 'break-spacesf' }}>{props.contenido}
                    <br />
                    <span style={{
                        fontSize: 12,
                        color: '#4f667a'
                    }}>{props.hora_envio}</span>
                </span>
            </div>
        </div>
    )
}