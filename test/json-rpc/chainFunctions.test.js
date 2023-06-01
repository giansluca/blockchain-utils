const { expect } = require("chai");
const { getBalance, getBlockByNumber, getCurrentBlockNumber } = require("../../src/json-rpc/chainFunctions");

describe("Json-Rpc", function () {
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

        // Then
        expect(balance.result).to.not.be.undefined;
    });

    it("should get current block number", async function () {
        // Given - When
        const currentBlockNumber = await getCurrentBlockNumber();

        console.log(currentBlockNumber.result);
        console.log(parseInt(currentBlockNumber.result));

        // Then
        expect(currentBlockNumber.result).to.not.be.undefined;
    });
});
