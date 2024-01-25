import { Settings } from "@/app/channels/me/components/Settings/Settings"
import { createContext, useCallback, useReducer, useState, Dispatch } from "react"

type ContextType = {
    isOpen: boolean
    toggleIsOpen: (e: KeyboardEvent) => void
}

export const SettingsContext = createContext<ContextType>({
    isOpen: false,
    toggleIsOpen: () => {},
})


type StateType = {
    page: string
}
export enum Type {
    CHANGE_PAGE = "CHANGE_PAGE"
}
type ActionType = {
    type: Type
    payload: string
}
export function reducer(state: StateType, action: ActionType) {
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



export function SettingsContextComponent({children}: {children: React.ReactNode}) {

    const [isOpen, setIsOpen] = useState<boolean>(false)

    const toggleIsOpen = useCallback((e: KeyboardEvent | MouseEvent) => {
        if(e.type === 'click' || (e as KeyboardEvent).key === 'Escape'){
            setIsOpen(prev => !prev)
        }
    }, [])

    return(
        <SettingsContext.Provider value={{toggleIsOpen, isOpen}}>
            {children}
            {isOpen && <Settings />}
        </SettingsContext.Provider>
    )
}

