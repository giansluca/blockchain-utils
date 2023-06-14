const { Wallet, InfuraProvider } = require("ethers");
const config = require("../config");

async function sendEther({ amount, to }) {
    const provider = new InfuraProvider("sepolia", config.secret.infuraApiKey);
    const signer = new Wallet(config.secret.accountPrivateKey, provider);

    // sign and send
    const tx = await signer.sendTransaction({
        value: amount,
        to: to,
        gasLimit: 0x5208,
        gasPrice: 0x3b9aca00,
    });

    return tx;
}

module.exports = sendEther;
