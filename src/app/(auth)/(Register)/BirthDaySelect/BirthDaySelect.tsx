import Select from "@/components/Select/Select"
import s from "./BirthDaySelect.module.scss"
import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form"
import { FC } from "react"

const days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
const month = ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"]
const years = [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000]

interface BirthDaySelectProps {
    register: UseFormRegister<FieldValues>,
    setValue: UseFormSetValue<FieldValues>
}

function BirthDaySelect({register, setValue}: BirthDaySelectProps) {
    return(
        <div className={s.container}>
            <label>ДАТА РОЖДЕНИЯ<span> *</span></label>
            <div className={s.selectors}>
                <Select setValue={setValue} id="day" register={register} placeholder="День" options={days} />
                <Select setValue={setValue} id="month" register={register} placeholder="Месяц" options={month} />
                <Select setValue={setValue} id="year" register={register} placeholder="Год" options={years} />
            </div>
        </div>
    )
}

export default BirthDaySelect