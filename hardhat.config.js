require("@nomicfoundation/hardhat-toolbox");

const FORK_FUJI = false
const FORK_MAINNET = false
let forkingData = undefined;

if (FORK_MAINNET) {
  forkingData = {
    url: 'https://api.avax.network/ext/bc/C/rpcc',
  }
}
if (FORK_FUJI) {
  forkingData = {
    url: 'https://api.avax-test.network/ext/bc/C/rpc',
  }
}

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {
      gasPrice: 225000000000,
      chainId: !forkingData ? 43112 : undefined, //Only specify a chainId if we are not forking
      forking: forkingData
    },
    fuji: {
      url: 'https://api.avax-test.network/ext/bc/C/rpc',
      gasPrice: 225000000000,
      chainId: 43113,
      accounts: [
        "ac0974bec39c17e36ba4a6b4d438fe944bacb478cbed5efcae784d7bf4f2ff90"
      ]
    },
    mainnet: {
      url: 'https://api.avax.network/ext/bc/C/rpc',
      gasPrice: 225000000000,
      chainId: 43114,
      accounts: [
        "ac0974bec39c17e36ba4a6b4d438fe944bacb478cbed5efcae784d7bf4f2ff90"
      ]
    }
  },
  etherscan: {
    apiKey: "J69K2NS87D7XGA2DWGP4TB8K6YCU9D2A18",
  }

}


