var SugEtherSale = artifacts.require("./SugEtherSale.sol");
var DappToken = artifacts.require("./DappToken.sol");

contract ('SugEtherSale', function ( accounts ) {
    let saleInstance;
    let tokenInstance;
    let tokenPrice = 1000000000000000; // in WEI / or 0,001 ether
    let buyer = accounts[1];
    let admin = accounts[0];
    //provision 75% of totalSupply
    //fornecer 75% do totalsupply para o ICO
    let tokensAvailable = 750000;


    it('::: should initiate sale contract :::', function () {
        return SugEtherSale.deployed().then(function (inst) {
            saleInstance = inst;
            return saleInstance.address;
        }).then(function (address) {
            //todo aqui cada vez me retorna um endereco diferente que nao tem no ganache!
            // q endereço é este (msg.sender quem é?)???
            // responde: this address is dynamic depending of the test eenvironment (truffle in this case)
            // por isso notEqual
            assert.notEqual(address, 0x1, '-- not admin adress --> ' + address);
            return saleInstance.tokenContract();
        }).then(function (address) {
            assert.notEqual(address, 0x0, '-- not token contract adress');
            return saleInstance.tokenPrice();
        }).then(function (price) {
            assert.equal(price, tokenPrice , '-- token price not correct');
        })
    });

    it(':: should facilitate token buying :::', function () {
        return DappToken.deployed().then(function(inst){
            tokenInstance = inst;
            return SugEtherSale.deployed();
        }).then(function (inst) {
            saleInstance = inst;

            return tokenInstance.transfer(saleInstance.address, tokensAvailable, {from: admin});
        }).then(function (receipt) {
            //ETHER  = tokenNumber * wei price
            let numbOfTokens = 10;
            let value = numbOfTokens * tokenPrice;
            return saleInstance.buyTokens(numbOfTokens, {from: buyer, value: value});
        }).then(function (receipt) {
            //testing receipt
            assert.equal(receipt.logs.length, 1, '--- lenght is worng');
            assert.equal(receipt.logs[0].event, 'Sell', '--- should be Sell event!');
            assert.equal(receipt.logs[0].args._buyer, buyer, '--- Sell FROM is wrong!');
            assert.equal(receipt.logs[0].args._amount, 10, '--- Sell amount tokens TO is wrong!');
            //assert.equal(receipt.logs[0].args._value, 10 * tokenPrice, '--- Sell value is wrong!');
            return saleInstance.tokensSold();
        }).then(function (tokenSold) {
            assert.equal(tokenSold.toNumber(), 10, '-- number of tokens sold not 10!!');

            return tokenInstance.balanceOf(buyer);
        }).then(function (balance) {
            assert.equal(balance.toNumber(), 10, '-- buyer shouldnt habe this balance');

            return tokenInstance.balanceOf(saleInstance.address);
        }).then(function (balance) {
            assert.equal(balance.toNumber(), tokensAvailable - 10, '-- number of tokens inbalance not corresponding should sold 10!!');

            //try to buy tokens from the ether value
            return saleInstance.buyTokens( 10, {from: buyer, value: 1} );
        }).then(assert.fail).catch(function (error) {
            assert(error.message.indexOf('revert') > -1, 'msg.value must equal the number of WEIs' );

            //try to buy a number grater than available
            return saleInstance.buyTokens(800000, {from: buyer, value: 10 * tokenPrice})
        }).then(assert.fail).catch(function (error) {
            assert(error.message.indexOf('revert') > -1, '-- cannot buy more tokens than available');
        });
    });


    it('should test the end of the tokenSale', function () {
        return DappToken.deployed().then(function(inst){
            tokenInstance = inst;
            return SugEtherSale.deployed();
        }).then(function (inst) {
            saleInstance = inst;

            //try to end sale from account other than the admin
            return saleInstance.endSale({from: buyer})
        }).then(assert.fail).catch(function (error) {
            assert(error.message.indexOf('revert') > -1, '-- nao se pode terminar o ICO por outra conta')
            return saleInstance.endSale({from: admin})
        }).then(function (receipt) {
            return tokenInstance.balanceOf(admin);
        }).then(function (balance) {
            assert.equal(balance.toNumber(), 999990, '-- balance errado');

            //check if token price has been reset on destruction
            //in new versions you cant even chack destrocted things
            // em novas veroes nao se pode chcar variaveis que estao destruidas
            // return saleInstance.tokenPrice();
        // }).then(function (price) {
        //     assert.equal(price.toNumber(), 0, '-- prince must be reseted!')
        })
    });


});