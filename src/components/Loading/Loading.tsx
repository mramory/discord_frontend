import s from "./Loading.module.scss";
import Image from "next/image";

export const Loading = () => {
  return (
    <div className={s.container}>
      <Image
        priority={true}
        width={300}
        height={300}
        alt="Loading..."
        src="/logoSpin.gif"
      />
    </div>
  );
};

