import { ProfileCardProps } from "src/packages/interfaces";

export default function ProfileCard(props: ProfileCardProps): JSX.Element {
    return (
        <div style={{
            display: 'grid',
            placeItems: 'center',
            paddingTop: '10%'
        }}>
            <img src="https://picsum.photos/80/80?random=1" alt="user" height={150} style={{
                borderRadius: 100
            }} />
            <br />
            <span style={{
                fontSize: 25,
                fontWeight: 'bold'
            }}>{props.name}</span>
        </div>
    )
}