/* Day 4: High-Entropy Passphrases */
const fs = require('fs');
const input = fs.readFileSync('./inputs/day4.txt', 'utf-8').split('\n');

let areAnagrams = (a, b) => {
    if (a.length !== b.length) {
        return false;
    }
    a = a.split('').sort();
    b = b.split('').sort();
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
};


let isValidPassphrasePart1 = (passphrase) => {
    let words = passphrase.split(/\s/);
    for (let i = 0; i < words.length; i++) {
        for (let j = i + 1; j < words.length; j++) {
            if (words[i].localeCompare(words[j]) === 0) {
                return false;
            }
        }
    }
    return true;
};

let isValidPassphrasePart2 = (passphrase) => {
    let words = passphrase.split(/\s/);
    for (let i = 0; i < words.length; i++) {
        for (let j = i + 1; j < words.length; j++) {
            if (areAnagrams(words[i], words[j])) {
                return false;
            }
        }
    }
    return true;
};

/**
 * Part 1
 *
 * A new system policy has been put in place that requires all accounts to use a passphrase instead of simply a password. A passphrase consists of a series of words (lowercase letters)
 * separated by spaces.
 *
 * To ensure security, a valid passphrase must contain no duplicate words.
 *
 * For example:
 *
 * aa bb cc dd ee is valid.
 * aa bb cc dd aa is not valid - the word aa appears more than once.
 * aa bb cc dd aaa is valid - aa and aaa count as different words.
 *
 * The system's full passphrase list is available as your puzzle input.
 *
 * How many passphrases are valid?
 *
 * Your puzzle answer was 477.
 */
(() => {
    let valid = 0;
    for (let i = 0; i < input.length; i++) {
        if (isValidPassphrasePart1(input[i])) {
            valid++;
        }
    }
    console.log('number of passphrases', input.length, 'valid:', valid);
})();

/**
 * Part 2
 *
 * For added security, yet another system policy has been put in place. Now, a valid passphrase must contain no two words that are anagrams of each other - that is, a
 * passphrase is invalid if any word's letters can be rearranged to form any other word in the passphrase.
 *
 * For example:

 * abcde fghij is a valid passphrase.
 * abcde xyz ecdab is not valid - the letters from the third word can be rearranged to form the first word.
 * a ab abc abd abf abj is a valid passphrase, because all letters need to be used when forming another word.
 * iiii oiii ooii oooi oooo is valid.
 * oiii ioii iioi iiio is not valid - any of these words can be rearranged to form any other word.
 *
 * Under this new system policy, how many passphrases are valid?
 *
 * Your puzzle answer was 167.
 */
(() => {
    let valid = 0;
    for (let i = 0; i < input.length; i++) {
        if (isValidPassphrasePart2(input[i])) {
            valid++;
        }
    }
    console.log('number of passphrases', input.length, 'valid:', valid);
})();