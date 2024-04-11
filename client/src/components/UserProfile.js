// ... imports
import { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState(null); 

    useEffect(() => {
        const getProfileData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/profile');
                setUserData(response.data); 
            } catch (error) {
                console.error('Erro ao carregar perfil:', error); 
            } finally {
                setIsLoading(false);
            }
        };
        getProfileData(); 
    }, []);

    if (isLoading) return <div>Carregando perfil...</div>;

    // Renderizar informações do usuário se carregadas com sucesso
    // ... render profile data using userData
};
