import { useNavigate, Outlet } from 'react-router-dom';

export const Layout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Limpa o token do localStorage e redireciona para o login
        localStorage.removeItem('chopts:token');
        navigate('/');
    };

    return (
        <div className="container">
            {/* Navbar simples do Bootstrap */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
                <div className="container-fluid">
                    <span className="navbar-brand">Painel</span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={() => navigate('/usuarios')}>Usuários</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={() => navigate('/clientes')}>Clientes</a>
                            </li>
                        </ul>
                        <button className="btn btn-outline-danger" onClick={handleLogout}>
                            Sair
                        </button>
                    </div>
                </div>
            </nav>

            {/* O Outlet renderiza a rota filha (Clientes, Usuarios, etc.) */}
            <Outlet />
        </div>
    );
};