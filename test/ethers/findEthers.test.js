const { expect } = require("chai");
const { BrowserProvider, Wallet, formatEther, parseEther } = require("ethers");
const { ACCOUNT_PRIVATE_KEY, ganacheProvider } = require("../../src/ethers/ganacheConfig");
const { findEther } = require("../../src/ethers/findEther");

const provider = new BrowserProvider(ganacheProvider);
const signer = new Wallet(ACCOUNT_PRIVATE_KEY, provider);
let ACCOUNT_ADDRESS;
let ACCOUNT_BALANCE;

function rpc(method) {
    return new Promise((resolve) => {
        ganacheProvider.send({ id: 1, jsonrpc: "2.0", method }, () => {
            resolve();
        });
    });
}

const stopMiner = () => rpc("miner_stop");
const mineBlock = () => rpc("evm_mine");

describe("check ganache", () => {
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

describe("find ether", () => {
    const expected = [];
    const sendEther = async (i) => {
        const address = Wallet.createRandom().address;
        await signer.sendTransaction({
            value: parseEther("0.5"),
            to: address,
            nonce: i,
        });
        expected.push(address);
    };

    beforeEach(async () => {
        ACCOUNT_ADDRESS = await signer.getAddress();
        ACCOUNT_BALANCE = await provider.getBalance(ACCOUNT_ADDRESS);

        await stopMiner();
        let i = 0;

        // block 1
        for (; i < 3; i++) {
            await sendEther(i);
        }
        await mineBlock();

        // block 2
        for (; i < 7; i++) {
            await sendEther(i);
        }
        await mineBlock();

        // block 3
        for (; i < 10; i++) {
            await sendEther(i);
        }
        await mineBlock();
    });

    it("should find all the addresses", async () => {
        // Given - When
        const actual = await findEther(ACCOUNT_ADDRESS);

        // Then
        expect(actual.length).to.be.equal(expected.length);
        expect(actual).to.have.same.members(expected);
    });
});
