import Button from "@/components/Button/Button";
import s from "./Search.module.scss";

export default function Search() {
  return (
    <div className={s.container}>
      <Button
        style={{
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "auto",
          fontSize: "12px",
          padding: "8px 10px",
        }}
        children={"Отправить запрос дружбы"}
      />
      <input className={s.input} placeholder="Вы можете добавить друзей по имени пользователя" />
    </div>
  );
}
