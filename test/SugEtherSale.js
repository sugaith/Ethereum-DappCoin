var SugEtherSale = artifacts.require("./SugEtherSale.sol");

contract ('SugEtherSale', function ( accounts ) {
    var saleInstance;
    var tokenPrice = 1000000000000000; // in WEI / or 0,001 ether

    it('::: should initialize sale contract :::', function () {
        return SugEtherSale.deployed().then(function (inst) {
            saleInstance = inst;
            return saleInstance.address;
        }).then(function (address) {
            assert.notEqual(address, 0x0, '-- not admin adress');
            return saleInstance.tokenContract();
        }).then(function (address) {
            assert.notEqual(address, 0x0, '-- not token contract adress');
            return saleInstance.tokenPrice();
        }).then(function (price) {
            assert.equal(price, tokenPrice , '-- token price not correct');

        })

    });


});