import requestInstance from "@/api/requestInstance";
import { UserType } from "@/types/User";
import Search from "./components/Search/Search";
import UsersList from "./components/UsersList/UsersList";
import s from "./page.module.scss";

export default async function Page() {
    const users = await requestInstance<UserType[]>('/user/getAll');

    return(
      <div className={s.container}>
        <p className={s.add}>ДОБАВИТЬ В ДРУЗЬЯ</p>

        <p className={s.info}>Вы можете добавить друзей по имени пользователя</p>

        <Search />

        <UsersList users={Array.isArray(users) ? users : []} />
      </div>
    )
}