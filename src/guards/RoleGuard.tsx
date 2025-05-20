import { useSelector } from "react-redux";
import { appRoleSelector } from "@/selectors/AppSelectors";
import { ERole } from "@/types/App/Enums";
import { IWithChildren } from "@/types/App/UtilTypes";

interface IRoleGuardProps extends IWithChildren {
    allowedRoles: ERole[]
}

const RoleGuard = ({ children, allowedRoles }: IRoleGuardProps) => {
    const role = useSelector(appRoleSelector);

    if (!allowedRoles.includes(role)) {
        return null;
    }

    return children;
}

const AdminRoleGuard = ({ children }: IWithChildren) => {
    return <RoleGuard allowedRoles={[ERole.ADMIN]}>{children}</RoleGuard>
}

export { AdminRoleGuard };
