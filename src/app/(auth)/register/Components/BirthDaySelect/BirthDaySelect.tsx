import { UseFormRegister, UseFormSetValue } from "react-hook-form"
import { IRegisterFormModel } from "../../RegisterForm/RegisterFormModel"
import s from "./BirthDaySelect.module.scss"
import Select from "@/components/Select/Select"

const DAYS_IN_MONTH = 31
const CURRENT_YEAR = 2025
const YEARS_RANGE = 24

const days = Array.from({ length: DAYS_IN_MONTH }, (_, i) => i + 1)
const month = ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"]
const years = Array.from({ length: YEARS_RANGE }, (_, i) => CURRENT_YEAR - i)

interface BirthDaySelectProps {
    register: UseFormRegister<IRegisterFormModel>,
    setValue: UseFormSetValue<IRegisterFormModel>,
}

function BirthDaySelect({ register, setValue }: BirthDaySelectProps) {
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