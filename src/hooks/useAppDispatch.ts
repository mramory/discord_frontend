import { AppDispatch } from "@/Redux/store"
import { useDispatch } from "react-redux"


type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch