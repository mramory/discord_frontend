"use client"

import { MouseEvent, useState } from "react"
import { FieldValues, Path, PathValue, UseFormRegister, UseFormSetValue } from "react-hook-form"
import { BsChevronDown } from "react-icons/bs"
import s from "./Select.module.scss"

interface SelectProps<T extends FieldValues> {
    options: PathValue<T, Path<T>>[],
    placeholder?: string,
    register: UseFormRegister<T>,
    id: Path<T>,
    required?: boolean,
    setValue: UseFormSetValue<T>
}

function Select<T extends FieldValues>({ options, placeholder, register, id, required, setValue }: SelectProps<T>) {

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [selectValue, setSelectValue] = useState<string | number>("")

    const toggleIsOpen = () => {
        setIsOpen(prev => !prev)
    }

    const selectOption = (option: PathValue<T, Path<T>>) => {
        setSelectValue(option)
        setValue(id, option, { shouldValidate: true })
        setIsOpen(false)
    }

    const onClose = (e: MouseEvent<HTMLDivElement>) => {
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
            <input {...register(id, { required })} onChange={(e) => setSelectValue(e.target.value)} value={selectValue} placeholder={placeholder} className={s.input} />

            <BsChevronDown className={s.chevron} />
          </div>
        </div>
      </>
    )
}

export default Select