const axios = require("axios");
const config = require("../config");
const { Alchemy, Network, Wallet, Utils } = require("alchemy-sdk");

const ALCHEMY_URL = config.secret.alchemyUrl;
const ALCHEMY_API_KEY = config.secret.alchemyApyKey;
const ACCOUNT_PRIVATE_KEY = config.secret.accountPrivateKey;

async function getCurrentBlockNumber() {
    const { data } = await axios.post(ALCHEMY_URL, {
        jsonrpc: "2.0",
        id: 1,
        method: "eth_blockNumber",
    });

    return data;
}

async function getBlockByNumber(blockNumber) {
    const blockNumberHex = `0x${blockNumber.toString(16)}`;

    const { data } = await axios.post(ALCHEMY_URL, {
        jsonrpc: "2.0",
        id: 1,
        method: "eth_getBlockByNumber",
        params: [
            blockNumberHex,
            false, // retrieve the full transaction object in transactions array
        ],
    });

    return data;
}

async function getBalance(address) {
    const { data } = await axios.post(ALCHEMY_URL, {
        jsonrpc: "2.0",
        id: 1,
        method: "eth_getBalance",
        params: [address, "latest"],
    });

    return data;
}

async function getTransactionCount(address) {
    const { data } = await axios.post(ALCHEMY_URL, {
        jsonrpc: "2.0",
        id: 1,
        method: "eth_getTransactionCount",
        params: [address, "latest"],
    });

    return data;
}

async function getBlockTransactionsCount(blockNumber) {
    const blockNumberHex = `0x${blockNumber.toString(16)}`;

    const { data } = await axios.post(ALCHEMY_URL, {
        jsonrpc: "2.0",
        id: 1,
        method: "eth_getBlockTransactionCountByNumber",
        params: [blockNumberHex],
    });

    return data;
}

async function getTotalBalance(addresses) {
    const batch = [];

    let i = 0;
    for (const address of addresses) {
        const requestBody = {
            jsonrpc: "2.0",
            id: ++i,
            method: "eth_getBalance",
            params: [address, "latest"],
        };

        batch.push(requestBody);
    }

    const response = await axios.post(ALCHEMY_URL, batch);

    let totalBalance = 0;
    for (const res of response.data) {
        const parsedRes = parseInt(res.result);
        totalBalance += parsedRes;
    }

    return totalBalance;
}

async function sendTransaction(recipientAddress, amount) {
    const settings = {
        apiKey: ALCHEMY_API_KEY,
        network: Network.ETH_SEPOLIA,
    };

    const alchemy = new Alchemy(settings);
    let wallet = new Wallet(ACCOUNT_PRIVATE_KEY);
    const nonce = await alchemy.core.getTransactionCount(wallet.address, "latest");

    let transaction = {
        to: recipientAddress,
        value: Utils.parseEther(amount),
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
    return tx;
}

module.exports = {
    getBlockByNumber: getBlockByNumber,
    getBalance: getBalance,
    getCurrentBlockNumber: getCurrentBlockNumber,
    getTransactionCount: getTransactionCount,
    getBlockTransactionsCount: getBlockTransactionsCount,
    getTotalBalance: getTotalBalance,
    sendTransaction: sendTransaction,
};
