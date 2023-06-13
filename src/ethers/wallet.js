const ethers = require("ethers");
const { Wallet, parseEther } = ethers;

// create a wallet with a private key
const wallet1 = new Wallet("0xf2f48ee19680706196e2e339e5da3491186e0c4c5030670656b0e0164837257d");

// create a wallet from mnemonic
const wallet2 = Wallet.fromPhrase("plate lawn minor crouch bubble evidence palace fringe bamboo laptop dutch ice");

const signaturePromise = wallet1.signTransaction({
    value: parseEther("1"),
    to: "0xdD0DC6FB59E100ee4fA9900c2088053bBe14DE92",
    gasLimit: 21000,
});

module.exports = {
    wallet1: wallet1,
    wallet2: wallet2,
    signaturePromise: signaturePromise,
};
