const TrieNode = require("./TrieNode");

class Trie {
    constructor() {
        this.root = new TrieNode(null);
    }

    insert(word) {
        let current = this.root;

        for (let i = 0; i < word.length; i++) {
            const character = word.charAt(i);
            if (!current.children[character]) {
                current.children[character] = new TrieNode(character);
            }

            current = current.children[character];
        }

        current.isWord = true;
    }

    contains(word) {
        let current = this.root;

        for (let i = 0; i < word.length; i++) {
            const character = word.charAt(i);
            if (!current.children[character]) return false;

            current = current.children[character];
        }

        return current.isWord;
    }
}

module.exports = Trie;
