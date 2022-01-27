// Object.keys returns keys as strings, but for type safety we want
// to keep the original keys type:
export const getKeys = Object.keys as <T extends object>(
  obj: T
) => Array<keyof T>;
