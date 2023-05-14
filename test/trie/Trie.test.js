const { expect } = require("chai");
const Trie = require("../../src/trie/Trie");
const TrieNode = require("../../src/trie/TrieNode");

describe("Trie", () => {
    it("should have a root trie node", () => {
        // given - when
        const trie = new Trie("A");

        // then
        expect(trie.root).to.be.instanceof(TrieNode);
    });
});
