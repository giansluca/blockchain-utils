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

        it("should connect the root to the second letter", () => {
            // Given
            const trie = new Trie();
            trie.insert("HEY");

            // When
            const firstNode = trie.root.children["H"];
            const secondNode = firstNode.children["E"];

            // Then
            expect(secondNode.key).to.be.equals("E");
            expect(secondNode.children["Y"]).to.exist;
            expect(secondNode.isWord).to.be.false;
        });

        it("should connect the root to the third letter", () => {
            // Given
            const trie = new Trie();
            trie.insert("HEY");

            // When
            const firstNode = trie.root.children["H"];
            const secondNode = firstNode.children["E"];
            const thirdNode = secondNode.children["Y"];

            // Then
            expect(thirdNode.key).to.be.equals("Y");
            expect(Object.keys(thirdNode.children).length).to.be.equal(0);
            expect(thirdNode.isWord).to.be.true;
        });
    });

    describe("with three words", () => {
        let trie = new Trie();
        let words = ["helipad", "hello", "hermit"];

        trie.insert("helipad");
        trie.insert("hello");
        trie.insert("hermit");

        words.forEach((word) => {
            describe(`for ${word}`, () => {
                it("should connect to the final letter", () => {
                    const splitWord = word.split("");
                    const finalNode = splitWord.reduce((node, letter) => node.children[letter], trie.root);

                    expect(finalNode).to.exist;
                    expect(finalNode.isWord).to.be.true;
                });
            });
        });
    });
});
