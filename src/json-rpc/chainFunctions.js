const axios = require("axios");
const config = require("../config");

const ALCHEMY_URL = config.secret.alchemyUrl;

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

module.exports = {
    getBlockByNumber: getBlockByNumber,
    getBalance: getBalance,
    getCurrentBlockNumber: getCurrentBlockNumber,
    getTransactionCount: getTransactionCount,
    getBlockTransactionsCount: getBlockTransactionsCount,
    getTotalBalance: getTotalBalance,
};
