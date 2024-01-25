"use client"

import { useCallback, useState } from "react"
import Login from "./Login/Login"
import Register from "./Register/Register"

type Variant = "LOGIN" | "REGISTER"

const AuthComponent = () => {

    const [variant, setVariant] = useState<Variant>("LOGIN")

    const toggleVariant = useCallback(() => {
        if(variant === "LOGIN"){
            setVariant("REGISTER")
        }
        else{
            setVariant("LOGIN")
        }
    }, [variant])

    return(
        <>
            {
            variant === "LOGIN" ? 
            <Login toggleVariant={toggleVariant} />
            :
            <Register toggleVariant={toggleVariant} />
            }
        </>
    )
}

export default AuthComponent