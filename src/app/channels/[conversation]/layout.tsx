'use client'

import { Metadata } from "next";
import { MySidebar } from "../components/MySidebar/MySidebar";
import { UserInfoSidebar } from "./components/UserInfoSidebar/UserInfoSidebar";
import { useEffect, useState } from "react";
import { ConversationApiService } from "@/api/conversation/conversationApi.service";


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
      const [conversation, setConversation] = useState()

      useEffect(() => {
        (async () => {
          const conversation = await ConversationApiService.getConversation(params.conversation)
          setConversation(conversation)
        })()
      }, [])

    return(
        <>
            <MySidebar />
            {children}
            {conversation ? <UserInfoSidebar conversation={conversation} /> : null}
        </>
    ) 
  }