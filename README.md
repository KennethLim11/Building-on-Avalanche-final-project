# Building-on-Avalanche-final-project
This is the final project for module 4. In this project, we deployed a solidity contract on the fuji testnet network. We can track the real-time transactions happening with the contract on the snowtrace test network. We also used avax token to pay for the gas fees of the functions.

## Description
This contract has 7 functions.
1. mintDegenToken - Only the contract owner can mint tokens
2. decimals - returns no decimal places
3. getBalance - returns balance of the user
4. transferDegenToken - allows user to transfer tokens to different accounts
5. burnDegenToken - allows user to burn tokens
6. redeemStoreItems - returns a string of store items
7. redeemDGNToken - allows user to purchase items from the store

This contract also has a constructor that assigns the person who deployed the contract to the owner variable.

## Getting Started
1. Create a folder for your new project, and run npm init
2. Install hardhat
3. Initialize hardhat project
4. Install @openzeppelin/contracts
5. Delete the existing module.exports code and add the following code to your hardhat.config.js file. This will enable us to test our smart contracts on the local network with data from Avalanche Mainnet.

```javascript
require("@nomicfoundation/hardhat-toolbox");

const FORK_FUJI = false;
const FORK_MAINNET = false;
let forkingData = undefined;

if (FORK_MAINNET) {
  forkingData = {
    url: "https://api.avax.network/ext/bc/C/rpcc",
  };
}
if (FORK_FUJI) {
  forkingData = {
    url: "https://api.avax-test.network/ext/bc/C/rpc",
  };
}

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
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
        // YOUR PRIVATE KEY HERE
      ]
    },
    mainnet: {
      url: 'https://api.avax.network/ext/bc/C/rpc',
      gasPrice: 225000000000,
      chainId: 43114,
      accounts: [
        // YOUR PRIVATE KEY HERE
      ]
    }
  }
}

```
6. Create API key from snowtrace
7. Once you have your new API key, we can paste it into our Hardhat config file like so (outside of the network config):
```javascript
module.exports = {
  // ...rest of the config...
  etherscan: {
    apiKey: "YOUR API KEY",
  },
};

```

8. Verify the smart contract using this command: npx hardhat verify <contract address> <arguments> --network <network>
9. Request Avax tokens, after which connect your wallet to fuji testnet.
10. Deploy your script: $ npx hardhat run scripts/deploy.js --network fuji



### Executing the program
To run this program, you can use Remix, an online Solidity IDE. To get started, go to the Remix website at https://remix.ethereum.org/.

Once you are on the Remix website, create a new file by clicking on the "+" icon in the left-hand sidebar. Save the file with a .sol extension (e.g., FuncErrorProject.sol). Copy and paste the following code into the file:

```javascript
// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DegenToken is ERC20, Ownable {

    mapping(uint8 => uint256) public storeItems;

    constructor(address owner) ERC20("Degen", "DGN") Ownable(owner) {
        storeItems[1] = 100;
        storeItems[2] = 200;
        storeItems[3] = 300;
    }

    function mintDegenToken(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function decimals() override public pure returns (uint8) {
        return 0;
    }

    function getBalance() external view returns (uint256) {
        return this.balanceOf(msg.sender);
    }

    function transferDegenToken(address _receiver, uint256 _amount) external {
        require(balanceOf(msg.sender) >= _amount, "You do not have enough Degen Tokens.");
        approve(msg.sender, _amount);
        transferFrom(msg.sender, _receiver, _amount);
    }

    function burnDegenToken(uint256 _amount) external {
        require(balanceOf(msg.sender) >= _amount, "You do not have enough Degen Tokens.");
        approve(msg.sender, _amount);
        _burn(msg.sender, _amount);
    }

    function redeemStoreItems() public pure returns(string memory){
        string memory items = "Degen Shop Items: 1. DGN NFT(100 DGN)\n2. DGN Tshirt(150 DGN)\n3. DGN Posters(200 DGN)";
        return items;
    }

    function redeemDGNToken(uint8 option) external {
        require(storeItems[option] > 0, "Invalid item option.");
        require(option <= 3, "Invalid item option");
        require(balanceOf(msg.sender) >= storeItems[option], "Insufficient funds to redeem the item.");

        transfer(owner(), storeItems[option]);
    }
}

```

To compile the code, click on the "Solidity Compiler" tab in the left-hand sidebar. Make sure the "Compiler" option is set to "0.8.4" (or another compatible version), and then click on the "Compile DegenToken.sol" button.

After compilation, the contract can be deployed by clicking the "Deploy & Run Transactions" tab in the left-hand sidebar. Select the "DegenToken" contract from the dropdown menu, and then click on the "Deploy" button.

Once the contract is deployed, click on the "DegenToken" contract first on the left-hand sidebar. You can interact with this contract by using the different functions available, just make sure you have avax tokens in your account so that you can pay for the gas fees when using these functions.

## Authors

Kenneth Lim
Email : 202010039@fit.edu.ph

## License

This project is licensed under the MIT License - see the LICENSE.md file for details