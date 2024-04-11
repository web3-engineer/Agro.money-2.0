import React, { createContext, useState } from 'react';

const AuthContext = createContext({
   isLoggedIn: false,
   userType: null,
   login: () => {},
   logout: () => {}, 
});

function AuthProvider({ children }) {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [userType, setUserType] = useState(null);

   const login = (username, password, role) => {
       // Implementar a lógica de verificação (ex: validação básica)
       if (/* condição de usuário e senha validos */) {
           setIsLoggedIn(true);
           setUserType(role);
       }
   };

   const logout = () => {
       setIsLoggedIn(false);
       setUserType(null);
   };

   return (
       <AuthContext.Provider value={{ isLoggedIn, userType, login, logout }}>
           {children}
       </AuthContext.Provider>
   );
}

export { AuthContext, AuthProvider }; 
