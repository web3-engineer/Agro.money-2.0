AgroMoney
Sistema de Registro e Tokenização de CPRs na Polygon

Introdução
O AgroMoney é um sistema inovador que utiliza a tecnologia blockchain para registrar CPRs (Cédula do Produtor Rural) e realizar a tokenização de fundos de forma segura, transparente e eficiente. O sistema é desenvolvido na blockchain Ethereum através da Polygon, conhecida por sua alta escalabilidade e baixos custos de transação.

Tecnologias e Integrações
Blockchain Polygon: Rede blockchain robusta e escalável para registro de CPRs e transações de devolução.
Smart Contracts: Contratos inteligentes autoexecutáveis ​​que definem a lógica do sistema de forma segura e transparente.
Oráculos: Fontes de dados confiáveis ​​que fornecem informações externas, como a taxa de aceite da CPR, para o sistema.
Web3.js: Biblioteca JavaScript para interagir com a blockchain e os contratos inteligentes.
MetaMask: Carteira digital para gerenciar MATIC (criptomoeda da Polygon) e interagir com o sistema.
Funcionamento do Sistema
Registro da CPR: O agricultor/cooperativa registra a CPR no sistema, fornecendo informações como área, tipo de fundo e valor.
Análise da CPR: O banco analisa a CPR e informa a aprovação ou recusa no sistema.
Devolução de Fundos (se aprovada):
O contrato de devolução calcula o valor a ser devolvido com base na taxa de aceite da CPR.
O valor equivalente é enviado para a carteira do agricultor/cooperativa na Polygon.
Benefícios
Eficiência: Processo automatizado de devolução, reduzindo tempo e custos.
Transparência: Rastreabilidade completa das transações na blockchain.
Segurança: Imutabilidade dos registros e proteção contra fraudes.
Flexibilidade: Adaptabilidade às necessidades específicas dos stakeholders.


Repo Structure

├── client                // React Frontend
│   ├── public 
│   ├── src
│       ├── components    
│       ├── pages
│       ├── styles
│       ├── utils
│       ├── App.js  
|       └── ...
├── server                // Node.js Backend 
│   ├── models
│   ├── routes
│   ├── controllers
│   ├── config
│   ├── app.js 
|   └── ...
├── .gitignore
├── package.json
└── ...  