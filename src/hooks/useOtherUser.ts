import { useTypedSelector } from "./useTypedSelector";
import { ConversationType } from "@/types/Conversation";


export const useOtherUser = (data: ConversationType) => {
    const currentUserEmail = useTypedSelector(state => state.auth.email)

    const user = data.users.filter(user => user.email !== currentUserEmail)

    return user[0]

}