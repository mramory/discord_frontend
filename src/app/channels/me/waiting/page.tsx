import { cookies } from "next/headers";
import WaitingList from "./components/WaitingList/WaitingList";


export default async function Page() {
    const waiting = await fetch('http://localhost:9200/friends/req', {
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${cookies().get('AccessToken')?.value}`
        },
        next: {tags: ['friendsRequests']}
      }).then(res => res.json());
    
    return(
        <div>
            Waiting
            <WaitingList initialData={waiting} />
        </div>
    )
}