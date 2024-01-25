import { useTestQuery } from "./authApi"


export const useCustomHook = () => {
    const {data, isLoading, error} = useTestQuery()
    const newData = data?.message.toUpperCase()

    return {newData, isLoading, error}
}