#DappToken: A CRYPTOCURRENCY AND ICO EXAMPLE / UM EXEMPLO DE CRYPTOMOEDA E ICO  
- credits: Dapp University (https://www.youtube.com/watch?v=XdKv5uwEk5A)


##STANDARD / PADRAO
- EHTEREUM / EIPs / eip-20.md : https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md

##Dependencies / Dependencias
- NODE.js
- truffle (framework for Dapps on Ethereum platform, blockchain deployer...) : npm install -g truffle
- ganache (local inmemory ehtereum blockchain): https://www.trufflesuite.com/ganache
- metamask for chrome (ether blockchain browser): https://metamask.io/
- solidity IDE (JetBrains for me  - Solidity plugin) 

##Configuration 
- crEate project folder and initiate truffle / cria pasta do projeto e inicia o truffle
    - mkdir eth_token
    - truffle init

- open ganache
- Open with IDE / abrir com IDE
    - set "networks" in truffle-config.js or truffle.js for linux e mac
        - set the port like is in ganache
        
- open console and open TRUFFLE
    - type "truffle" on project folder
    - usefull test commands:
        - DappToken.deployed().then(function(i){token=i;})
        - token.totalSupply().then(function(s){totalSupply = s;})
        - token.address
        - totalSupply or totalSupply.toNumber()
        - .exit
    
##Coding Smart Contracts

- folder contracts: todo
    - contract example: todo
    
- folder migration: todo

- folder test:    todo
    - to teste type 'truffle test' on project folder 
    - test example: todo


    

