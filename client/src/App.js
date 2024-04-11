import React from 'react';
import './App.css'; // Importe seu arquivo CSS (se existir)
import { AuthProvider } from './AuthContext'; 
import AppRouter from './components/AppRouter';

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
// ... dentro do Express app.js
app.get('/api/logout', (req, res) => {
    req.logout(err => {
        if (err) return next(err); 
        res.send('Usuário deslogado com sucesso!'); 
    });
});
