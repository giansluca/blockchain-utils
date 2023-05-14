const { expect } = require("chai");
const TrieNode = require("../../src/trie/TrieNode");

describe("TrieNode", () => {
    it("should have store a key", () => {
        // given - when
        const node = new TrieNode("a");

        // then
        expect(node.key).to.be.equal("a");
    });
    it("should have store an object `children`", () => {
        // given - when
        const node = new TrieNode();

        // then
        expect(node.children).to.be.an("object");
    });
    it("should have store a property `isWord`", () => {
        // given - when
        const node = new TrieNode();

        // then
        expect(node.isWord).to.be.false;
    });
});
