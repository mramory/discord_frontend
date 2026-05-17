'use server';

import requestInstance from "@/api/requestInstance";
import { UserType } from "@/types/User";
import { AllFriendsPage } from "./all/components/AllFriendsPage/AllFriendsPage";

export default async function MyPage() {
  const friends = await requestInstance<UserType[]>('/friends', {
    next: { tags: ['friends'] },
  });

  return (
    <AllFriendsPage online={true} initFriends={Array.isArray(friends) ? friends : []} />
  );
}
