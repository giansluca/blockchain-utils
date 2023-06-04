const { expect } = require("chai");
const {
    getBalance,
    getBlockByNumber,
    getCurrentBlockNumber,
    getTransactionCount,
    getBlockTransactionsCount,
    getTotalBalance,
} = require("../../src/json-rpc/chainFunctions");

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
        const transactionCount = await getTransactionCount(address);
        const parsedCount = parseInt(transactionCount.result);

        // Then
        expect(parsedCount).to.not.be.undefined;
    });

    it("should get block transactions", async function () {
        // Given
        const blockNumber = 16642379;

        // When
        const blockTransactionsCount = await getBlockTransactionsCount(blockNumber);
        const parsedCount = parseInt(blockTransactionsCount.result);

        // Then
        expect(parsedCount).to.not.be.undefined;
    });

    it("should get total addresses balance", async function () {
        // Given
        const addresses = [
            "0x830389b854770e9102eb957379c6b70da4283d60",
            "0xef0613ab211cfb5eeb5a160b65303d6e927f3f85",
            "0x5311fce951684e46cefd804704a06c5133030dff",
            "0xe01c0bdc8f2a8a6220a4bed665ceeb1d2c716bcb",
            "0xf6c68965cdc903164284b482ef5dfdb640d9e0de",
        ];

        // When
        const totalBalance = await getTotalBalance(addresses);

        // Then
        expect(totalBalance).to.not.be.undefined;
    });
});
