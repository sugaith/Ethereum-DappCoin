pragma solidity >=0.4.21 <0.6.0;

import "./DappToken.sol" ;

//todo
// PROVISION TOKENS TO TOKEN SALE CONTRACT  //FORNECER TOKENS PARA VENDA
// SET A TOKEN PRICE IN WEI //SETAR UM PREÇO DE TOKENS EM WEI
// ASSING AN ADMIN //SETAR UM ADMIN (MSG.SENDER)
// BUY TOKENS //FUNCAO DE COMPRA DE TOKENS
// END SALE //FUNCVAO DE TERMINO DE VENDA ICO



contract SugEtherSale{
    //admin address: private
    //person ro deployed contract or colled the function
    //truffle LENDS an account qhen the contract is deployed
    address payable admin;

    //token for token contract (SugEther)
    DappToken public tokenContract;

    //token price
    uint256 public tokenPrice;

    //tokens sold / vendidos
    uint256 public tokensSold;

    //SellEvent
    event Sell(address _buyer, uint256 _amount);


    constructor( DappToken _tokenContract, uint256 _tokenPrice ) public {
        //assign an admin
        //the guy who deployed the contract or who is selling tokens
        admin = msg.sender;

        // token contract
        tokenContract = _tokenContract;

        // token price
        tokenPrice = _tokenPrice;
    }

    //function to buy tokens
    //payable -->
    function buyTokens(uint256 _numbOfTokens) public payable {
        //require if valueis equal to tokens
        //confere se valor é igual a tokens
//        require( msg.value == _numbOfTokens * tokenPrice );//OR
        require( msg.value == multiply( _numbOfTokens, tokenPrice ));

        //require if there is enough tokens
        //confere se tem tokens disponiveis
        //this -> solidity shortcut
        require( tokenContract.balanceOf( address(this) ) >= _numbOfTokens );

        //BUY FUNCTIONALITY
        //require if transfer is successfull
        //confere se a transferencia é bem sucedida
        require( tokenContract.transfer(msg.sender, _numbOfTokens) );


        //keep track of number of tokens old
        //manter historico dos tokens vendidos


        tokensSold += _numbOfTokens;

        //trigger sell event
        //dispara evento de VEnda
        emit Sell(msg.sender, _numbOfTokens);
    }

    //END SALE
    function endSale() public   {
        //require if ender is the admin
        require( msg.sender == admin );

        //transfer balance back to admin
        require( tokenContract.transfer(admin, tokenContract.balanceOf( address(this) )) );

        //destructsale contrat
    //https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#contract-related
        //NOTE:
        /*
        A word of caution. selfdestruct is an inelegant way to stop a contract and could lead to non-trivial problems.
         Consider using Open Zeppelin Pausable.sol instead.
https://ethereum.stackexchange.com/questions/65872/invalid-type-for-argument-in-function-call-invalid-implicit-conversion-from-add
        */
        selfdestruct( admin );


    }

    //multiply function
    //its a best practice NOT TO USE '*' operator
    //using function ds-math/math.sol is safer with requires
    //https://github.com/dapphub/ds-math/blob/master/src/math.sol
    //** internal == private ajva
    //pure -> not writing data to blockchain, just pure function
    function multiply(uint x, uint y) internal pure returns (uint z){
        require(y == 0 || (z = x * y) / y == x, "ds-math-mul-overflow");
    }









}

