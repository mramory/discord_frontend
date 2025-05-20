import s from "./style.module.scss";
import { IWithChildren } from "@/types/App/UtilTypes";

const AuthLayout = ({ children }: IWithChildren) => {
  return (
    <div className={s.backgound_image}>
      {children}
    </div>
  );
};

export default AuthLayout;
