const { Wallet, InfuraProvider } = require("ethers");
const config = require("../config");

async function sendEther({ amount, to }) {
    const provider = new InfuraProvider("sepolia", config.secret.infuraApiKey);
    const signer = new Wallet(config.secret.accountPrivateKey, provider);

    const gasLimit = 21000;
    const gasPrice = 1000000000;

    // sign and send
    const tx = await signer.sendTransaction({
        value: amount,
        to: to,
        gasLimit: `0x${gasLimit.toString(16)}`,
        gasPrice: `0x${gasPrice.toString(16)}`,
    });

    return tx;
}

async function findMyBalance() {
    const provider = new InfuraProvider("sepolia", config.secret.infuraApiKey);
    const signer = new Wallet(config.secret.accountPrivateKey, provider);

    const balance = await provider.getBalance(signer.getAddress());
    return balance;
}

module.exports = {
    sendEther: sendEther,
    findMyBalance: findMyBalance,
};
