import VideoConversation from "@/components/VideoConversation/VideoConversation";


export default function VideoPage({params}: {params: { conversationId: string }}) {
    return(
        <VideoConversation conversationId={params.conversationId} />
    )
}