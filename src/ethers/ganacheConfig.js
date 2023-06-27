const { parseEther } = require("ethers");
const ganache = require("ganache");

const ACCOUNT_PRIVATE_KEY = "0xf2f48ee19680706196e2e339e5da3491186e0c4c5030670656b0e0164837257d";
const ETH = "10";
const ACCOUNT_INITIAL_BALANCE = `0x${parseEther(ETH).toString(16)}`;

// create our test account from the private key, initialize it with 10 ether
const accountsSetUp = [].concat([
    {
        balance: ACCOUNT_INITIAL_BALANCE,
        secretKey: ACCOUNT_PRIVATE_KEY,
    },
]);

const options = { accounts: accountsSetUp };
const ganacheProvider = ganache.provider(options);

module.exports = {
    ACCOUNT_INITIAL_BALANCE: ACCOUNT_INITIAL_BALANCE,
    ACCOUNT_PRIVATE_KEY: ACCOUNT_PRIVATE_KEY,
    ganacheProvider: ganacheProvider,
};
