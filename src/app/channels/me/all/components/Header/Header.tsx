import { SetStateAction, Dispatch } from "react";
import Search from "../Search/Search";
import s from "./Header.module.scss"

interface HeaderProps {
    amount: number,
    setSearch: Dispatch<SetStateAction<string>>
}

const Header = function Header({amount, setSearch}: HeaderProps) {
    return(
        <div>
            <Search setSearch={setSearch} />
            <p className={s.amount}>ВСЕГО ДРУЗЕЙ - {amount}</p>
        </div>
    )

}

export default Header