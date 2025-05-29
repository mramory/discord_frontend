import { z } from "zod";

interface IRegisterFormModel {
  email: string;
  password: string;
  name: string;
  viewName: string;
  day: string;
  month: string;
  year: string;
}

const MONTH_TO_NUMBER: Record<string, number> = {
    "январь": 1,
    "февраль": 2,
    "март": 3,
    "апрель": 4,
    "май": 5,
    "июнь": 6,
    "июль": 7,
    "август": 8,
    "сентябрь": 9,
    "октябрь": 10,
    "ноябрь": 11,
    "декабрь": 12,
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
    day: z.string(),
    month: z.string(),
    year: z.string(),
});

export { MONTH_TO_NUMBER, regExpForPass, registerSchema };
export type { IRegisterFormModel };

