var DappToken = artifacts.require("./DappToken.sol");

contract ('DappToken', function ( accounts ) {
    var tokenInstance;

    it('::: initializes contract with the correct values ::: ', function () {
        return DappToken.deployed().then(function (instance) {
            tokenInstance = instance;
            return tokenInstance.name();
        }).then(function (name) {
            assert.equal(name, 'SugEther', '--- has the incorrect name');
            return tokenInstance.symbol();
        }).then(function (sy) {
            assert.equal(sy, 'SUG', '--- has the incorrect symbol');
            return tokenInstance.standard();
        }).then(function (standard) {
            assert.equal(standard, 'SugEther v0.1', '--- has the incorrect standard');
        });
    });


    it(':::: Set / Check total supply upon deployment ::::', function () {
        return DappToken.deployed().then( function ( instance ) {
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then(function ( totalSupply ) {
            assert.equal( totalSupply.toNumber(), 1000000, '--- The total suply should br to 1,000,000!');
            return tokenInstance.balanceOf( accounts[0] );
        }).then(function ( adminBalance ) {
            assert.equal( adminBalance.toNumber(), 1000000, '--- Does totalSupply in  admin Account (1st account)?' );
        });
    });


    it('::: token transfer :::', function () {
        return DappToken.deployed().then(function (instance) {
            tokenInstance = instance;

            //to test 'require' function
            return tokenInstance.transfer.call( accounts[1], 99999999999999999999999999999999999999);
        }).then( assert.fail ).catch(function (error) {
            assert(
                (error.message.indexOf('revert') >= 0) || //nao tem saldo / does not have money
                (error.message.indexOf('invalid') >= 0) //invalid numbet -> above 256 bits
                , '--- EXCEPTION:' + error.message  );
            return tokenInstance.transfer.call( accounts[1], 250000, {from: accounts[0]} );
        }).then(function (success) {
            assert.equal(success, true, '--- false on transfer.call()');
            return tokenInstance.transfer( accounts[1], 250000, {from: accounts[0]} );
        }).then(function (receipt) {
            //testing receipt
            assert.equal(receipt.logs.length, 1, '--- lenght is worng');
            assert.equal(receipt.logs[0].event, 'Transfer', '--- should be transfer event!');
            assert.equal(receipt.logs[0].args._from, accounts[0], '--- transfered FROM is wrong!');
            assert.equal(receipt.logs[0].args._to, accounts[1], '--- transfered TO is wrong!');
            assert.equal(receipt.logs[0].args._value, 250000, '--- amount is wrong!');

            return tokenInstance.balanceOf( accounts[1] );
        }).then(function (balance) {
            assert.equal(balance.toNumber(), 250000, '--- ammount not added') ;
            return tokenInstance.balanceOf( accounts[0] );
        }).then(function (balance2) {
            assert.equal(balance2.toNumber(), 750000, '--- amount nao reduzido');
        })

    });


});