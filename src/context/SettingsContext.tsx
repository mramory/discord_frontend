"use client";

import { Settings } from "@/app/channels/me/components/Settings/Settings";
import { createContext, useCallback, useEffect, useState } from "react";

type ContextType = {
    isOpen: boolean
    open: () => void
    close: () => void
}

export const SettingsContext = createContext<ContextType>({
    isOpen: false,
    open: () => {},
    close: () => {},
})

type StateType = {
    page: string
}

enum Type {
    CHANGE_PAGE = "CHANGE_PAGE"
}

type ActionType = {
    type: Type
    payload: string
}

function reducer(state: StateType, action: ActionType) {
    switch (action.type) {
        case "CHANGE_PAGE": {
            return {
                page: action.payload
            }
        }
        default:
            return state;
    }
}

function SettingsContextComponent({children}: {children: React.ReactNode}) {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const open = useCallback(() => {
        setIsOpen(true)
    }, [])

    const close = useCallback(() => {
        setIsOpen(false)
    }, [])

    const handleEscape = useCallback((e: KeyboardEvent) => {
        if(e.key === "Escape") {
            close()
        }
    }, [close])

    useEffect(() => {
        document.addEventListener("keydown", handleEscape);

        return () => {
          document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    return(
      <SettingsContext.Provider value={{ open, close, isOpen }}>
        {children}

        {isOpen && <Settings />}
      </SettingsContext.Provider>
    )
}

export { reducer, SettingsContextComponent, Type };

