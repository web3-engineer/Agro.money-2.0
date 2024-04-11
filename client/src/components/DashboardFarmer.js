import React, { useState, useContext } from 'react';
import { Tailwind } from 'tailwindcss'; // Importar o Tailwind
import { AuthContext } from '../AuthContext';
import axios from 'axios'; // Importar o Axios

const DashboardFarmer = () => {
    const [value, setValue] = useState('');
    const [areaSize, setAreaSize] = useState('');
    const [fundType, setFundType] = useState('');
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const { isLoggedIn, logout } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('cprDocument', file);
        formData.append('value', value);
        formData.append('areaSize', areaSize);
        formData.append('fundType', fundType);

        try {
            const response = await axios.post('http://localhost:5000/api/send-cpr', formData);
            setMessage(response.data.message);
        } catch (error) {
            console.error('Erro ao enviar CPR:', error);
            setMessage('Ocorreu um erro ao enviar o CPR');
        }
    };

    if (!isLoggedIn) {
        return <p>Você precisa estar logado para acessar o dashboard.</p>;
    }

    return (
        <div className="container mx-auto">
            {/* ... Design do Dashboard com Tailwind */}
            <div>
                {/* Formulário de Envio */}
                <form onSubmit={handleSubmit}>
                    {/* Inputs para Value, Area Size e Fund Type */}
                    {/* Campo de Upload de Arquivo */}
                    <button type="submit">Enviar CPR</button>
                </form>
                {message && <p>{message}</p>} 
            </div>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default DashboardFarmer;
const DashboardFarmer = () => {
    const [cprs, setCprs] = useState([]);

    useEffect(() => {
        const fetchCprs = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/get-cprs');
                setCprs(response.data);
            } catch (error) {
                console.error('Erro ao carregar CPRs:', error);
            }
        };
        fetchCprs();
    }, []);

    return (
        <div className="container mx-auto">
            <h2>Meus CPRs</h2>
            <table>
                <thead>
                    <tr>
                        <th>Data de Envio</th>
                        <th>Valor</th>
                        <th>Área</th>
                        <th>Tipo de Fundo</th>
                        <th>Status</th>
                        <th>Documento</th>
                    </tr>
                </thead>
                <tbody>
                    {cprs.map((cpr) => (
                        <tr key={cpr.id}>
                            <td>{cpr.createdAt}</td>
                            <td>{cpr.value}</td>
                            <td>{cpr.areaSize}</td>
                            <td>{cpr.fundType}</td>
                            <td>{cpr.status}</td>
                            <td><a href={cpr.documentUrl} target="_blank" rel="noreferrer">Visualizar</a></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
const DashboardFarmer = () => {
    const [cprs, setCprs] = useState([]);
    const [editCprId, setEditCprId] = useState(null);
    const [formData, setFormData] = useState({
        value: '',
        areaSize: '',
        fundType: '',
    });

    useEffect(() => {
        const fetchCprs = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/get-cprs');
                setCprs(response.data);
            } catch (error) {
                console.error('Erro ao carregar CPRs:', error);
            }
        };
        fetchCprs();
    }, []);

    const handleEditCpr = (cprId) => {
        setEditCprId(cprId);
        const cpr = cprs.find((c) => c.id === cprId);
        setFormData({
            value: cpr.value,
            areaSize: cpr.areaSize,
            fundType: cpr.fundType,
        });
    };

    const handleSaveCpr = async () => {
        const { value, areaSize, fundType } = formData;
        const cprData = {
            id: editCprId,
            value,
            areaSize,
            fundType,
        };

        try {
            await axios.put('http://localhost:5000/api/update-cpr', cprData);
            setEditCprId(null);
            // Atualizar a lista de CPRs
        } catch (error) {
            console.error('Erro ao atualizar CPR:', error);
        }
    };

    return (
        <div className="container mx-auto">
            <h2>Meus CPRs</h2>
            <table>
                <thead>
                    <tr>
                        <th>Data de Envio</th>
                        <th>Valor</th>
                        <th>Área</th>
                        <th>Tipo de Fundo</th>
                        <th>Status</th>
                        <th>Documento</th>
                        <th>Ações</th>
                    </tr>
                
                    // ... Resto do componente

<tbody>
    {cprs.map((cpr) => (
        <tr key={cpr.id}>
            <td>{cpr.createdAt}</td>
            {editCprId === cpr.id ? (
                <>
                    <td><input type="text" value={formData.value} onChange={(e) => setFormData({ ...formData, value: e.target.value })} /></td>
                    {/* Inputs para areaSize e fundType */}
                    <td colspan="2"> 
                        <button  onClick={handleSaveCpr}>Salvar</button>
                        <button onClick={() => setEditCprId(null)}>Cancelar</button>
                    </td>
                </>
            ) : (
                <>
                    <td>{cpr.value}</td>
                    {/* <td> para areaSize e fundType */}
                    <td>{cpr.status}</td>
                    <td><a href={cpr.documentUrl} target="_blank" rel="noreferrer">Visualizar</a></td>
                    <td>
                        {cpr.status === 'Em Análise' && (
                            <button onClick={() => handleEditCpr(cpr.id)}>Editar</button>
                        )}
                    </td>
                </>
            )}
        </tr>
    ))}
</tbody>
</table>
        // ... (resto do componente)
    );
};

