const { expect } = require("chai");
const BTCTransaction = require("../../src/blockchain/BTCTransaction");
const TXO = require("../../src/blockchain/TXO");

describe("BTCTransaction", function () {
    const fromAddress = "1DBS97W3jWw6FnAqdduK1NW6kFo3Aid1N6";
    const toAddress = "12ruWjb4naCME5QhjrQSJuS5disgME22fe";

    it("should execute without error with unspent input TXOs", function () {
        // Given
        const inputTXO1 = new TXO(fromAddress, 5);
        const inputTXO2 = new TXO(fromAddress, 5);
        const outputTXO1 = new TXO(toAddress, 10);

        // When - Then
        const tx = new BTCTransaction([inputTXO1, inputTXO2], [outputTXO1]);

        try {
            tx.execute();
        } catch (ex) {
            throw new Error(ex.message);
        }
    });

    it("should throw an error with a spent input TXOs", function () {
        // Given
        const txo1 = new TXO(fromAddress, 5);
        const txo2 = new TXO(fromAddress, 5);
        const txo3 = new TXO(fromAddress, 5);
        const outputTXO1 = new TXO(toAddress, 15);

        txo2.spend();

        // When
        const tx = new BTCTransaction([txo1, txo2, txo3], [outputTXO1]);

        let ex;
        try {
            tx.execute();
        } catch (_ex) {
            ex = _ex;
        }

        // Then
        expect(ex.message).to.be.equal("UTXO already spent");
    });

    it("should throw an error on execute with insufficient UTXOs", () => {
        // Given
        const txo1 = new TXO(fromAddress, 3);
        const txo2 = new TXO(fromAddress, 3);
        const txo3 = new TXO(fromAddress, 3);
        const outputTXO1 = new TXO(toAddress, 10);

        // When
        const tx = new BTCTransaction([txo1, txo2, txo3], [outputTXO1]);

        let ex;
        try {
            tx.execute();
        } catch (_ex) {
            ex = _ex;
        }

        // Then
        expect(ex.message).to.be.equal("Total UTXOs input is less than total UTXOs output");
    });
});
