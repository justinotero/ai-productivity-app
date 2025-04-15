/**
 * Converts a string to title case with special handling for proper nouns and acronyms.
 * 
 * @param str - The input string to convert
 * @returns The string in title case format
 * 
 * Special cases:
 * - Preserves specific proper nouns (e.g., "McDonalds")
 * - Converts words with uppercase letters to all caps (e.g., "iOS" → "IOS")
 * - Preserves spacing and special characters
 */
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

/**
 * Checks if a string is already in title case format.
 * 
 * @param str - The string to check
 * @returns True if the string is in title case, false otherwise
 */
const isTitleCase = (str: string): boolean => str === toTitleCase(str);

export default {
    toTitleCase,
    isTitleCase
};

const isLowercase = (str: string): boolean => str === str.toLowerCase();