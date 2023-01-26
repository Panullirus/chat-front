import { MessageContent } from "../../../packages/interfaces"

export default function ChatMessageContainer(props: MessageContent): JSX.Element {

    if (props.id_usuario_envia === props.current_user) {
        return (
            <div>
                <div style={{
                    display: 'flex',
                    paddingTop: 5,
                    paddingBottom: 10,
                    paddingRight: 30
                }}>
                    <div style={{
                        wordWrap: 'break-word',
                        backgroundColor: '#f4f4f4',
                        height: 'auto',
                        marginLeft: 'auto',
                        textAlign: 'left',
                        padding: 12,
                        maxWidth: '80%',
                        color: 'white',
                        borderTopLeftRadius: 15,
                        borderBottomLeftRadius: 15,
                        WebkitBorderTopRightRadius: 15
                    }}
                        onClick={props.onSend}
                    >
                        <span style={{ fontSize: 18, overflow: 'break-all', color: '#293d66' }}>{props.contenido}
                            <br />
                            <span style={{
                                fontSize: 12,
                                color: '#ccd0dd',
                            }}>{props.hora_envio}</span>
                        </span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div style={{
                display: 'flex',
                paddingTop: 5,
                paddingBottom: 10,
                paddingLeft: 30
            }}>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    backgroundColor: '#ff0043',
                    width: 'auto',
                    height: 'auto',
                    color: '#ffe2ea',
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
                            color: '#ccd0dd',
                            paddingLeft: 30
                        }}>{props.hora_envio}</span>
                    </span>
                </div>
            </div>
        </div>
    )
}