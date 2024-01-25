import Image from "next/image";
import s from "./Avatar.module.scss";
import clsx from "clsx";

interface AvatarProps {
  text?: string;
  img?: string;
  width?: number;
  height?: number;
  contWidth?: number;
  contHeight?: number;
  changeable?: boolean;
  changeableGreen?: boolean;
  round?: boolean;
  onclick?: () => void;
  children?: React.ReactNode;
  showOnline?: boolean
  online?: boolean;
}

export const Avatar = ({
  children,
  text,
  img,
  width = 48,
  height = 48,
  contWidth = 48,
  contHeight = 48,
  changeable = false,
  changeableGreen = false,
  round,
  onclick,
  online,
  showOnline
}: AvatarProps) => {
  return (
    <div
      onClick={onclick}
      className={clsx(
        s.container,
        changeable && s.on_change,
        changeableGreen && s.on_change_green
      )}
      style={{ width: contWidth + "px", height: contHeight + "px" }}
    >
      {img ? (
        showOnline ? (
          <div className={s.imgContainer}>
            <Image
              width={width}
              height={height}
              className={clsx(s.img, round && s.round)}
              src={img}
              alt="name"
            />
            <div className={s.isOnline}>
              <div className={clsx(online ? s.online : s.offline)}></div>
            </div>
          </div>
        ) : (
          <Image
            width={width}
            height={height}
            className={clsx(s.img, round && s.round)}
            src={img}
            alt="name"
          />
        )
      ) : text ? (
        text
      ) : (
        children
      )}
    </div>
  );
};
