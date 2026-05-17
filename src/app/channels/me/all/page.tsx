import requestInstance from "@/api/requestInstance";
import { UserType } from "@/types/User";
import { AllFriendsPage } from "./components/AllFriendsPage/AllFriendsPage";

export default async function Page() {
    const friends = await requestInstance<UserType[]>('/friends', {
      next: { tags: ['friends'] },
    });

    return(
      <AllFriendsPage initFriends={Array.isArray(friends) ? friends : []} />
    )
}