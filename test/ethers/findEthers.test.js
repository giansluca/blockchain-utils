const { expect } = require("chai");
const { BrowserProvider, Wallet, formatEther } = require("ethers");
const { PRIVATE_KEY, ganacheProvider } = require("../../src/ethers/ganacheConfig");

const provider = new BrowserProvider(ganacheProvider);
const signer = new Wallet(PRIVATE_KEY, provider);
let ACCOUNT_ADDRESS;
let ACCOUNT_BALANCE;

function rpc(method) {
    return new Promise((resolve, reject) => {
        ganacheProvider.send({ id: 1, jsonrpc: "2.0", method }, () => {
            resolve();
        });
    });
}

const stopMiner = () => rpc("miner_stop");
const mineBlock = () => rpc("evm_mine");

describe("findEther", () => {
    beforeEach(async () => {
        ACCOUNT_ADDRESS = await signer.getAddress();
        ACCOUNT_BALANCE = await provider.getBalance(ACCOUNT_ADDRESS);
    });

    it("setUp ganache account", async () => {
        // Given - When - Then
        expect(ACCOUNT_ADDRESS).to.be.equal("0x5409ED021D9299bf6814279A6A1411A7e866A631");
        expect(formatEther(ACCOUNT_BALANCE)).to.be.equal("10.0");
    });
});
