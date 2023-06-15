const { expect } = require("chai");
const { sendEther, findMyBalance } = require("../../src/ethers/sendEthers");
const { InfuraProvider, parseEther, formatEther } = require("ethers");
const config = require("../../src/config");

describe("ether operations", () => {
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

    it("should get the balance of a private key", async () => {
        // Given - When
        const balance = await findMyBalance();

        console.log(`balance is: ${formatEther(balance)}`);

        // Then
        expect(balance).to.not.be.undefined;
    });
});
