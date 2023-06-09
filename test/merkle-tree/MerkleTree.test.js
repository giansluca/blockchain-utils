const { expect } = require("chai");
const crypto = require("crypto");
const { MerkleTree, verifyProof } = require("../../src/merkle-tree/MerkleTree");

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

    it("should create a root from three leaves: [A,B,C]", function () {
        // Given
        const leaves = ["A", "B", "C"];
        const concat = (a, b) => `Hash(${a} + ${b})`;

        // When
        const merkleTree = new MerkleTree(leaves, concat);

        // Then
        expect(merkleTree.getRoot()).to.be.equal("Hash(Hash(A + B) + C)");
    });

    it("should create a root from five leaves: [A,B,C,D,E]", function () {
        // Given
        const leaves = ["A", "B", "C", "D", "E"];
        const concat = (a, b) => `Hash(${a} + ${b})`;

        // When
        const merkleTree = new MerkleTree(leaves, concat);

        // Then
        expect(merkleTree.getRoot()).to.be.equal("Hash(Hash(Hash(A + B) + Hash(C + D)) + E)");
    });

    it("should create a root from seven leaves: [A,B,C,D,E,F,G]", function () {
        // Given
        const leaves = ["A", "B", "C", "D", "E", "F", "G"];
        const concat = (a, b) => `Hash(${a} + ${b})`;

        // When
        const merkleTree = new MerkleTree(leaves, concat);

        // Then
        expect(merkleTree.getRoot()).to.be.equal("Hash(Hash(Hash(A + B) + Hash(C + D)) + Hash(Hash(E + F) + G))");
    });

    describe("merkle proof", function () {
        // Given
        const leaves = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
        const root = "eb100814abc896ab18bcf6c37b6550eeadeae0c312532286a4cf4be132ace526";
        const merkleHashTree = new MerkleTree(leaves.map(sha256), concatHash);
        const merkleLettersTree = new MerkleTree(leaves, concatLetters);

        describe("for each leaf", function () {
            leaves.forEach((leaf, i) => {
                it(`should return a proof that calculates the root from leaf ${leaves[i]}`, function () {
                    // When
                    const proof = merkleHashTree.getProof(i);
                    const hashedProof = hashProof(leaf, proof).toString("hex");

                    if (hashedProof !== root) {
                        const lettersProof = merkleLettersTree.getProof(i);

                        console.log(
                            "The resulting hash of your proof is wrong. \n" +
                                `We were expecting: ${root} \n` +
                                `We received: ${hashedProof} \n` +
                                `In ${leaves.join("")} Merkle tree, the proof of ${leaves[i]} you gave us is: \n` +
                                `${JSON.stringify(lettersProof, null, 2)}`
                        );
                    }

                    // Then
                    expect(hashedProof).to.be.equal(root);
                });
            });
        });
    });

    describe("merkle proof verification", function () {
        // Given
        const concat = (a, b) => `Hash(${a} + ${b})`;
        const leaves = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];
        const root =
            "Hash(Hash(Hash(Hash(A + B) + Hash(C + D)) + Hash(Hash(E + F) + Hash(G + H))) + Hash(Hash(I + J) + K))";

        describe("untampered proofs", function () {
            // When
            const tree = new MerkleTree(leaves.slice(0), concat);

            leaves.forEach((leaf, i) => {
                it(`should verify the proof for leaf index ${i}`, function () {
                    const proof = tree.getProof(i);
                    const verified = verifyProof(proof, leaves[i], root, concat);

                    // Then
                    expect(verified).to.be.true;
                });
            });
        });

        describe("tampered proofs", function () {
            // When
            const tree = new MerkleTree(leaves.slice(0), concat);

            it("should not verify the proof verifying a different node with a proof", function () {
                const proof = tree.getProof(2);
                const verified = verifyProof(proof, leaves[3], root, concat);

                // Then
                expect(verified).to.be.false;
            });

            it("should not verify the proof verifying a different root", function () {
                const proof = tree.getProof(2);
                const badRoot =
                    "Hash(Hash(Hash(Hash(A + C) + Hash(C + D)) + Hash(Hash(E + F) + Hash(G + H))) + Hash(Hash(I + J) + K))";

                const verified = verifyProof(proof, leaves[2], badRoot, concat);

                // Then
                expect(verified).to.be.false;
            });

            it("should not verify the proof flipping a nodes position", function () {
                const proof = tree.getProof(3);
                proof[1].left = !proof[1].left;

                const verified = verifyProof(proof, leaves[3], root, concat);

                // Then
                expect(verified).to.be.false;
            });

            it("should not verify the proof editing a hash", function () {
                const proof = tree.getProof(5);
                proof[2].data = "Q";

                const verified = verifyProof(proof, leaves[5], root, concat);

                // Then
                expect(verified).to.be.false;
            });
        });
    });
});

// use the crypto module to create a sha256 hash from the data passed in
function sha256(data) {
    return crypto.createHash("sha256").update(data).digest();
}

// the concat function we use to hash together merkle leaves
function concatHash(left, right) {
    if (!left) throw new Error("The concat function expects two hash arguments, the first was not received.");
    if (!right) throw new Error("The concat function expects two hash arguments, the second was not received.");

    const buffers = [left, right];
    return sha256(Buffer.concat(buffers));
}

// the concat function we use to show the merkle root calculation
function concatLetters(left, right) {
    return `Hash(${left} + ${right})`;
}

// given a proof, finds the merkle root
function hashProof(node, proof) {
    let data = sha256(node);
    for (let i = 0; i < proof.length; i++) {
        const buffers = proof[i].left ? [proof[i].data, data] : [data, proof[i].data];
        data = sha256(Buffer.concat(buffers));
    }

    return data;
}
