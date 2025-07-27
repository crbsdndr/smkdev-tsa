const HASH = 257;
const MOD = 1000000007;

class HashSegmentTree {
    /**
        * Initializes a segment tree for storing hash values.
        * @param {number} n - The size of the input string.
    */
    constructor(n) {
        this.n = n;
        this.tree = new Array(2 * n).fill(0);
    }

    /**
        * Updates the segment tree at a specific index with a new value.
        * @param {number} index - The index in the original array (0-based).
        * @param {number} value - The value to update at the specified index.
    */
    update(index, value) {
        index += this.n
        this.tree[index] = value % MOD
        while (index > 1) {
            index = Math.floor(index / 2)
            this.tree[index] = (this.tree[index * 2] + this.tree[index * 2 + 1]) % MOD
        }
    }

    /**
        * Queries the segment tree for the sum of values in a given range.
        * @param {number} l - The starting index of the range (0-based).
        * @param {number} r - The ending index of the range (0-based).
        * @returns {number} - The sum of values in the range [l, r].
    */
    query(l, r) {
        let result = 0;
        l += this.n;
        r += this.n + 1;

        if (l > r) {
            return 0;
        }

        while (l < r) {
            if (l % 2 === 1) {
                result = (result + this.tree[l]) % MOD;
                l++
            }

            if (r % 2 === 1) {
                r--
                result = (result + this.tree[r]) % MOD
            }

            l = Math.floor(l / 2)
            r = Math.floor(r / 2)
        }

        return result;
    }
}

/**
    * Initializes hash powers for a given string length.
    * @param {number} length - The length of the input string.
    * @returns {number[]} - An array where hashPower[i] = HASH^i % MOD.
*/
function initializeHashPowers(length) {
    const hashPower = [1]
    for (let i = 1; i < length; i++) {
        hashPower.push((hashPower[i - 1] * HASH) % MOD)
    }

    return hashPower
}

/**
    * Initializes the forward and backward hash segment trees for a given string.
    * @param {number} n - The length of the input string.
    * @param {string} s - The input string.
    * @param {number[]} hashPower - Precomputed hash powers for the string.
    * @returns {Object} - An object containing the forward and backward hash segment trees.
*/
function initializeHashTables(n, s, hashPower) {
    const fwdHash = new HashSegmentTree(n)
    const bckHash = new HashSegmentTree(n)

    for (let i = 0; i < n; i++) {
        const code = s.charCodeAt(i)
    
        const fwdVal = (code * hashPower[i]) % MOD
        const bckVal = (code * hashPower[n - 1 - i]) % MOD

        fwdHash.update(i, fwdVal)
        bckHash.update(i, bckVal)
    }
    
    return { fwdHash, bckHash };
}

/**
    * Processes a list of operations on the input string and returns the results.
    * @param {number} n - The length of the input string.
    * @param {Array} operations - A list of operations to perform. Each operation is an array:
    *   - [1, index, char] to update the character at `index` (1-based) to `char`.
    *   - [2, left, right] to check if the substring from `left` to `right` (1-based) is a palindrome.
    * @param {string} s - The input string.
    * @returns {string[]} - An array of results for palindrome queries ("YES" or "NO").
*/
function processOperations(n, operations, s) {
    // YOUR CODE HERE
}

module.exports = {
    HashSegmentTree,
    initializeHashPowers,
    initializeHashTables,
    processOperations,
};