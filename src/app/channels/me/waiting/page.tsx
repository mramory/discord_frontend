'use client'

import { getFriendRequests } from "@/actions/getFriendRequests"
import WaitingList from "./components/WaitingList/WaitingList"
import { useEffect, useState } from "react"


export default async function Page() {
    const [waiting, setWaiting] = useState([])

    useEffect(() => {
        getFriendRequests().then((res) => setWaiting(res))
    }, [])
    
    return(
        <div>
            Waiting
            <WaitingList initialData={waiting} />
        </div>
    )
}