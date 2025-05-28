import { cookies } from "next/headers";
import { AllFriendsPage } from "./components/AllFriendsPage/AllFriendsPage";

export default async function Page() {
    const friends = await fetch('http://localhost:9200/friends', {
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${cookies().get('AccessToken')?.value}`
        }
      }).then(res => res.json());

    return(
        <AllFriendsPage initFriends={friends} />
    )
}