const { expect } = require("chai");
const { wallet1, wallet2, signaturePromise } = require("../../src/ethers/wallet");
const { Wallet, HDNodeWallet, Transaction, encodeBytes32String } = require("ethers");

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

describe("signaturePromise", () => {
    it("should be an instance of Promise", () => {
        expect(signaturePromise).to.be.instanceof(Promise);
    });

    it("should resolve with a hexadecimal representation of the transaction", async () => {
        const hex = await signaturePromise;
        const matches = /^0x[0-9A-Fa-f]*$/.test(hex);
        if (!matches) console.log(hex);

        expect(matches).to.be.true;
    });

    describe("parsed properties", () => {
        it("should contain the properties", async () => {
            // given - when
            const hex = await signaturePromise;
            const parsed = Transaction.from(hex);

            // then
            expect(parsed.to).to.be.equals("0xdD0DC6FB59E100ee4fA9900c2088053bBe14DE92");
            expect(parsed.value.toString()).to.be.equal("1000000000000000000");
            expect(parsed.gasLimit).to.be.equal(21000n);
            expect(parsed.from).to.be.equal("0x5409ED021D9299bf6814279A6A1411A7e866A631");
        });
    });
});
