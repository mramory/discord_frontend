import { z } from "zod";

interface IRegisterFormModel {
  email: string;
  password: string;
  name: string;
  viewName: string;
  day: number;
  month: string;
  year: number;
}

const regExpForPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/gm

const registerSchema = z.object({
    email: z.string().email("Неверный формат email").min(1, "Email обязателен"),
    password: z.string().min(1, "Пароль обязателен").regex(
        regExpForPass, 
        "Пароль должен содержать не менее 8 символов, включая хотя бы одно число и включает как строчные, так и прописные буквы и включать хотя бы один специальный символ: #, ?, !."
    ),
    name: z.string().min(1, "Поле обязательно"),
    viewName: z.string().startsWith("@", "Отображаемое имя должно начинаться с @"),
});

export { registerSchema };
export type { IRegisterFormModel };

