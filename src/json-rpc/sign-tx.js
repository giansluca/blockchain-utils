const { Alchemy, Network, Wallet, Utils } = require("alchemy-sdk");
const config = require("../config");

const settings = {
    apiKey: config.secret.alchemyApyKey,
    network: Network.ETH_SEPOLIA,
};
const alchemy = new Alchemy(settings);

let wallet = new Wallet(config.secret.accountPrivateKey);

async function sendTransaction() {
    const nonce = await alchemy.core.getTransactionCount(wallet.address, "latest");

    let transaction = {
        to: "0x5E5967691B984F5E6549b8C5699b9F51ceD553eA", // the third
        value: Utils.parseEther("0.001"), // 0.001 worth of ETH being sent
        gasLimit: "21000",
        maxPriorityFeePerGas: Utils.parseUnits("5", "gwei"),
        maxFeePerGas: Utils.parseUnits("20", "gwei"),
        nonce: nonce,
        type: 2,
        chainId: 11155111, // sepolia transaction
    };
    let signedTransaction = await wallet.signTransaction(transaction);
    console.log("Raw tx: ", signedTransaction);
    let tx = await alchemy.core.sendTransaction(signedTransaction);
    console.log(`https://sepolia.etherscan.io/tx/${tx.hash}`);
}

sendTransaction();
