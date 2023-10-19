export const findKeyByValue = (
  object: { [key: string]: string },
  valueToFind: string | undefined,
) => {
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      if (object[key] === valueToFind) {
        return key;
      }
    }
  }

  return null;
};
