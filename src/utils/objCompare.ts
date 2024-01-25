export const shallowCompare = (obj1: { [key: string | number]: any }, obj2: { [key: string | number]: any }) =>
    Object.keys(obj1).length === Object.keys(obj2).length &&
    Object.keys(obj1).every(key =>
        obj2.hasOwnProperty(key) && obj1[key] === obj2[key]
    );