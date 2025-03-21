import stringUtils from '../string.utils';

describe('toTitleCase', () => {
  it('should capitalize the first letter of each word', () => {
    expect(stringUtils.toTitleCase('hello world')).toBe('Hello World');
    expect(stringUtils.toTitleCase('the quick brown fox')).toBe('The Quick Brown Fox');
  });

  it('should handle single word inputs', () => {
    expect(stringUtils.toTitleCase('hello')).toBe('Hello');
    expect(stringUtils.toTitleCase('world')).toBe('World');
  });

  it('should handle empty strings', () => {
    expect(stringUtils.toTitleCase('')).toBe('');
  });

  it('should handle strings with multiple spaces', () => {
    expect(stringUtils.toTitleCase('hello   world')).toBe('Hello   World');
    expect(stringUtils.toTitleCase('  hello  world  ')).toBe('  Hello  World  ');
  });

  it('should handle strings with special characters as word boundaries', () => {
    expect(stringUtils.toTitleCase('hello-world')).toBe('Hello-World');
    expect(stringUtils.toTitleCase('hello.world')).toBe('Hello.World');
    expect(stringUtils.toTitleCase('hello_world')).toBe('Hello_World');
  });

  it('should preserve specific proper nouns', () => {
    expect(stringUtils.toTitleCase('hello McDonalds world')).toBe('Hello McDonalds World');
  });

  it('should convert words with uppercase letters to all caps', () => {
    expect(stringUtils.toTitleCase('hello iOS world')).toBe('Hello IOS World');
    expect(stringUtils.toTitleCase('hello NASA program')).toBe('Hello NASA Program');
  });

  it('should handle numbers in strings', () => {
    expect(stringUtils.toTitleCase('hello 123 world')).toBe('Hello 123 World');
    expect(stringUtils.toTitleCase('web3 development')).toBe('Web3 Development');
  });
});

describe('isTitleCase', () => {
  it('should return true for strings already in title case', () => {
    expect(stringUtils.isTitleCase('Hello World')).toBe(true);
    expect(stringUtils.isTitleCase('The Quick Brown Fox')).toBe(true);
  });

  it('should return false for strings not in title case', () => {
    expect(stringUtils.isTitleCase('hello world')).toBe(false);
    expect(stringUtils.isTitleCase('Hello world')).toBe(false);
  });

  it('should handle empty strings', () => {
    expect(stringUtils.isTitleCase('')).toBe(true);
  });

  it('should handle special cases correctly', () => {
    expect(stringUtils.isTitleCase('Hello McDonalds World')).toBe(true);
    expect(stringUtils.isTitleCase('Hello IOS World')).toBe(true);
    expect(stringUtils.isTitleCase('Hello iOS World')).toBe(false);
  });

  it('should handle special characters', () => {
    expect(stringUtils.isTitleCase('Hello-World')).toBe(true);
    expect(stringUtils.isTitleCase('Hello_World')).toBe(true);
    expect(stringUtils.isTitleCase('hello-World')).toBe(false);
  });
}); 