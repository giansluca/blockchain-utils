const { expect } = require("chai");
const sendEther = require("../../src/ethers/sendEthers");
const { InfuraProvider, parseEther } = require("ethers");
const config = require("../../src/config");

describe("sendEther", () => {
    it.skip("should resolve with a transaction", async () => {
        // Given
        const provider = new InfuraProvider("sepolia", config.secret.infuraApiKey);
        const recipientAddress = "0x5E5967691B984F5E6549b8C5699b9F51ceD553eA"; // the third account
        const amount = "0.001"; // 0.001 ETH being sent

        // When
        const tx = await sendEther({
            value: parseEther(amount),
            to: recipientAddress,
        });

        expect(tx.to).to.be.equal("0x5E5967691B984F5E6549b8C5699b9F51ceD553eA");
        expect(tx.from).to.be.equal("0x6B2f4E6433A38CB42413dd3EcEeC31A83656BCb8");

        const receipt = await provider.waitForTransaction(tx.hash);
        expect(receipt).to.not.be.undefined;
        expect(receipt.blockNumber).to.not.be.undefined;
    });
});
