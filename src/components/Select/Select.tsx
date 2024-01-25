"use client"

import { FC, useState } from "react"
import s from "./Select.module.scss"
import {BsChevronDown} from "react-icons/bs"
import { FieldValues, Path, PathValue, UseFormRegister, UseFormSetValue } from "react-hook-form"

interface SelectProps {
    options: Array<string | number>,
    placeholder?: string,
    register: UseFormRegister<FieldValues>,
    id: string,
    required?: boolean,
    setValue: UseFormSetValue<FieldValues>
}

function Select({options, placeholder, register, id, required, setValue}: SelectProps) {

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [selectValue, setSelectValue] = useState<string | number>("")

    const toggleIsOpen = () => {
        setIsOpen(prev => !prev)
    }

    const selectOption = (option: string | number) => {
        setSelectValue(option)
        setValue(id, option, {shouldValidate: true})
        setIsOpen(false)
    }

    const onClose = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        setIsOpen(false)
    }

    return(
        <>
            {isOpen && <div onClick={onClose} className={s.closer}></div>}
            <div className={s.container}>
                {isOpen && <div className={s.options_container}>
                    {options.map(opt => {
                        return(
                            <div key={opt} onClick={() => selectOption(opt)} className={s.option}>{opt}</div>
                        )
                    })}
                </div>
                }
                <div onClick={toggleIsOpen} className={s.input_container}>
                    <input {...register(id, {required})} onChange={(e) => setSelectValue(e.target.value)} value={selectValue} placeholder={placeholder} className={s.input} />
                    <BsChevronDown className={s.chevron} />
                </div>
            </div>
        </>
    )
}

export default Select