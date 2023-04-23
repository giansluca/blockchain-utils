class Transaction {
    constructor(inputUTXOs, outputUTXOs) {
        this.inputUTXOs = inputUTXOs;
        this.outputUTXOs = outputUTXOs;
    }

    execute() {
        for (const inUTXO of this.inputUTXOs) {
            if (inUTXO.spent) throw new Error("UTXO already spent");
        }

        console.log("OK");
    }
}

module.exports = Transaction;
