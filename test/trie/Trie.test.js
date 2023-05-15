const { expect } = require("chai");
const Trie = require("../../src/trie/Trie");
const TrieNode = require("../../src/trie/TrieNode");

describe("Trie", () => {
    it("should have a root trie node", () => {
        // Given - When
        const trie = new Trie("A");

        // Then
        expect(trie.root).to.be.instanceof(TrieNode);
    });

    describe("with a single word", () => {
        it("should connect the root to the first letter", () => {
            // Given
            const trie = new Trie();
            trie.insert("HEY");

            // When
            const firstNode = trie.root.children["H"];

            // Then
            expect(firstNode.key).to.be.equals("H");
            expect(firstNode.children["E"]).to.exist;
            expect(firstNode.isWord).to.be.false;
        });
    });
});
