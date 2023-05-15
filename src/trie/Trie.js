const TrieNode = require("./TrieNode");

class Trie {
    constructor() {
        this.root = new TrieNode(null);
    }

    insert(word) {
        for (const character of word) {
            this._insert(this.root, character);
        }
    }

    _insert(previousNode, character) {
        if (isObjEmpty(previousNode.children)) {
            previousNode.children[character] = new TrieNode(character);
            return;
        } else {
            const firstKey = Object.keys(previousNode.children)[0];
            this._insert(previousNode.children[firstKey], character);
        }
    }
}

function isObjEmpty(object) {
    return Object.keys(object).length === 0;
}

module.exports = Trie;
