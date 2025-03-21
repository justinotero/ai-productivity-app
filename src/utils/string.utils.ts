const toTitleCase = (str: string): string => {
  // Split on word boundaries including special characters
  return str.replace(/[A-Za-z][^\s-_.]*/g, (word) => {
    // Special cases for proper nouns
    if (word === 'McDonalds') {
      return word;
    }
    // Handle acronyms (words that are all uppercase except maybe the first letter)
    if (word.slice(1).toUpperCase() === word.slice(1)) {
      return word.toUpperCase();
    }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
};

const isTitleCase = (str: string): boolean => {
    if (str === toTitleCase(str)) {
        return true;
    } else {
        return false;
    }
};

export default {
    toTitleCase,
    isTitleCase
};
