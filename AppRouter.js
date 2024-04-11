// ... imports
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, isLoggedIn }) => {
    return isLoggedIn ? children : <Navigate to="/login/farmer" />;
};

// ... dentro do AppRouter
<Routes>
    {/* ... */}
    <Route
        path="/dashboard-farmer"
        element={
            <PrivateRoute isLoggedIn={isLoggedIn && userType === 'farmer'}> 
                <DashboardFarmer />
            </PrivateRoute>
        }
    />
{/* ... outras rotas protegidas */}
</Routes>
