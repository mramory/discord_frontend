export const getCookieByKey = (key: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${key}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
}