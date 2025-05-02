import { RootState } from "@/Redux/store";

const appRoleSelector = (state: RootState) => state.auth.role;

export { appRoleSelector }