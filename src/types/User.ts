

type BirthdayType = {
    day: number,
    month: string,
    year: number
}

export type UserType = {
    id: number,
    email: string,
    password: string,
    name: string,
    viewName?: string,
    birthday: BirthdayType,
    createdAt: string,
    img: string
}

