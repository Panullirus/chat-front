import { ContainerProps } from "src/packages/interfaces"

export default function ProfileContainer(props: ContainerProps): JSX.Element {
    return (
        <div style={{
            display: 'grid',
            placeItems: 'center'
        }}>
            {props.children}
        </div>
    )
}