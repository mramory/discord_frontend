'use client'

import { useEffect, useRef, useState } from "react"
import Message from "../Message/Message"
import s from "./MessagesList.module.scss"
import { MessagesApiService } from "@/api/messages/messagesApi.service"
import { MessageType } from "@/types/Message"
import { pusherClient } from "@/libs/pusher"

interface MessageListProps {
    conversationId: string
}

export default function MessagesList({conversationId}: MessageListProps) {

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
            {messages?.map((message: MessageType, index: number, messages: MessageType[]) => <Message key={message.id} index={index} prevMessage={messages[index !== 0 ? index-1 : index]} message={message} />)}
            <div ref={bottomRef}></div>
        </div>
    )
}