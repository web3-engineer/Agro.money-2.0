import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Tailwind } from 'tailwindcss';
import { AuthContext } from '../AuthContext';

const DashboardCooperative = () => {
    const [cprs, setCprs] = useState([]); // Array para armazenar as informações do CPRs 
    const { isLoggedIn, logout } = useContext(AuthContext);

    useEffect(() => {
        const fetchCprs = async () => { 
            try {
                const response = await axios.get('http://localhost:5000/api/get-cprs'); 
                setCprs(response.data); 
            } catch (error) {
                console.error('Erro ao carregar lista de CPRs:', error);
            }
        };
        fetchCprs();
    }, []); 

    const handleForwardToBank = async (cprId) => {
        // Implementar a lógica para encaminhar o CPR para o banco, atualizando sua informação no banco de dados
    };

    if (!isLoggedIn) {
        return <p>Você precisa estar logado para acessar o dashboard.</p>;
    }

    return (
        <div className="container mx-auto">
            {/* Layout do dashboard com Tailwind */}
            <h1>Dashboard da Cooperativa</h1> 
            <div>
                <h2>Lista de CPRs</h2>
                {cprs.length === 0 ? (
                    <p>Nenhum CPR recebido.</p>
                ) : (
                    <table> 
                        {/* Cabeçalho da tabela */}
                        <tbody>
                            {cprs.map((cpr) => (
                                <tr key={cpr.id}> 
                                    <td>{/* Exibir informações básicas do CPR, como nome do agricultor, etc. */}</td>
                                    <td><a href={cpr.documentUrl} target="_blank" rel="noreferrer">Visualizar Documento</a></td>
                                    <td><button onClick={() => handleForwardToBank(cpr.id)}>Encaminhar para o Banco</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default DashboardCooperative;
const DashboardCooperative = () => {
    // ... outros estados e funções

    const handleForwardToBank = async (cprId) => {
        try {
            await axios.post(`http://localhost:5000/api/forward-cpr/${cprId}`);
            // Atualizar a lista de CPRs (pode refetch ou remover o localmente)
        } catch (error) {
            console.error('Erro ao encaminhar CPR:', error);
        }
    };

    // ... o resto do componente
};
const DashboardCooperative = () => {
    // ... outros estados e funções
  
    useEffect(() => {
      const fetchEncaminhados = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/get-enviados');
          setEncaminhados(response.data);
        } catch (error) { 
          console.error('Erro ao carregar encaminhados:', error);
        }
      };
      fetchEncaminhados();
    }, []);
  
    return (
      <div className="container mx-auto">
        {/* ... Dashboards Principais */}
        <h2> CPRs Encaminhados</h2>
        <table>
          <thead>
            <tr>
              <th>Data de Envio</th>
              <th>Agricultor</th>
              <th>Data de Encaminhamento</th>
              <th>Banco</th> 
            </tr>
          </thead>
          <tbody>
            {encaminhados.map((cpr) => (
              <tr key={cpr.id}> 
                {/* Exiba as informações do cpr */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
 // ... outros estados

 const [filtroStatus, setFiltroStatus] = useState('Pendentes'); 
 const [filtroAgricultor, setFiltroAgricultor] = useState('');

 // ... Funçoes fetchCprs, etc.

 useEffect(() => {
   const fetchCprsWithFilters = async () => {
     try {
       const queryParams = new URLSearchParams({
         status: filtroStatus,
         agricultor: filtroAgricultor,
       }).toString();
       const response = await axios.get(`http://localhost:5000/api/get-cprs?${queryParams}`);
       setCprs(response.data); 
     } catch (error) {
       console.error('Erro ao carregar CPRs com filtros:', error);
     }
   };

   fetchCprsWithFilters();
 }, [filtroStatus, filtroAgricultor]); // Atualiza a busca quando os filtros mudam 

// ... Renderizar campos de filtro
// ... outros estados e funções

const [filtroDataInicio, setFiltroDataInicio] = useState('');
const [filtroDataFim, setFiltroDataFim] = useState('');
const [filtroValorMin, setFiltroValorMin] = useState('');
const [filtroValorMax, setFiltroValorMax] = useState('');
const [filtroAreaMin, setFiltroAreaMin] = useState('');
const [filtroAreaMax, setFiltroAreaMax] = useState('');
const [filtroFundType, setFiltroFundType] = useState('');
const [currentPage, setCurrentPage] = useState(1);

// ... Funções fetchCprs, etc.

useEffect(() => {
    const fetchCprsWithFilters = async () => {
      try {
        const queryParams = new URLSearchParams({
          status: filtroStatus,
          agricultor: filtroAgricultor,
          dataInicio: filtroDataInicio,
          dataFim: filtroDataFim,
          valorMin: filtroValorMin,
          valorMax: filtroValorMax,
          areaMin: filtroAreaMin,
          areaMax: filtroAreaMax,
          fundType: filtroFundType,
          page: currentPage,
        }).toString();

        const response = await axios.get(`http://localhost:5000/api/get-cprs?${queryParams}`);
        setCprs(response.data.cprs);
        setPagesCount(response.data.totalPages); 
      } catch (error) {
        console.error('Erro ao carregar CPRs com filtros:', error);
      }
    };

    fetchCprsWithFilters();
  }, [filtroStatus, filtroAgricultor, filtroDataInicio, filtroDataFim, ...]); // Atualiza a busca quando os filtros mudam

 