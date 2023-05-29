const axios = require("axios");
const config = require("../config");

const ALCHEMY_URL = config.secret.alchemyUrl;

async function getBlockByNumber() {
    const { data } = await axios.post(ALCHEMY_URL, {
        jsonrpc: "2.0",
        id: 1,
        method: "eth_getBlockByNumber",
        params: [
            "0xb443", // block 46147
            false, // retrieve the full transaction object in transactions array
        ],
    });

    console.log(data);
}

async function getBalance() {
    const { data } = await axios.post(ALCHEMY_URL, {
        jsonrpc: "2.0",
        id: 1,
        method: "eth_getBalance",
        params: ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"],
    });

    console.log(data);
}

getBlockByNumber();
getBalance();
