import UserBox from "@/app/channels/components/UserBox/UserBox";
import { UserType } from "@/types/User";
import s from "../../page.module.scss";

interface UsersListProps {
  users: UserType[];
}

export default function UsersList({ users }: UsersListProps) {
  return (
    <>
      {users.map((user: UserType) => (
        <div key={user.id}>
          <div className={s.line}></div>
          <UserBox user={user} />
        </div>
      ))}
    </>
  );
}
