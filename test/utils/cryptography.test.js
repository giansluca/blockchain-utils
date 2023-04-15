const { expect } = require("chai");
const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const {
    hashSha256,
    hashKeccak256,
    signSecp256k1,
    getAddressFromPublicKey,
    decompressPublicKey,
} = require("../../src/utils/cryptography");

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
            const isSigned = secp256k1.verify(signature, hash, recoveredPublicKey);

            // Then
            expect(isSigned).to.be.true;
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
            expect(address).has.length(40);
            expect(address.toUpperCase()).to.be.equal(EXPECTED_ADDRESS.toUpperCase());
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
            expect(address).has.length(40);
            expect(address.toUpperCase()).to.be.equal(EXPECTED_ADDRESS.toUpperCase());
        });

        it("should generate private key", async function () {
            // Given - When - Then
            const privateKey = secp256k1.utils.randomPrivateKey();
            const publicKey = secp256k1.getPublicKey(privateKey, false);
            const address = getAddressFromPublicKey(publicKey);

            console.log("private key:", toHex(privateKey));
            console.log("public key:", toHex(publicKey));
            console.log("address: ", address);
        });
    });
});
