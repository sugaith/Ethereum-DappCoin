#SugEther: A CRYPTOCURRENCY AND ICO (iNITIAL cOIN oFFER) EXAMPLE BASED IN ETHEREUM BLOCKCHAIN   
#SugEther: UM EXEMPLO DE CRYPTOMOEDA E ICO BASEADO EM ETHEREUM BLOCKCHAIN   

- credits: Dapp University (https://www.youtube.com/watch?v=XdKv5uwEk5A)


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


    

