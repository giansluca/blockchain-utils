const ENV = process.env.ENV || "dev";
if (ENV !== "prod") {
    require("dotenv").config();
}

const pkg = require("../package");

const config = {
    env: process.env.ENV || "local",
    app: {
        name: process.env.APP_NAME || "blockchain-utils",
        version: pkg.version,
        commit: process.env.APP_COMMIT,
    },
    secret: {
        alchemyUrl: process.env.ALCHEMY_MAINNET_URL,
    },
};

module.exports = config;