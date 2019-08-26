 console.log("::: app.js LOADED!!! :::");

App = {
    //variables
    account: '0x0',
    tokenPrice: -1,
    tokensAvailable: 750000,

    init: function () {
        console.log("::: app.js LOADED with App Object!!! :::");
        App.initWeb3();
        console.log("::: web3 initiated ! :::");

    },

    //web3.js...
    //https://github.com/ethereum/web3.js/#usage-with-typescript
    initWeb3: function () {
        if (typeof web3 !== 'undefined'){
            //if a web3 provider instance is already provided by MetaMask
            App.web3Provider = web3.currentProvider;
            web3 = new Web3(web3.currentProvider);
        }else{
            // specify default instance if no web3 instance is provided
            App.web3Provider = web3.providers.HttpProvider('http://localhost:7545');
            web3 = new Web3(web3.web3Provider);
        }


        //initiate contracts instance and use it!
        return App.initContracts();
    },

    initContracts: function () {
        $.getJSON("SugEtherSale.json", function (sugTokenSale) {
            App.SugEtherSale = TruffleContract(sugTokenSale);
            //set provider
            App.SugEtherSale.setProvider(App.web3Provider);
            App.SugEtherSale.deployed().then(function (saleIntance) {
                console.log("SugEther Sales Address: ", saleIntance.address)
            })
        }).done(function () {
            $.getJSON("DappToken.json", function (tokenInstance) {
                App.DappToken = TruffleContract(tokenInstance);
                //set provider
                App.DappToken.setProvider(App.web3Provider);
                App.DappToken.deployed().then(function (tokenInstance) {
                    console.log("DappToken Address: ", tokenInstance.address)
                });

                //initiate event listeners
                App.listenForEvents();
                return App.render();
            });
        })
    },

    //buy tokens function for the button on the frontEnd
    /*
    * OBS::
    * MUST PROVISION TOKENS FROM tokenDapp to SaleContract
    * use command line on truffle console:
    * $ SugEtherSale.deployed().then(function(i){tokenSale=i})
    * $ DappToken.deployed().then(function(i){tokenDapp=i})
    * $ tokensAvail = 750000
    * $ admin = accounts[0] // or web3.eth.accounts[0]
    * $ tokenDapp.transfer(tokenSale.address, tokensAvail, {from: admin})
    * $ tokenDapp.balanceOf(tokenSale.address)
     */
    buyTokens: function () {
        let loader = $('#loader');
        let content = $('#content');
        loader.show();
        content.hide();

        //get tokens to buy from input
        let numbOfTokens = $('#numberOfToken').val();

        //buy tokens from blockchain
        App.SugEtherSale.deployed().then(function (inst) {
            return inst.buyTokens( numbOfTokens, {
                from: App.account,
                value: numbOfTokens * App.tokenPrice,
                gas: 500000 //gas limit??
            });
        }).then(function (receipt) {
            console.log("SUGs bought.......");
            console.log(receipt);
            $('form').trigger('reset');//reset number otkens in form
            // loader.hide();
            // content.show();
            //wait form Sell event
        })




    },
    
    listenForEvents: function () {
        App.SugEtherSale.deployed().then(function (inst) {
            //WATCH the SELL event !!!
            // the empty '{}'  is for filter!
            //todo pesquisar from block e to block ???
            inst.Sell({}, {
                fromBlock: 0,
                toBlock: 'latest',
            }).watch(function (error, event) {
                console.log("event triggered", event);
                App.render();
            })
        })
    },


    //kinda main function tht render the entire app
    render: function () {
        //fom preventing app reloading issue..
        if (App.loading)
            return;
        App.loading = true;

        let loader = $('#loader');
        let content = $('#content');

        //load account data to frontEnd
        web3.eth.getCoinbase(function (err, account) {
            if (err === null){
                console.log("Your Account: " + account);

                App.account = account;
                $('#accountAddress').html("Your Account: " + account)
            }
        });


        App.SugEtherSale.deployed().then(function (inst) {
            saleInstance = inst;
            console.log("::: Instance -> " );
            console.log(inst);

            return saleInstance.tokenPrice();
        }).then(function (tokenPrice) {
            console.log("::: Token price -> " + tokenPrice);
            App.tokenPrice = tokenPrice;
            // $('#token-price').html(" $WEI " + tokenPrice);
            $('#token-price').html(" $ETH " + web3.fromWei(App.tokenPrice, "ether"));

            return saleInstance.tokensSold();
        }).then(function (tokensSold) {
            console.log("::: Token sold -> " + tokensSold);
            console.log("::: TOTAL supply to sell -> " + App.tokensAvailable);

            App.tokensSold = tokensSold.toNumber();
            // App.tokensSold = 45165;
            $('.tokens-sold').html(App.tokensSold);
            $('.tokens-available').html(App.tokensAvailable);

            let progressPercent = (App.tokensSold / App.tokensAvailable) * 100;
            $('#progress').css('width', progressPercent + '%');

            App.DappToken.deployed().then(function (inst) {
                tokenInstance = inst;
                return tokenInstance.balanceOf(App.account)
            }).then(function (balance) {
                console.log("::: Your balance -> " + balance);
                $('#dapp-balance').html(balance.toNumber());

                loader.hide();
                content.show();
                App.loading = false;
            })

        });

    }




};

$(function () {
    $(window).load(function () {
        App.init();
    })
});