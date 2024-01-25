import { Metadata } from "next";
import { MySidebar } from "../components/MySidebar/MySidebar";
import { UserInfoSidebar } from "./components/UserInfoSidebar/UserInfoSidebar";
import { ConversationApiService } from "@/api/conversation/conversationApi.service";
import serverAxiosInstance from "@/api/serverInstance";


export const metadata: Metadata = {
    title: "Conversation",
    description: "Conversation",
  };
  
  export default async function MainLayout({
    children,
    params 
  }: {
    children: React.ReactNode;
    params: { conversation: string }
  }) {

    const conversation = await serverAxiosInstance.get(`conversation/${params.conversation}`)
    .then(res => res.data)
    // await ConversationApiService.getConversation(params.conversation)
    return(
        <>
            <MySidebar />
            {children}
            <UserInfoSidebar conversation={conversation} />
        </>
    ) 
  }