pragma solidity >=0.4.21 <0.6.0;

import "./Dapptoken.sol" ;

contract SugEtherSale{
    //admin address: private
    address admin;

    //token for token contract (SugEther)
    DappToken public tokenContract;

    //token price
    uint256 public tokenPrice;

    constructor( DappToken _tokenContract, uint256 _tokenPrice ) public {
        //assign an admin
        admin = msg.sender;

        // token contract
        tokenContract = _tokenContract;

        // token price
        tokenPrice = _tokenPrice;
    }


}