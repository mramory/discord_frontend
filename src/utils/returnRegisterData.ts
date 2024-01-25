

export const returnRegisterData = (data: any) => {
    return {
        email: data.email,
        password: data.password,
        name: data.name,
        viewName: data.viewName,
        birthday: {
            day: data.day,
            month: data.month,
            year: data.year
        }
    }
}