const SugEther = artifacts.require("./DappToken.sol");
const SugEtherSale = artifacts.require("./SugEtherSale.sol");

module.exports = function (deployer) {
    //passint _initialSupply for constructor / passando _initialSupply para constutor do DappToken
    deployer.deploy( SugEther , 1000000  ).then(function () {
        var tokenPrice = 1000000000000000; // in WEI / or 0,001 ether

        //initiate Token Sale with admin address
        return deployer.deploy (SugEtherSale, SugEther.address, tokenPrice)
    });
    // deployer.deploy( SugEtherSale );

};
