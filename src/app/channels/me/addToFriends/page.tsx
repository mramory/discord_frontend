'use client'


import { UserType } from "@/types/User"
import Search from "./components/Search/Search"
import s from "./page.module.scss"
import UserBox from "../../components/UserBox/UserBox"
import getAllUsers from "@/actions/getAllUsers"
import UsersList from "./components/UsersList/UsersList"

export default async function Page() {

    const users = await getAllUsers()

    return(
        <div className={s.container}>
            <p className={s.add}>ДОБАВИТЬ В ДРУЗЬЯ</p>
            <p className={s.info}>Вы можете добавить друзей по имени пользователя</p>
            <Search />
            <UsersList users={users} />
        </div>
    )
}