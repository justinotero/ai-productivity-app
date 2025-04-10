import stringUtils from '../string.utils';

describe('String Utilities', () => {
  describe('toTitleCase', () => {
    describe('basic functionality', () => {
      it('should capitalize the first letter of each word', () => {
        expect(stringUtils.toTitleCase('hello world')).toBe('Hello World');
        expect(stringUtils.toTitleCase('the quick brown fox')).toBe('The Quick Brown Fox');
      });

      it('should handle single word inputs', () => {
        expect(stringUtils.toTitleCase('hello')).toBe('Hello');
        expect(stringUtils.toTitleCase('world')).toBe('World');
      });
    });

    describe('edge cases', () => {
      it('should handle empty strings', () => {
        expect(stringUtils.toTitleCase('')).toBe('');
      });

      it('should preserve multiple spaces between words', () => {
        expect(stringUtils.toTitleCase('hello   world')).toBe('Hello   World');
        expect(stringUtils.toTitleCase('  hello  world  ')).toBe('  Hello  World  ');
      });
    });

    describe('special cases', () => {
      it('should handle strings with special characters as word boundaries', () => {
        expect(stringUtils.toTitleCase('hello-world')).toBe('Hello-World');
        expect(stringUtils.toTitleCase('hello.world')).toBe('Hello.World');
        expect(stringUtils.toTitleCase('hello_world')).toBe('Hello_World');
      });

      it('should preserve specific proper nouns exactly as defined', () => {
        expect(stringUtils.toTitleCase('hello McDonalds world')).toBe('Hello McDonalds World');
      });

      it('should convert words with uppercase letters to all caps', () => {
        expect(stringUtils.toTitleCase('hello iOS world')).toBe('Hello IOS World');
        expect(stringUtils.toTitleCase('hello NASA program')).toBe('Hello NASA Program');
      });

      it('should handle alphanumeric combinations', () => {
        expect(stringUtils.toTitleCase('hello 123 world')).toBe('Hello 123 World');
        expect(stringUtils.toTitleCase('web3 development')).toBe('Web3 Development');
      });
    });
  });

  describe('isTitleCase', () => {
    describe('basic validation', () => {
      it('should return true for strings already in title case', () => {
        expect(stringUtils.isTitleCase('Hello World')).toBe(true);
        expect(stringUtils.isTitleCase('The Quick Brown Fox')).toBe(true);
      });

      it('should return false for strings not in title case', () => {
        expect(stringUtils.isTitleCase('hello world')).toBe(false);
        expect(stringUtils.isTitleCase('Hello world')).toBe(false);
      });
    });

    describe('edge cases', () => {
      it('should handle empty strings as valid title case', () => {
        expect(stringUtils.isTitleCase('')).toBe(true);
      });
    });

    describe('special cases', () => {
      it('should validate proper nouns and acronyms correctly', () => {
        expect(stringUtils.isTitleCase('Hello McDonalds World')).toBe(true);
        expect(stringUtils.isTitleCase('Hello IOS World')).toBe(true);
        expect(stringUtils.isTitleCase('Hello iOS World')).toBe(false);
      });

      it('should validate strings with special characters', () => {
        expect(stringUtils.isTitleCase('Hello-World')).toBe(true);
        expect(stringUtils.isTitleCase('Hello_World')).toBe(true);
        expect(stringUtils.isTitleCase('hello-World')).toBe(false);
      });
    });
  });
}); 