const { expect } = require("chai");
const MerkleTree = require("../../src/blockchain/MerkleTree");

describe("Merkle Tree", function () {
    it("should handle the base case: [A]", function () {
        // Given
        const leaves = ["A"];
        const concat = (a, b) => `Hash(${a} + ${b})`;

        // When
        const merkleTree = new MerkleTree(leaves, concat);

        // Then
        expect(merkleTree.getRoot()).to.be.equal("A");
    });

    it("should create a root from two leaves: [A,B]", function () {
        // Given
        const leaves = ["A", "B"];
        const concat = (a, b) => `Hash(${a} + ${b})`;

        // When
        const merkleTree = new MerkleTree(leaves, concat);

        // Then
        expect(merkleTree.getRoot()).to.be.equal("Hash(A + B)");
    });

    it("should create a root from four leaves: [A,B,C,D]", function () {
        // Given
        const leaves = ["A", "B", "C", "D"];
        const concat = (a, b) => `Hash(${a} + ${b})`;

        // When
        const merkleTree = new MerkleTree(leaves, concat);

        // Then
        expect(merkleTree.getRoot()).to.be.equal("Hash(Hash(A + B) + Hash(C + D))");
    });

    it("should create a root from eight leaves: [A,B,C,D,E,F,G,H]", function () {
        // Given
        const leaves = ["A", "B", "C", "D", "E", "F", "G", "H"];
        const concat = (a, b) => `Hash(${a} + ${b})`;

        // When
        const merkleTree = new MerkleTree(leaves, concat);

        // Then
        expect(merkleTree.getRoot()).to.be.equal(
            "Hash(Hash(Hash(A + B) + Hash(C + D)) + Hash(Hash(E + F) + Hash(G + H)))"
        );
    });
});
