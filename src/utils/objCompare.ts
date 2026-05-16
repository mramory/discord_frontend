export const shallowCompare = (obj1: Record<string | number, unknown>, obj2: Record<string | number, unknown>) =>
    Object.keys(obj1).length === Object.keys(obj2).length &&
    Object.keys(obj1).every(key =>
        obj2.hasOwnProperty(key) && obj1[key] === obj2[key]
    );