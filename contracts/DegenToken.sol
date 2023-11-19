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