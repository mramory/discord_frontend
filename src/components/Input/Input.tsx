import { CSSProperties, DetailedHTMLProps, InputHTMLAttributes } from "react"
import { FieldValues, Path, UseFormRegister } from "react-hook-form"
import s from "./Input.module.scss"

interface InputProps<T> extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label: string,
    placeholder?: string,
    type?: string,
    id: Path<T extends FieldValues ? T : any>,
    style?: CSSProperties,
    required?: boolean,
    register: UseFormRegister<T extends FieldValues ? T : any>,
    error?: string
}

function Input<T>({ label, placeholder, type, id, style, required, register, error, ...inputProps }: InputProps<T>) {
    return(
      <div style={style} className={s.container}>
        <label>{label}{required ? <span className={s.required}> *</span> : null}</label>

        <input type={type} {...register(id, { required })} id={id} placeholder={placeholder} {...inputProps}></input>

        {error ? <span className={s.error}>{error}</span> : null}
      </div>
    )
}

export default Input