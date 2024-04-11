import React, { useState } from 'react';
import { Tailwind } from 'tailwindcss';

const LoginFarmer = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implementar lógica de autenticação do agricultor
    // ...
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-white shadow-md rounded-lg p-8 w-full md:w-1/2">
          <h1 className="text-2xl font-bold mb-4">Login do Agricultor</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block mb-2">Nome de Usuário</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block mb-2">Senha</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white rounded-md p-2 w-full hover:bg-green-600"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginFarmer;
// ... outros imports 
import React, { useContext, useState } from 'react';
import { AuthContext } from '../AuthContext';

const LoginFarmer = () => {
  // ... outros states

  const { login } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validação básica: Verifique se o usuário e a senha estão corretos
    if (username === 'agricultor' && password === 'senha') {
      login(username, password, 'farmer'); 
    } else {
      alert('Nome de usuário ou senha inválidos');
    }
  };

  // ... restante do componente
};

export default LoginFarmer;
// ... imports
import axios from 'axios';

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:5000/api/login', { 
            username, 
            password 
        });
        if (response.data.msg === 'Login realizado!') {
            login(username, password, 'farmer'); // Atualiza o AuthContext do frontend  
        }
    } catch (err) {
        alert('Erro no login, verifique as credenciais');
        console.error(err); 
    }
};

// ... restante do componente
// ... imports

const handleLogout = async () => {
    try {
        await axios.get('http://localhost:5000/api/logout'); 
        logout(); // Atualize o AuthContext frontend para deslogar 
    } catch (err) {
        console.error('Erro no logout:', err); 
    }
};

// ... dentro do componente
<button onClick={handleLogout}>Logout</button>
