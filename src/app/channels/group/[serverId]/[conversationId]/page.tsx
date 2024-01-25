import ConversationPage from "../../../[conversation]/page";


export default function ServerPage({params}: {params: { conversationId: string}}) {
    return(
        <ConversationPage params={{conversation: params.conversationId}} />
    )
} 