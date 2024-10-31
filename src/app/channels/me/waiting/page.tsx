'use client'

import { getFriendRequests } from "@/actions/getFriendRequests"
import WaitingList from "./components/WaitingList/WaitingList"
import { useEffect, useState } from "react"


export default function Page() {
    const [waiting, setWaiting] = useState([])

    useEffect(() => {
        (async() => {
            const data = await getFriendRequests()
            setWaiting(data)
        })()
    }, [])
    
    return(
        <div>
            Waiting
            <WaitingList initialData={waiting} />
        </div>
    )
}