import MessageInput from "./components/MessageInput/MessageInput"
import MessagesList from "./components/MessagesList/MessagesList"
import s from "./page.module.scss"

export default function ConversationPage({ params }: {params: { conversation: string }}) {
    
    return(
      <div className={s.container}>
        <MessagesList conversationId={params.conversation} />

        <MessageInput conversationId={params.conversation} />
      </div>
    )
}
