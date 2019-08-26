 console.log("::: app.js LOADED!!! :::");

App = {
    //variables
    account: '0x0',


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
                App.SugEtherSale = TruffleContract(tokenInstance);
                //set provider
                App.SugEtherSale.setProvider(App.web3Provider);
                App.SugEtherSale.deployed().then(function (tokenInstance) {
                    console.log("DappToken Address: ", tokenInstance.address)
                });

                return App.render();
            });
        })
    },

    render: function () {
        //load account data to frontEnd
        web3.eth.getCoinbase(function (err, account) {
            if (err === null){
                console.log("Your Account: " + account);

                App.account = account;
                $('#accountAddress').html("Your Account: " + account)
            }
        })
    }




};

$(function () {
    $(window).load(function () {
        App.init();
    })
});