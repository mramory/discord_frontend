"use client";

import { useTypedSelector } from "@/hooks/useTypedSelector";
import { UserType } from "@/types/User";
import { useEffect, useState } from "react";
import FriendBox from "../FriendBox/FriendBox";
import Header from "../Header/Header";

interface AllFriendsPageProps {
  initFriends: UserType[];
  online?: boolean;
}

export const AllFriendsPage = ({
  initFriends,
  online,
}: AllFriendsPageProps) => {
  const onlineFriendsId = useTypedSelector((state) => state.onlineUsers.usersId);

  const [onlineFriends, setOnlineFriends] = useState<UserType[]>([])


  useEffect(() => {
    const newOnlineFriends = initFriends?.filter(user => onlineFriendsId.includes(user.id.toString()))
    setOnlineFriends(newOnlineFriends)
  }, [initFriends, onlineFriendsId])


  const [friends, setFriends] = useState<UserType[]>(
    online
      ? onlineFriends
      : initFriends
  );
  console.log(friends, onlineFriends, initFriends)
  useEffect(() => {
    setFriends(online ? onlineFriends : initFriends);
  }, [online, onlineFriends, initFriends]);

  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    if (search.length > 0) {
      if(online){
        const newFriends = onlineFriends?.filter(
          (friend) => friend.name.indexOf(search) !== -1
        );
        setFriends(newFriends);
      }
      else{
        const newFriends = initFriends.filter(
          (friend) => friend.name.indexOf(search) !== -1
        );
        setFriends(newFriends);
      }
    } else setFriends(online ? onlineFriends : initFriends);
  }, [search, onlineFriends, initFriends]);

  return (
    <div>
      <Header setSearch={setSearch} amount={friends?.length || 0} />
      {friends?.map((friend: UserType) => (
        <FriendBox online={onlineFriendsId.includes(friend.id.toString())} key={friend.id} user={friend} />
      ))}
    </div>
  );
};
