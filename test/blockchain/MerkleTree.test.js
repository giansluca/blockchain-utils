const { expect } = require("chai");
const MerkleTree = require("../../src/blockchain/MerkleTree");

describe("Merkle Tree", function () {
    it("should create a root from two leaves: [A,B]", function () {
        // Given
        const leaves = ["A", "B"];
        const concat = (a, b) => `Hash(${a} + ${b})`;

        // When
        const merkleTree = new MerkleTree(leaves, concat);

        // Then
        expect(merkleTree.getRoot()).to.be.equal("Hash(A + B)");
    });
});
