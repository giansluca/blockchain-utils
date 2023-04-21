const { expect } = require("chai");
const TXO = require("../../src/blockchain/TXO");

describe("TXO", function () {
    it("should set 'owner' 'amount' and 'spent' properties", function () {
        // Given
        const address = "1DBS97W3jWw6FnAqdduK1NW6kFo3Aid1N6";
        const amount = 10;

        // When
        const txo = new TXO(address, amount);
        txo.spend();

        // Then
        expect(txo.owner).to.be.equal(address);
        expect(txo.amount).to.be.equal(amount);
        expect(txo.spent).to.true;
    });
});
