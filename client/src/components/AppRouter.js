import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import LoginFarmer from './LoginFarmer';
import LoginCooperative from './LoginCooperative';
import LoginBank from './LoginBank';
import DashboardFarmer from './DashboardFarmer'; // (Crie este componente)

const AppRouter = () => {
    const { isLoggedIn, userType } = useContext(AuthContext);

    return (
        <Router>
            <Routes>
                <Route path="/login/farmer" element={<LoginFarmer />} />
                <Route path="/login/cooperative" element={<LoginCooperative />} />
                <Route path="/login/bank" element={<LoginBank />} />
                {isLoggedIn && userType === 'farmer' && (
                    <Route path="/dashboard-farmer" element={<DashboardFarmer />} />
                )} 
                {/* Adicione mais rotas de usuário logado aqui */}
            </Routes>
        </Router>
    );
};

export default AppRouter;
