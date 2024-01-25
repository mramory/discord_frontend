import { AlignEnum } from "@/contstants";
import s from "./Tag.module.scss";
import clsx from "clsx";

interface TagProps {
  text: string;
  align: AlignEnum;
  children: React.ReactNode;
}

export default function Tag({ text, align, children }: TagProps) {
  return (
    <div className={s.container}>
      <div
        className={clsx(
          align === AlignEnum.RIGHT && s.popup_right,
          align === AlignEnum.TOP && s.popup_top
        )}
      >
        <div className={s.triangle}></div>
        <span>{text}</span>
      </div>
      {children}
    </div>
  );
}
