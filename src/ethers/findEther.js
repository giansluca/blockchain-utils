const { BrowserProvider } = require("ethers");
const { ganacheProvider } = require("./ganacheConfig");

const provider = new BrowserProvider(ganacheProvider);

async function findEther() {
    const addresses = [];
    const lastBlock = await provider.getBlockNumber();

    for (let i = 1; i <= lastBlock; i++) {
        const block = await provider.getBlock(i);

        for (const txHash of block.transactions) {
            const tx = await provider.getTransaction(txHash);
            addresses.push(tx.to);
        }
    }

    return addresses;
}

module.exports = {
    findEther: findEther,
};
