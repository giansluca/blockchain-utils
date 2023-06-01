const { expect } = require("chai");
const { getBalance, getBlockByNumber, getCurrentBlockNumber, getNonce } = require("../../src/json-rpc/chainFunctions");

describe("Json-Rpc", function () {
    it("should get current block number", async function () {
        // Given - When
        const currentBlockNumber = await getCurrentBlockNumber();

        // Then
        expect(currentBlockNumber.result).to.not.be.undefined;
    });

    it("should get a block by number", async function () {
        // Given
        const blockNumber = 46147;
        const expectedBlock = `0x${blockNumber.toString(16)}`;

        // When
        const block = await getBlockByNumber(blockNumber);

        // Then
        expect(block).to.not.be.undefined;
        expect(block.result.number).to.be.equal(expectedBlock);
    });

    it("should get a balance by address", async function () {
        // Given
        const address = "0x407d73d8a49eeb85d32cf465507dd71d507100c1";

        // When
        const balance = await getBalance(address);
        const parsedBalance = parseInt(balance.result);

        // Then
        expect(parsedBalance).to.not.be.undefined;
    });

    it("should get transaction count", async function () {
        // Given
        const address = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";

        // When
        const nonce = await getNonce(address);
        const parsedNonce = parseInt(nonce.result);

        // Then
        expect(parsedNonce).to.not.be.undefined;
    });
});
