const TrieNode = require("./TrieNode");

class Trie {
    constructor() {
        this.root = new TrieNode(null);
    }

    insert(word) {
        for (let i = 0; i < word.length; i++) {
            const character = word.charAt(i);
            const isLastChar = i == word.length - 1;

            console.log(isLastChar);

            this._insert(this.root, character, isLastChar);
        }
    }

    _insert(previousNode, character, isLastChar) {
        if (isObjEmpty(previousNode.children)) {
            previousNode.children[character] = new TrieNode(character);
            if (isLastChar) previousNode.children[character].isWord = true;

            return;
        } else {
            const firstKey = Object.keys(previousNode.children)[0];
            this._insert(previousNode.children[firstKey], character, isLastChar);
        }
    }
}

function isObjEmpty(object) {
    return Object.keys(object).length === 0;
}

module.exports = Trie;
