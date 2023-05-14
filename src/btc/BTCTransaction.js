class BTCTransaction {
    constructor(inputUTXOs, outputUTXOs) {
        this.inputUTXOs = inputUTXOs;
        this.outputUTXOs = outputUTXOs;
        this.fee = 0;
    }

    execute() {
        for (const inUTXO of this.inputUTXOs) {
            if (inUTXO.spent) throw new Error("UTXO already spent");
        }

        let totalInputValue = 0;
        let totalOutputValue = 0;
        this.inputUTXOs.forEach((inUTXO) => (totalInputValue += inUTXO.amount));
        this.outputUTXOs.forEach((outUTXO) => (totalOutputValue += outUTXO.amount));

        if (totalInputValue < totalOutputValue) throw new Error("Total UTXOs input is less than total UTXOs output");

        if (totalInputValue > totalOutputValue) {
            this.fee = totalInputValue - totalOutputValue;
        }

        this.inputUTXOs.forEach((inUTXO) => {
            inUTXO.spend();
        });
    }
}

module.exports = BTCTransaction;
