const express = require('express');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
// ... Outras importações (ex. modelos de banco de dados)

const app = express();

// Configurações do CORS
app.use(cors({
    origin: 'http://localhost:3000', // Substitua pelo endereço da aplicação frontend
    credentials: true // Habilitar o envio de cookies
}));

// Configuração de Sessão
app.use(session({ 
    secret: 'your_secret_key', // Defina uma chave secreta forte
    resave: false,
    saveUninitialized: false 
}));

// Inicializar Passport e configurações de sessão
app.use(passport.initialize());
app.use(passport.session()); 

// Importe as Estratégias de Autenticação Passport 
// (Criaremos isto logo em seguida)

// Rotas da API (Exemplos - vamos criar isto depois)
app.post('/api/login', (req, res, next) => {
    // Implementar autenticação
});

app.get('/api/logout', (req, res) => {
    req.logout(err => {
        if (err) return next(err);
        res.send('Usuário deslogado com sucesso');
    });
});

// Inicie o servidor
const port = 5000; // Ou escolha outra porta
app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});
const passport = require('./passportConfig'); 
app.post('/api/login', (req, res, next) => {
    passport.authenticate('farmer', (err, user, info) => { // Use a estratégia 'farmer'
        if (err) return next(err);
        if (!user) return res.status(401).json(info); // Retorna erro de autenticação  
        req.logIn(user, (err) => {
            if (err) return next(err);
            return res.json({ msg: 'Login realizado!' }); 
        });
    })(req, res, next);
});
// ... imports

app.get('/api/profile', (req, res) => {
    if (req.isAuthenticated()) {
        res.json(req.user); // Retorna as informações do usuário logado
    } else {
        res.status(401).json({ message: 'Não autorizado' }); 
    }
});
const express = require('express');
const multer = require('multer'); // Importar o multer
// ... outras importações

const upload = multer({ /* opções de configuração do multer */ }); // Configurar o destino das imagens

app.post('/api/send-cpr', upload.single('cprDocument'), async (req, res) => {
    try {
        const { value, areaSize, fundType } = req.body;
        const file = req.file;

        // Lógica para processar os dados enviados (salvar arquivo, armazenar metadados no banco, etc.)
        res.json({ message: 'CPR enviado com sucesso!' });
    } catch (error) {
        console.error('Erro ao processar CPR:', error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor' });
    }
});

// ... outras rotas e configuração do server
// ... imports

app.get('/api/get-cprs', async (req, res) => {
    try {
        // Lógica para buscar CPRs relacionados à cooperativa (baseado no usuário da cooperativa logado)
        const cprs = await CPRModel.find(/* condições de busca */); 
        res.json(cprs);
    } catch (error) {
        console.error('Erro ao carregar CPRs:', error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor' });
    }
});

app.post('/api/forward-cpr/:cprId', async (req, res) => { 
    try {
        const { cprId } = req.params;

        // Lógica para encaminhar o CPR para o banco:
           // 1. Buscar CPR pelo ID
           // 2. Atualizar status do CPR (ex: 'enviado_para_banco')
           // 3. Salvar alterações

        res.json({ message: 'CPR encaminhado para o banco' });
    } catch (error) {
        console.error('Erro ao encaminhar CPR:', error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor' });
    }
});

// ... outras rotas e configuração do server
// ... outras rotas

app.post('/api/forward-cpr/:cprId', async (req, res) => {
    try {
        const { cprId } = req.params;
        const cooperativeId = req.user.id; // Verificar se o usuário logado é da cooperativa

        const cpr = await CPRModel.findByIdAndUpdate(cprId, {
            status: 'enviado_para_banco',
            cooperativeId,
        }, { new: true });

        if (!cpr) {
            return res.status(404).json({ message: 'CPR não encontrado' });
        }

        res.json({ message: 'CPR encaminhado para o banco' });
    } catch (error) {
        console.error('Erro ao encaminhar CPR:', error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor' });
    }
});

// ... outras rotas
// ... outras rotas

app.get('/api/get-enviados', async (req, res) => {
    try {
      const cooperativeId = req.user.id; // Busque com base no usuário logado
  
      const encaminhados = await CPRModel.find({
        cooperativeId,
        status: 'enviado_para_banco', 
      }).populate('farmerId', 'username') // Popule com username do agricultor
        .populate('bankId', 'name'); // Popule com o nome do banco 
  
      res.json(encaminhados);
    } catch (error) {
      console.error('Erro ao carregar enviados:', error);
      res.status(500).json({ message: 'Ocorreu um erro no servidor' });
    }
  });
  // ... outras rotas

app.get('/api/get-banco', async (req, res) => {
    try {
        const bankId = req.user.id; // Busque com base no usuário logado

        const cprs = await CPRModel.find({
            bankId,
        }); // ... (ajuste o modelo se necessário) 

        res.json(cprs);
    } catch (error) {
        console.error('Erro ao carregar CPRs para o banco: ', error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor' });
    }
});

app.post('/api/approve-cpr/:cprId', async (req, res) => { 
    // Implemente a lógica para aprovar (Atualizar status)
});

app.post('/api/reject-cpr/:cprId', async (req, res) => { 
    // Implemente a lógica para recusar (Atualizar status)
});
