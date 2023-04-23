class BTCTransaction {
    constructor(inputUTXOs, outputUTXOs) {
        this.inputUTXOs = inputUTXOs;
        this.outputUTXOs = outputUTXOs;
    }

    execute() {
        for (const inUTXO of this.inputUTXOs) {
            if (inUTXO.spent) throw new Error("UTXO already spent");
        }

        let totalInputValue = 0;
        let totalOutputValue = 0;
        this.inputUTXOs.forEach((item) => (totalInputValue += item.amount));
        this.outputUTXOs.forEach((item) => (totalOutputValue += item.amount));

        if (totalInputValue < totalOutputValue) throw new Error("Total UTXOs input is less than total UTXOs output");
    }
}

module.exports = BTCTransaction;
