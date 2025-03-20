const toTitleCase = (str: string): string => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

// const isTitleCase = (str: string): boolean => {
//     if (str === toTitleCase(str)) {
//         return true;
//     } else {
//         return false;
//     }
// };

export default {
    toTitleCase,
    // isTitleCase
};
