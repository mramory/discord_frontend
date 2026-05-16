'use client'

import { useEffect, useRef, useState } from "react"
import { MessagesApiService } from "@/api/messages/messagesApi.service"
import { useTypedSelector } from "@/hooks/useTypedSelector"
import { pusherClient } from "@/libs/pusher"
import { MessageType } from "@/types/Message"
import { ExportToCSV } from "../ExportToCSV/ExportToCSV"
import Message from "../Message/Message"
import s from "./MessagesList.module.scss"

interface MessageListProps {
    conversationId: string
}

export default function MessagesList({ conversationId }: MessageListProps) {
    const role = useTypedSelector((state) => state.auth.role);

    const bottomRef = useRef<HTMLDivElement>(null);

    const [messages, setMessages] = useState<MessageType[]>([])

    const newMessageHandler = (newMessage: MessageType) => {
        setMessages(prev => [...prev, newMessage])
    }

    useEffect(() => {
        (async() => {
            const res = await MessagesApiService.getAllMessages(conversationId)
            setMessages(res)
        })()
        pusherClient.subscribe(`conversation__${conversationId}`)
        pusherClient.bind("newMessage", newMessageHandler)
    }, [])

    useEffect(() => {
        bottomRef.current?.scrollIntoView()
    }, [messages])

    return(
      <div className={s.container}>
        {role === "ADMIN" ? <ExportToCSV data={messages} /> : null}

        {messages?.map((message: MessageType, index: number, messages: MessageType[]) => <Message key={message.id} index={index} prevMessage={messages[index !== 0 ? index - 1 : index]} message={message} />)}

        <div ref={bottomRef}></div>
      </div>
    )
}