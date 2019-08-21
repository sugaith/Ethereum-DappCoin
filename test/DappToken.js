var DappToken = artifacts.require("./DappToken.sol");

contract ('DappToken', function (accounts) {

    it('should set the total supply upon deployment ', function () {
        return DappToken.deployed().then( function (instance) {
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then(function (totalSupply) {
            assert.equal(totalSupply.toNumber(), 2000000, 'sets the total suply to 1,000,000');
        });
    });
});