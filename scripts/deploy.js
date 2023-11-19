const hre = require("hardhat");

async function main() {
  // Get the Points smart contract
  const Degen = await hre.ethers.getContractFactory("DegenToken");

  const initialAddress = "0x6C116fa3ba40860f0a18ce536aD7D0c9e9Ef8753";

  // Deploy it
  const degen = await Degen.deploy(initialAddress);
  await degen.waitForDeployment();

  // Display the contract address
  console.log(`Points token deployed to ${degen.target}`);
}

// Hardhat recommends this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
