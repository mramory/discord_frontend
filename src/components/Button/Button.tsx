import React, { CSSProperties, FC } from "react"
import s from "./Button.module.scss"
import clsx from "clsx"

interface ButtonProps {
    children: React.ReactNode,
    type?: "submit" | "button" | undefined,
    style?: CSSProperties,
    onClick?: () => void,
    form?: string
}

const Button: FC<ButtonProps> = ({children, type, style, onClick, form}) => {
    return(
        <button form={form} onClick={onClick} style={style} type={type} className={s.button}>{children}</button>
    )
}

export default Button