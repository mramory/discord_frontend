'use client'

import { ChangeEvent, SetStateAction, Dispatch } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import s from "./Search.module.scss";

interface SearchProps {
  setSearch: Dispatch<SetStateAction<string>>
}

const Search = function Search({ setSearch }: SearchProps) {

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  return (
    <div className={s.container}>
      <HiOutlineSearch className={s.loop} />

      <input onChange={onSearch} className={s.input} placeholder="Поиск" />
    </div>
  );
}

export default Search
