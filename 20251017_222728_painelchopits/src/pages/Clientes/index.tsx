import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { FaPen, FaTrash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { Loading } from '../../components/Loading';
import { Toast } from '../../components/Toast';
import { verificaTokenExpirado } from '../../service/token';

// Interface para definir a estrutura de dados do Cliente
interface ICliente {
    id: number;
    nomeCompleto: string;
    cpf: string;
    dataNascimento: string;
    email: string;
    telefone: string;
    logradouro: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    estado: string;
}

export const Clientes = () => {

    const navigate = useNavigate();

    const [clientes, setClientes] = useState<ICliente[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const [showToast, setShowToast] = useState(false)
    const [messageToast, setMessageToast] = useState('')
    const [corToast, setCorToast] = useState('success')

    // Função para carregar os clientes da API
    const carregarClientes = useCallback(async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.get('http://localhost:3001/clientes');
            setClientes(data);
        } catch (error) {
            console.error(error);
            setCorToast('danger');
            setMessageToast('Erro ao carregar clientes.');
            setShowToast(true);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Efeito para carregar os clientes ao iniciar a página e verificar o token
    useEffect(() => {
        // Verifica se o usuário está logado 
        let lsToken = localStorage.getItem('chopts:token')
        let token: any = null;

        if (typeof lsToken === 'string') {
            token = JSON.parse(lsToken)
        }

        // Se não houver token ou estiver expirado, redireciona para o login
        if (verificaTokenExpirado(token?.accessToken)) {
             navigate('/');
        } else {
            // Se estiver logado, carrega os clientes
            carregarClientes();
        }

    }, [navigate, carregarClientes]);

    // Função para excluir um cliente (Delete)
    const excluirCliente = useCallback(async (id: number) => {
        // Adiciona confirmação simples antes de excluir
        const confirmar = window.confirm('Tem certeza que deseja excluir este cliente?');
        
        if (confirmar) {
            setIsLoading(true);
            try {
                await axios.delete(`http://localhost:3001/clientes/${id}`);
                
                // Recarrega a lista de clientes após a exclusão
                await carregarClientes(); 

                setCorToast('success');
                setMessageToast('Cliente excluído com sucesso!');
                setShowToast(true);
            } catch (erro) {
                setCorToast('danger');
                setMessageToast('Erro ao excluir cliente.');
                setShowToast(true);
                console.log(erro);
            } finally {
                setIsLoading(false);
            }
        }
    }, [carregarClientes]); // Adiciona carregarClientes como dependência

    return (
        <>
            <Toast
                color={corToast}
                show={showToast}
                message={messageToast}
                onClose={() => { setShowToast(false) }}
            />
            <Loading visible={isLoading} />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: 10,
                    marginBottom: 10
                }}
            >
                <h1>Clientes</h1>
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => {
                        navigate('/clientes/cadastrar') // Navega para a página de criação
                    }}
                >
                    Adicionar
                </button>
            </div>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome Completo</th>
                        <th scope="col">CPF</th>
                        <th scope="col">Email</th>
                        <th scope="col">Telefone</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        clientes.map((cliente) => {
                            return (
                                <tr key={cliente.id}>
                                    <th scope="row">{cliente.id}</th>
                                    <td>{cliente.nomeCompleto}</td>
                                    <td>{cliente.cpf}</td>
                                    <td>{cliente.email}</td>
                                    <td>{cliente.telefone}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            type="button"
                                            style={{ marginRight: 5 }}
                                            onClick={() => {
                                                // Navega para a página de edição
                                                navigate(`/clientes/${cliente.id}`) 
                                            }}
                                        >
                                            <FaPen />
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            type="button"
                                            onClick={() => {
                                                excluirCliente(cliente.id)
                                            }}
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}