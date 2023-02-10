import { MessageContent } from "../../../packages/interfaces"
import IonicLoading from "../Ionic/IonicLoading"

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
                        <span style={{ fontSize: 18, overflow: 'break-spacesf', color: '#999696' }}>{props.contenido}
                            <br />
                            {props.loading ? <span style={{
                                fontSize: 12,
                                color: '#999696',
                            }}>{props.hora_envio}</span> : <IonicLoading/>}
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
                    wordWrap: 'break-word',
                    backgroundColor: '#ff0043',
                    maxWidth: '80%',
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
                        }}>{props.hora_envio}</span>
                    </span>
                </div>
            </div>
        </div>
    )
}