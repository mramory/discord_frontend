"use client"

import BirthDaySelect from "../Components/BirthDaySelect/BirthDaySelect";
import { IRegisterFormModel } from "./RegisterFormModel";
import { useRegisterForm } from "./UseRegisterForm";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";

const RegisterForm = () => {
  const { onSubmit, register, setValue, errors } = useRegisterForm();

  return (
    <form onSubmit={onSubmit}>
      <Input<IRegisterFormModel> register={register} label="E-MAIL" required={true} id="email" error={errors.email?.message} />

      <Input<IRegisterFormModel> register={register} label="Отображаемое имя" id="viewName" error={errors.viewName?.message} />

      <Input<IRegisterFormModel> register={register} label="Имя пользователя" required={true} id="name" error={errors.name?.message} />

      <Input<IRegisterFormModel> register={register} label="Пароль" required={true} id="password" error={errors.password?.message} />

      <BirthDaySelect 
        setValue={setValue} 
        register={register}
      />

      <Button type="submit">Продолжить</Button>
    </form>
  );
};

export { RegisterForm };
