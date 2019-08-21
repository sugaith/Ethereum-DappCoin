pragma solidity >=0.4.21 <0.6.0;

contract DappToken{ //ERC-20 standard!!!!!

    //quantidade total absoluta de tokens (moedas)
    //absolute total quantity of tokens
    uint256 public totalSupply;

    //token name or currency name
    //nome da moeda
    string public name = "SugEther";

    //token / currency symbol
    //simbolo da moeda
    string public symbol = "SUG";

    //version (not in erc20
    string public standard = "SugEther v0.1";

    //to save and keep track of balance for each address (account)
    //para salver e acompanhar o saldo das contas ou endereços
    mapping( address => uint256 ) public balanceOf;

    //Event Transfer -> MUST be fire when transactions are made
    //https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md#transfer-1
    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    constructor(uint256 _initialSupply) public {
        /*
        define o inicialSupply de tokens (moedas)
        sets de totalSupply
        */
        //totalSupply = 1000000; //hardcoded
        totalSupply = _initialSupply; //by constructor
        /*
        Obs: totalSupply must go initially to a starting account
        obs: totalSupply deve ser transferido para alguma conta inicial, para que seja trabalhado
        */

        //--------
        /*
        write to the mapping
        - 'msg.' - global var in Solidity
        - 'msg.sender' - account key
        - docs for definition and other vars:
        https://solidity.readthedocs.io/en/v0.5.3/units-and-global-variables.html#block-and-transaction-properties
        */
        balanceOf[ msg.sender ] = _initialSupply;

    }


    // transfer
    function transfer( address _to, uint256 _value) public returns (bool success){
        // exception if account does not have enough money
        // require if true continue, if false stop and throw exception
        require( balanceOf[ msg.sender ] >= _value );

        //transfer values
        balanceOf[ msg.sender ] -= _value;
        balanceOf[ _to ] += _value;

        // trigger transfer event
        emit Transfer(msg.sender, _to,  _value);

        // return boolean
        return true;
    }



}