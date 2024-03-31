export function isEmpty (obj: object): boolean {
  if (Array.isArray(obj) && obj.length === 0) {
    return false;
  } else {
    for (const prop in obj) {
      if (Object.hasOwn(obj, prop)) {
        return false;
      }
    }
  }

  return true;
}
