import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom"
// Remova Home e Categorias se não forem mais usados, ou mantenha se necessário
// import { Home } from "./pages/Home" 
// import { Categorias } from "./pages/Categorias"
import { Usuarios } from "./pages/Usuarios"
import GerenciarUsuarios from "./pages/Usuarios/Gerenciar"
import Login from "./pages/Login"

// 1. Importe os novos componentes
import { Clientes } from "./pages/Clientes"
import GerenciarClientes from "./pages/Clientes/Gerenciar"
import { Layout } from "./components/Layout" // 2. Importe o Layout

export const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Rota de Login (fora do Layout) */}
                <Route
                    path="/"
                    element={<Login />}
                />
                
                {/* 3. Agrupe as rotas protegidas dentro do Layout */}
                <Route element={<Layout />}>
                    {/* Rotas de Usuários */}
                    <Route
                        path="/usuarios"
                        element={<Usuarios />}
                    />
                    <Route
                        path="/usuarios/:id" // Rota para editar usuário
                        element={<GerenciarUsuarios />}
                    />
                    {/* A rota de cadastrar usuário já é coberta por /usuarios/:id */}
                    {/* Se quiser uma rota explícita, use:
                    <Route
                        path="/usuarios/cadastrar"
                        element={<GerenciarUsuarios />}
                    />
                    */}

                    <Route
                        path="/clientes"
                        element={<Clientes />}
                    />
                    <Route
                        path="/clientes/cadastrar" // Rota para cadastrar cliente
                        element={<GerenciarClientes />}
                    />
                     <Route
                        path="/clientes/:id" // Rota para editar cliente
                        element={<GerenciarClientes />}
                    />
                </Route>

                {/* Rotas antigas (se necessário) */}
                {/* <Route
                    path="/categorias/:id"
                    element={<Categorias />}
                /> 
                */}

                {/* Rota 404 (deve ser a última) */}
                <Route
                    path="*"
                    element={<h1>404 - Página Não Encontrada</h1>}
                />
            </Routes>
        </BrowserRouter>
    )
}