import { cookies } from "next/headers";
import Search from "./components/Search/Search";
import UsersList from "./components/UsersList/UsersList";
import s from "./page.module.scss";

export default async function Page() {
    const users = await fetch('http://localhost:9200/user/getAll', {
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${cookies().get('AccessToken')?.value}`
        }
      }).then(res => res.json());

    return(
        <div className={s.container}>
            <p className={s.add}>ДОБАВИТЬ В ДРУЗЬЯ</p>
            <p className={s.info}>Вы можете добавить друзей по имени пользователя</p>
            <Search />
            <UsersList users={users} />
        </div>
    )
}