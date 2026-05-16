import { IWithChildren } from "@/types/App/UtilTypes";
import s from "./style.module.scss";

const AuthLayout = ({ children }: IWithChildren) => {
  return (
    <div className={s.backgound_image}>
      {children}
    </div>
  );
};

export default AuthLayout;
