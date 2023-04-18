const { expect } = require("chai");
const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { hashSha256, hashKeccak256, signSecp256k1, getAddressFromPublicKey } = require("../../src/utils/cryptography");
const { Signature } = secp256k1;

describe("Cryptography", function () {
    describe("Hash Message", function () {
        it("should hash a message with sha256 algorithm", async function () {
            // Given
            const message = "hello world";

            // When
            const hash = hashSha256(message);
            console.log(`hex sha256 hash of: '${message}' is: ${toHex(hash)} `);

            // Then
            expect(hash).to.not.null;
            expect(hash).to.be.a("Uint8Array");
            expect(hash).to.have.lengthOf(32);
        });

        it("should hash a message with keccak256 algorithm", async function () {
            // Given
            const message = "hello world";

            // When
            const hash = hashKeccak256(message);

            console.log(`hex Keccak256 hash of: '${message}' is: ${toHex(hash)} `);

            // Then
            expect(hash).to.not.null;
            expect(hash).to.be.a("Uint8Array");
            expect(hash).to.have.lengthOf(32);
        });
    });

    describe("Sign Message", function () {
        it("should sign a hash with secp256k1 algorithm and recover public key", async function () {
            // Given
            const PRIVATE_KEY = "6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e";
            const publicKey = secp256k1.getPublicKey(PRIVATE_KEY);
            const message = "hello world";

            // When
            const hash = hashKeccak256(message);
            const signature = signSecp256k1(hash, PRIVATE_KEY);

            const recoveredPublicKey = signature.recoverPublicKey(hash).toRawBytes();
            const isVerified = secp256k1.verify(signature, hash, recoveredPublicKey);

            // Then
            expect(isVerified).to.be.true;
            expect(recoveredPublicKey).has.length(33);
            expect(toHex(publicKey)).to.be.equal(toHex(recoveredPublicKey));
        });
    });

    describe("Sign Message", function () {
        it("should extract the Ethereum address from decompressed public key", async function () {
            // Given
            const PRIVATE_KEY = "6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e";
            const EXPECTED_ADDRESS = "16bB6031CBF3a12B899aB99D96B64b7bbD719705";
            const unCompressedPublicKey = secp256k1.getPublicKey(PRIVATE_KEY, false);

            // When
            const address = getAddressFromPublicKey(unCompressedPublicKey);

            // Then
            expect(unCompressedPublicKey).has.length(65);
            expect(address).has.length(20);
            expect(toHex(address).toUpperCase()).to.be.equal(EXPECTED_ADDRESS.toUpperCase());
        });

        it("should extract the Ethereum address from compressed public key", async function () {
            // Given
            const PRIVATE_KEY = "6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e";
            const EXPECTED_ADDRESS = "16bB6031CBF3a12B899aB99D96B64b7bbD719705";
            const compressedPublicKey = secp256k1.getPublicKey(PRIVATE_KEY);

            // When
            const address = getAddressFromPublicKey(compressedPublicKey);

            // Then
            expect(compressedPublicKey).has.length(33);
            expect(address).has.length(20);
            expect(toHex(address).toUpperCase()).to.be.equal(EXPECTED_ADDRESS.toUpperCase());
        });

        it("should generate key, sign and verify", async function () {
            // Given - When
            const privateKey = secp256k1.utils.randomPrivateKey();
            const publicKey = secp256k1.getPublicKey(privateKey, false);
            const address = getAddressFromPublicKey(publicKey);

            console.log("private key:", toHex(privateKey), `- ${privateKey.length} bytes`);
            console.log("public key:", toHex(publicKey), `- ${publicKey.length} bytes`);
            console.log("address:", toHex(address), `- ${address.length} bytes`);

            // Then
            expect(privateKey).has.length(32);
            expect(publicKey).has.length(65);
            expect(address).has.length(20);

            // Given - When
            const message = { text: "this is a very important message", important: true };
            const messageHash = hashKeccak256(JSON.stringify(message));

            const signature = signSecp256k1(messageHash, privateKey);
            const signatureHex = signature.toCompactHex();
            const recoveryBit = signature.recovery;
            console.log("signature:", signatureHex, `- ${signature.toCompactRawBytes().length} bytes`);

            // Then
            expect(signature.toCompactRawBytes()).has.length(64);

            // Given - When
            const isVerifiedTrue = secp256k1.verify(signatureHex, messageHash, publicKey);
            console.log("verified yes:", isVerifiedTrue);

            const badMessage = { text: "this is a very bad important message", important: true };
            const badMessageHash = hashKeccak256(JSON.stringify(badMessage));
            const isVerifiedFalse = secp256k1.verify(signatureHex, badMessageHash, publicKey);
            console.log("verified no", isVerifiedFalse);

            // Then
            expect(isVerifiedTrue).to.be.true;
            expect(isVerifiedFalse).to.be.false;

            // Given - When
            const signatureFromHex = Signature.fromCompact(signatureHex).addRecoveryBit(recoveryBit);
            const recoveredPublicKey = signatureFromHex.recoverPublicKey(messageHash).toRawBytes(false);
            console.log("recovered public key:", toHex(recoveredPublicKey), `- ${recoveredPublicKey.length} bytes`);

            // Then
            expect(toHex(publicKey)).to.be.equal(toHex(recoveredPublicKey));
        });
    });
});
