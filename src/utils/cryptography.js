const { sha256 } = require("ethereum-cryptography/sha256");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { utf8ToBytes } = require("ethereum-cryptography/utils");
const { publicKeyConvert } = require("ethereum-cryptography/secp256k1-compat");

function hashSha256(message) {
    const bytes = utf8ToBytes(message);
    const hash = sha256(bytes);
    return hash;
}

function hashKeccak256(message) {
    const bytes = utf8ToBytes(message);
    const hash = keccak256(bytes);
    return hash;
}

/**
 * ECDSA -> secp256k1 curve
 * Private keys are 32 bytes long --> 64 bytes in hex
 *
 * Public keys are 65 bytes (uncompressed form) or 33 bytes (compressed form) long
 * first byte is a prefix. 130 or 66 bytes in hex
 *
 * Signature  is 64 bytes, 128 bytes in hex
 */
function signSecp256k1(hash, PRIVATE_KEY) {
    const signature = secp256k1.sign(hash, PRIVATE_KEY);
    return signature;
}

/**
 * To extract the address from public key (public key has to be in uncompressed form)
 * remove the first byte that indicates the format of the key, whether it is in the compressed format or not
 * next take the keccak hash of the rest of the public key
 * finally take the last 20 bytes of the keccak hash
 *
 * The ethereum address is 20 bytes --> 40 bytes in hex
 */
function getAddressFromPublicKey(publicKey) {
    if (publicKey.length !== 65 && publicKey.length !== 33) throw new Error("Invalid public key");

    if (publicKey.length === 33) {
        // public key is compressed
        publicKey = decompressPublicKey(publicKey);
    }

    const key = publicKey.slice(1);
    const hashKey = keccak256(key);
    const address = hashKey.slice(hashKey.length - 20, key.length);

    return address;
}

function decompressPublicKey(publicKey) {
    if (publicKey.length !== 33) throw new Error("Invalid  compressed public key");
    return publicKeyConvert(publicKey, false);
}

module.exports = {
    hashSha256: hashSha256,
    hashKeccak256: hashKeccak256,
    signSecp256k1: signSecp256k1,
    getAddressFromPublicKey: getAddressFromPublicKey,
    decompressPublicKey: decompressPublicKey,
};
