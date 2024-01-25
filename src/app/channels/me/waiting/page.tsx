import { getFriendRequests } from "@/actions/getFriendRequests"
import WaitingList from "./components/WaitingList/WaitingList"


export default async function Page() {
    const waiting = await getFriendRequests()
    
    return(
        <div>
            Waiting
            <WaitingList initialData={waiting} />
        </div>
    )
}