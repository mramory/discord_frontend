import { CSSProperties } from "react"
import s from "./Input.module.scss"
import {UseFormRegister, FieldValues, FieldValue, Path} from "react-hook-form"

interface InputProps<T> {
    label: string,
    placeholder?: string,
    type?: string,
    id: Path<T extends FieldValues ? T : any>,
    style?: CSSProperties,
    required?: boolean,
    register: UseFormRegister<T extends FieldValues ? T : any>
}

function Input<T>({label, placeholder, type, id, style, required, register}: InputProps<T>) {
    return(
        <div style={style} className={s.container}>
            <label>{label}{required ? <span className={s.required}> *</span> : null}</label>
            <input type={type} {...register(id, {required})} id={id} placeholder={placeholder}></input>
        </div>
    )
}

export default Input