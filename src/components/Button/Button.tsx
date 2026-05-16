import clsx from "clsx"
import React, { CSSProperties, FC } from "react"
import s from "./Button.module.scss"

interface ButtonProps {
    children: React.ReactNode,
    type?: "submit" | "button" | undefined,
    style?: CSSProperties,
    onClick?: () => void,
    form?: string,
    className?: string
}

const Button: FC<ButtonProps> = ({ children, type, style, onClick, form, className }) => {
    return(
      <button form={form} onClick={onClick} style={style} type={type} className={clsx(s.button, className)}>{children}</button>
    )
}

export default Button