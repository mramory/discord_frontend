import requestInstance from "@/api/requestInstance";
import { FriendRequestType } from "@/types/Friend";
import WaitingList from "./components/WaitingList/WaitingList";


export default async function Page() {
    const waiting = await requestInstance<FriendRequestType[]>('/friends/req', {
      next: { tags: ['friendsRequests'] },
    });

    return(
      <div>
        Waiting
        <WaitingList initialData={Array.isArray(waiting) ? waiting : []} />
      </div>
    )
}