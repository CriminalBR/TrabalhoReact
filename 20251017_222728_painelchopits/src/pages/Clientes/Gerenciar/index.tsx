import axios from "axios";
import { useCallback, useEffect, useRef, useState, type SyntheticEvent } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from "../../../components/Loading";

export default function GerenciarClientes() {

    const navigate = useNavigate();
    const { id } = useParams(); // Pega o ID da URL
    const refForm = useRef<any>(null);
    const [isEditar, setIsEditar] = useState(false); // Define se é modo de edição
    const [isLoading, setIsLoading] = useState(false);

    // Efeito para buscar dados do cliente se for modo de edição
    useEffect(() => {
        if (id && id !== 'cadastrar') {
            const idCliente = Number(id);
            if (!isNaN(idCliente)) {
                setIsLoading(true);
                setIsEditar(true);
                
                axios.get(`http://localhost:3001/clientes/${idCliente}`)
                    .then(({ data }) => {
                        // Preenche o formulário com os dados do cliente
                        refForm.current['nomeCompleto'].value = data.nomeCompleto;
                        refForm.current['cpf'].value = data.cpf;
                        refForm.current['dataNascimento'].value = data.dataNascimento;
                        refForm.current['email'].value = data.email;
                        refForm.current['telefone'].value = data.telefone;
                        refForm.current['logradouro'].value = data.logradouro;
                        refForm.current['numero'].value = data.numero;
                        refForm.current['complemento'].value = data.complemento;
                        refForm.current['bairro'].value = data.bairro;
                        refForm.current['cidade'].value = data.cidade;
                        refForm.current['estado'].value = data.estado;
                    })
                    .catch((erro) => {
                        console.log(erro);
                        alert('Erro ao carregar dados do cliente.');
                        navigate('/clientes');
                    })
                    .finally(() => {
                        setIsLoading(false);
                    });
            }
        }
    }, [id, navigate]);

    // Função de submit do formulário (Create e Update)
    const submitForm = useCallback(async (event: SyntheticEvent) => {
        event.preventDefault();

        if (refForm.current.checkValidity()) {
            setIsLoading(true);

            // Coleta os dados do formulário
            const target = event.target as typeof event.target & {
                nomeCompleto: { value: string },
                cpf: { value: string },
                dataNascimento: { value: string },
                email: { value: string },
                telefone: { value: string },
                logradouro: { value: string },
                numero: { value: string },
                complemento: { value: string },
                bairro: { value: string },
                cidade: { value: string },
                estado: { value: string },
            }

            // Monta o objeto do cliente
            const objSalvar = {
                nomeCompleto: target.nomeCompleto.value,
                cpf: target.cpf.value,
                dataNascimento: target.dataNascimento.value,
                email: target.email.value,
                telefone: target.telefone.value,
                logradouro: target.logradouro.value,
                numero: target.numero.value,
                complemento: target.complemento.value,
                bairro: target.bairro.value,
                cidade: target.cidade.value,
                estado: target.estado.value,
            }

            try {
                if (isEditar) {
                    // Modo Edição (Update - PUT)
                    await axios.put(`http://localhost:3001/clientes/${id}`, objSalvar);
                    alert('Cliente atualizado com sucesso!');
                } else {
                    // Modo Criação (Create - POST)
                    await axios.post('http://localhost:3001/clientes', objSalvar);
                    alert('Cliente salvo com sucesso!');
                }
                navigate('/clientes'); // Volta para a lista
            } catch (erro) {
                console.log(erro);
                alert('Erro ao salvar cliente.');
            } finally {
                setIsLoading(false);
            }

        } else {
            refForm.current.classList.add('was-validated');
        }
    }, [isEditar, id, navigate]);

    return (
        <>
            <Loading visible={isLoading} />
            <h1>
                {isEditar ? 'Editar Cliente' : 'Cadastrar Cliente'}
            </h1>
            <hr />

            <form
                noValidate
                className="needs-validation g-3 row"
                ref={refForm}
                onSubmit={submitForm}
            >
                {/* --- Dados Pessoais --- */}
                <div className="col-md-6">
                    <label htmlFor="nomeCompleto" className="form-label">Nome Completo</label>
                    <input type="text" className="form-control" id="nomeCompleto" required />
                    <div className="invalid-feedback">O nome é obrigatório.</div>
                </div>
                
                <div className="col-md-3">
                    <label htmlFor="cpf" className="form-label">CPF</label>
                    <input type="text" className="form-control" id="cpf" required />
                    <div className="invalid-feedback">O CPF é obrigatório.</div>
                </div>

                <div className="col-md-3">
                    <label htmlFor="dataNascimento" className="form-label">Data Nasc.</label>
                    <input type="date" className="form-control" id="dataNascimento" required />
                    <div className="invalid-feedback">A data é obrigatória.</div>
                </div>

                {/* --- Contato --- */}
                 <div className="col-md-6">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" required />
                    <div className="invalid-feedback">Digite um email válido.</div>
                </div>

                <div className="col-md-6">
                    <label htmlFor="telefone" className="form-label">Telefone</label>
                    <input type="text" className="form-control" id="telefone" required />
                    <div className="invalid-feedback">O telefone é obrigatório.</div>
                </div>
                
                {/* --- Endereço --- */}
                <div className="col-md-5">
                    <label htmlFor="logradouro" className="form-label">Logradouro</label>
                    <input type="text" className="form-control" id="logradouro" required />
                    <div className="invalid-feedback">O logradouro é obrigatório.</div>
                </div>

                <div className="col-md-2">
                    <label htmlFor="numero" className="form-label">Número</label>
                    <input type="text" className="form-control" id="numero" required />
                    <div className="invalid-feedback">O número é obrigatório.</div>
                </div>

                <div className="col-md-5">
                    <label htmlFor="complemento" className="form-label">Complemento</label>
                    <input type="text" className="form-control" id="complemento" />
                </div>

                <div className="col-md-4">
                    <label htmlFor="bairro" className="form-label">Bairro</label>
                    <input type="text" className="form-control" id="bairro" required />
                    <div className="invalid-feedback">O bairro é obrigatório.</div>
                </div>

                <div className="col-md-4">
                    <label htmlFor="cidade" className="form-label">Cidade</label>
                    <input type="text" className="form-control" id="cidade" required />
                    <div className="invalid-feedback">A cidade é obrigatória.</div>
                </div>

                <div className="col-md-4">
                    <label htmlFor="estado" className="form-label">Estado (Sigla)</label>
                    <input type="text" className="form-control" id="estado" required maxLength={2} />
                    <div className="invalid-feedback">O estado (UF) é obrigatório.</div>
                </div>

                {/* --- Botões --- */}
                <div className="col-md-12 mt-3">
                    <button
                        className="btn btn-secondary"
                        type="button"
                        style={{ marginRight: 10 }}
                        onClick={() => navigate('/clientes')}
                    >
                        Voltar
                    </button>

                    <button
                        className="btn btn-primary"
                        type="submit"
                    >
                        Salvar
                    </button>
                </div>
            </form>
        </>
    )
}