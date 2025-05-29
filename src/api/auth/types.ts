type LoginArgs = {
    email: string,
    password: string
}

type RegisterArgs = {
    email: string,
    password: string,
    name: string,
    viewName: string,
    birthday: {
        day: number,
        month: number,
        year: number,
    }
}

export type { LoginArgs, RegisterArgs };
