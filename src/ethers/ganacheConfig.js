const { parseEther } = require("ethers");
const ganache = require("ganache");

const PRIVATE_KEY = "0xf2f48ee19680706196e2e339e5da3491186e0c4c5030670656b0e0164837257d";
const ETH = "10";
const INITIAL_BALANCE = `0x${parseEther(ETH).toString(16)}`;

// create our test account from the private key, initialize it with 10 ether
const accountsSetUp = [].concat([
    {
        balance: INITIAL_BALANCE,
        secretKey: PRIVATE_KEY,
    },
]);

const options = { accounts: accountsSetUp };
const ganacheProvider = ganache.provider(options);

module.exports = {
    INITIAL_BALANCE: INITIAL_BALANCE,
    PRIVATE_KEY: PRIVATE_KEY,
    ganacheProvider: ganacheProvider,
};
