'use client'

import clsx from "clsx"
import Link from "next/link"
import { useState } from "react"
import { FaUserFriends } from "react-icons/fa"
import s from "./Header.module.scss"

export default function Header() {

    const [active, setActive] = useState("")

    const clickHandle = (page: string) => {
        setActive(page)
    }

    return(
      <div className={s.container}>
        <div className={s.title}>
          <FaUserFriends size={24} />

          <span>Друзья</span>
        </div>

        <div className={s.separate}></div>

        <div className={s.btns}>
          <div onClick={() => clickHandle("/online")} className={clsx(active === "/online" && s.active)}><Link prefetch={true} href="/channels/me"><span>В сети</span></Link></div>

          <div onClick={() => clickHandle("/all")} className={clsx(active === "/all" && s.active)}><Link prefetch={true} href="/channels/me/all"><span>Все</span></Link></div>

          <div onClick={() => clickHandle("/waiting")} className={clsx(active === "/waiting" && s.active)}><Link href="/channels/me/waiting"><span>Ожидание</span></Link></div>

          <div onClick={() => clickHandle("/block")} className={clsx(active === " block" && s.active)}><span>Заблокированные</span></div>

          <div onClick={() => clickHandle("/addToFriends")} className={clsx(active === "/addToFriends" && s.active_green)}><Link prefetch={true} href="/channels/me/addToFriends"><span>Добавить в друзья</span></Link></div>
        </div>
      </div>
    )
}
