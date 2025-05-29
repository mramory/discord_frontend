'use server';

import { cookies } from "next/headers";
import { AllFriendsPage } from "./all/components/AllFriendsPage/AllFriendsPage";

export default async function MyPage() {  
  const friends = await fetch('http://localhost:9200/friends', {
    headers: {
      'Authorization': `Bearer ${cookies().get('AccessToken')?.value}`
    },
    next: {tags: ['friends']}
  }).then(res => res.json());

  return (
    <AllFriendsPage online={true} initFriends={friends} />
  );
}
