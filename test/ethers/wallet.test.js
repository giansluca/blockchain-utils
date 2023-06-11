const { expect } = require("chai");
const { wallet1, wallet2 } = require("../../src/ethers/wallet");
const { Wallet, HDNodeWallet } = require("ethers");

describe("wallets", () => {
    describe("wallet 1", () => {
        it("should be an instance of wallet", () => {
            expect(wallet1).to.be.instanceof(Wallet);
        });

        it("should unlock the expected address", () => {
            expect(wallet1.address).to.be.equals("0x5409ED021D9299bf6814279A6A1411A7e866A631");
        });
    });
    describe("wallet 2", () => {
        it("should be an instance of wallet", () => {
            expect(wallet2).to.be.instanceof(HDNodeWallet);
        });

        it("should unlock the expected address", () => {
            expect(wallet2.address).to.be.equals("0x88E9DD325BA8329dDD9825c1d24e8470b25575C1");
        });
    });
});
