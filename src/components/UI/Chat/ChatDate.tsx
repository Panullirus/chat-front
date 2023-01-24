import { Day, MessageContent, ChatWithDaySeparatorProps } from "../../../packages/interfaces";

export default function ChatWithDaySeparator(props: ChatWithDaySeparatorProps): JSX.Element {
    let days: Day[] = [];
    let currentDay: Day | null = null;
    const messagesContainer: MessageContent[] = props.messages

    messagesContainer.forEach((message: any) => {
        const messageDate = new Date(message.hora_envio);
        const messageDay = messageDate.toLocaleDateString();

        if (!currentDay || currentDay.date !== messageDay) {
            currentDay = {
                date: messageDay,
                messages: []
            };
            days.push(currentDay);
        }
        currentDay.messages.push(message);
    });

    return (
        <>

        </>
    );
}