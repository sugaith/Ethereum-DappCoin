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

    it(':::: should approve delegated transfer ::::', function () {
        return DappToken.deployed().then(function (instance) {
            tokenInstance = instance;
            return tokenInstance.approve.call(accounts[1], 100);
        }).then(function (success) {
            assert.equal(success, true, '--- returning false');
            return tokenInstance.approve(accounts[1], 100, {from: accounts[0]} );
        }).then(function (receipt) {
            assert.equal(receipt.logs.length, 1, '--- lenght should be 1!!');
            assert.equal(receipt.logs[0].event, 'Approval', '--- should be Approval event!' + receipt.logs[0].event);
            assert.equal(receipt.logs[0].args._ownder, accounts[0], '--- approved _ownder is wrong!');
            assert.equal(receipt.logs[0].args._spender, accounts[1], '--- approved _spender is wrong!');
            assert.equal(receipt.logs[0].args._value, 100, '--- amount is wrong!');

            return tokenInstance.allowance(accounts[0], accounts[1]);
        }).then(function (allowance) {
            assert.equal(allowance, 100, 'allowance is wrong')

        })
    });

    it('::: should handle delegated transfer (allowance) :::', function () {
        return DappToken.deployed().then(function (instance) {
            tokenInstance = instance;
            fromAcc = accounts[2];
            toAcc = accounts[3];
            spendAcc = accounts[4];
            //transfer some tokens to from Account
            return tokenInstance.transfer(fromAcc, 100, {from: accounts[0]});
        }).then(function (receipt) {
            //approve spender to 10 SUGs from fromACc
            return tokenInstance.approve( spendAcc, 10, {from: fromAcc} );
        }).then(function (receipt) {

            //try transfer something larger than sender's balance
            return tokenInstance.transferFrom(fromAcc, toAcc, 9999, {from: spendAcc});
        }).then( assert.fail ).catch(function (error) {
            assert(error.message.indexOf('revert') >= 0, '--- EXCEPTION on transferFrom value is larger than balance:' + error.message.toString())

            //try transfer larger than approved amount
            return tokenInstance.transferFrom( fromAcc, toAcc, 20, {from: spendAcc} );
        }).then( assert.fail ).catch(function (error) {
            assert(error.message.indexOf('revert') >= 0, '--- EXCEPTION on transferFrom value is larger than approved:' + error.message.toString())

            return tokenInstance.transferFrom.call( fromAcc, toAcc, 9, {from: spendAcc} );
        }).then(function (success) {
            assert.equal(success, true, '-- transfer returned false!!');
            
            return tokenInstance.transferFrom(fromAcc, toAcc, 10, {from: spendAcc});
        }).then(function (receipt) {
            assert.equal(receipt.logs.length, 1, '--- lenght should be 1!!');
            assert.equal(receipt.logs[0].event, 'Transfer', '--- should be Transfer event!' + receipt.logs[0].event);
            assert.equal(receipt.logs[0].args._from, fromAcc, '--- Transfer _ownder is wrong!');
            assert.equal(receipt.logs[0].args._to, toAcc, '--- Transfer _spender is wrong!');
            assert.equal(receipt.logs[0].args._value, 10, '--- amount is wrong!');
            return tokenInstance.balanceOf(fromAcc);
        }).then(function (balance) {
            assert.equal(balance.toNumber(),90, '--- balance wrong');
            return tokenInstance.balanceOf(toAcc);
        }).then(function (balance) {
            assert.equal(balance.toNumber(),10, '--- balance wrong');

            return tokenInstance.allowance(fromAcc, spendAcc);
        }).then(function (allowance) {
            assert.equal(allowance,0, '--- allowance wrong');
        })
    });


});