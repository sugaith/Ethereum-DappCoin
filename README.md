#SugEther: A CRYPTOCURRENCY AND ICO (iNITIAL cOIN oFFER) EXAMPLE BASED IN ETHEREUM BLOCKCHAIN   
#SugEther: UM EXEMPLO DE CRYPTOMOEDA E ICO BASEADO EM ETHEREUM BLOCKCHAIN   

- credits: Gregory from Dapp University (https://www.youtube.com/watch?v=XdKv5uwEk5A)


##STANDARD / PADRAO
- EHTEREUM / EIPs / eip-20.md : https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md

##Dependencies / Dependencias
- NODE.js
- truffle (framework for Dapps on Ethereum platform, blockchain deployer...) : npm install -g truffle
- ganache (local inmemory ehtereum blockchain): https://www.trufflesuite.com/ganache
- metamask for chrome (ether blockchain browser): https://metamask.io/
- solidity IDE (JetBrains for me  - Solidity plugin) 
- import lite-server using package.json or 
    - $  npm install lite-server --save-dev ^2...
    - https://github.com/johnpapa/lite-server

##Configuration 
- crEate project folder and initiate truffle / cria pasta do projeto e inicia o truffle
    - $ mkdir eth_token
    - $ truffle init
    - $ truffle migrate --reset
        - migrate contracts to the blockchain (--reset means replacing)

- open ganache
- Open with IDE / abrir com IDE
    - set "networks" in truffle-config.js or truffle.js for linux e mac
        - set the port like is in ganache
        
- open console and open TRUFFLE
    - type "truffle" on project folder
    - usefull test commands:
        - $ DappToken.deployed().then(function(i){token=i;})
        - $ token.totalSupply().then(function(s){totalSupply = s;})
        - $ token.address
        - $ totalSupply or totalSupply.toNumber()
        - $ .exit
        - web3 object (var to interact with smart contracts and the blockchain)
            - $ web3.eth.accounts //older v.
            - $ web3.eth.accounts[0] //older versions
            - $ web3.eth.getAccounts()
            - $ web3.eth.getAccounts().then(function(result){ account0 = result[0]; })

            - Do a transfer (https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md#transfer)
                - $ token.transfer(web3.eth.accounts[1], 1, { from: web3.eth.accounts[0] })
            - do a approval and trasnferfrom... 
    
##Coding Smart Contracts

- folder contracts: todo
    - contract example: todo
    
- folder migration: todo

- folder test:    todo
    - to teste type 'truffle test' on project folder 
    - test example: todo
    
    
##FOR ICO (INITIAL COIN OFFER): provision tokens to token sale contract
- Set a token price in WEI
- Assign an ADMIN
- Buy tokens
- End sale

##For inteface and Data Wiring (front end)
- on folder frontEnd
- frontEnd\js\web3.min.js --> web3 platform for accessing the Ethereum blockchain
- frontEnd/js/app.js --> main Code where all get wired
- $ npm run dev to run server and open browser

#metamask phrase
fine spring eight drastic light behave
describe staff subway actor salad network

#for REAL BLOCKCHAIN testing.. RINKEBY NETWORK!!
- GETH:
    - https://geth.ethereum.org/downloads/ 
    - https://github.com/ethereum/go-ethereum
    
    - INITIATE GETH node (to connect to Ethereum you have to be  anode like a mining node):
        - $ geth --rinkeby --rpc --rpcapi="personal,eth,network,web3,net" --allow-insecure-unlock --cache 2048 --rpcport 8545 --rpcaddr localhost
        - takes some time to download
    - on another console:
        - $ geth attach ipc:\\.\pipe\geth.ipc (windows)
        - or $ geth attach (unix)
        - See if geth is still syncing:
            - $ eth.syncing
                - currentBlock: current downloading block, highestBlock: last downloading block
        - Create new account:
            - $ geth --rinkeby account new
Result:            
Public address of the key:   0x38f6686B10196b0595c15bc7Dc4ff5a3D433Ef77
Path of the secret key file: C:\Users\suga\AppData\Local\Ethereum\rinkeby\keystore\UTC--2019-08-26T03-36-04.362333300Z--38f6686b10196b0595c15bc7dc4ff5a3d433ef77
- You can share your public address with anyone. Others need it to interact with you.
- You must NEVER share the secret key with anyone! The key controls access to your funds!
- You must BACKUP your key file! Without the key, it's impossible to access account funds!
- You must REMEMBER your password! Without the password, it's impossible to decrypt the key!

    - Request Ether to the Rinkeby network:
        - https://faucet.rinkeby.io/
        - tweet and wait to receive  ETHERs
    
    - more commands:
        -  eth.accounts
        -  eth.getBalance(eth.accounts[0])        
    
    - configure networks on truffle-config.js
    - unlock account to deploy for 1200 seconds
        - $ personal.unlockAccount(eth.accounts[0], null, 1200)
        - put password
        - wait syncing to finish
        - migrate!!
            - $ truffle migrate --reset --compile-all --network rinkeby
        
        - access rinkeby.etherscan.io 
            - check if contract is migrated by pasting the address fount at:
                - **SugEtherSale.json** -> networks                
                   
        - $ var adminAcc = eth.accounts[0]        
        - $ var tokensAvail = 750000
        - $ var saleAddr = "0xDF861A15aB0d887a534183066E7c82856aEe293a"
        - $ var tokenAddr = "0x8D48E23E3e2d90e9493C28e1A9Ec80D2715AA366"
                
        - next: describe token to web3 (ABI)
            - copy ABI json array ( "[]" ) from **DappToken.json** 
            - $ var abi = PASTE ABI JSON 
        
        - tell web3 token address
            - var TokenContract = web3.eth.contract(abi)
            - var tokenInstance = TokenContract.at(tokenAddr)
     
                
# para ropsten
- Abrir node
    - $ geth --testnet --syncmode "fast" --allow-insecure-unlock --rpc --rpcapi="personal,eth,network,web3,net" --rpcport 8545 --rpcaddr localhost  --bootnodes "enode://6332792c4a00e3e4ee0926ed89e0d27ef985424d97b6a45bf0f23e51f0dcb5e66b875777506458aea7af6f9e4ffb69f43f3778ee73c81ed9d34c51c4b16b0b0f@52.232.243.152:30303,enode://94c15d1b9e2fe7ce56e458b9a3b672ef11894ddedd0c6f247e0f1d3487f52b66208fb4aeb8179fce6e3a749ea93ed147c37976d67af557508d199d9594c35f09@192.81.208.223:30303"         
- miner.setEtherbase(eth.accounts[0])
- eth.coinbase
- https://faucet.metamask.io/
- miner.start()

      
     
    

