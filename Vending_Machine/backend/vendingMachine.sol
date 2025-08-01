// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract VendingMachine {

    address public owner;
    mapping (address => uint) public cokeBalances;

    constructor() {
        owner = msg.sender;
        cokeBalances[address(this)] = 100;
    }

    function getVendingMachineBalance() public view returns (uint) {
        return cokeBalances[address(this)];
    }

    function getCokeBalance(address user) public view returns (uint) {
        return cokeBalances[user];
    }


    function restock(uint amount) public {
        require(msg.sender == owner, "Only the owner can restock.");
        cokeBalances[address(this)] += amount;
    }

    function purchase(uint amount) public payable {
        require(msg.value >= amount * 0.02 ether, "You must pay at least 0.02 ETH per item");
        require(cokeBalances[address(this)] >= amount, "Not enough items in stock to complete this purchase");
        cokeBalances[address(this)] -= amount;
        cokeBalances[msg.sender] += amount;
    }
}