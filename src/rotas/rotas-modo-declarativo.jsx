import App from "../App";
import Dashboard from "../pages/Dashboard/Dashboard";
import Financeiro from "../pages/Financeiro/Financeiro";
import Produtos from "../pages/Produtos/Produtos";
import Perfil from "../pages/Perfil/Perfil"

import TelaLogin from "../pages/LoginUsuario/LoginUsuario"
import TelaCadastroUsuario from "../pages/CadastroUsuario/CadastroUsuario"
import Estoque from "../pages/Estoque/Estoque"
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router";

const RotaLogin = () => {
    const { usuarioLogado } = useAuth();
    if (usuarioLogado) return <Navigate to="/Dashboard" replace />
    return <TelaLogin />;
}

const RotaRaiz = () => {
    const { usuarioLogado } = useAuth();
    if (usuarioLogado) return <Navigate to="/Dashboard" replace />
    return <App />;
}

const RotaProtegida = ({ children }) => {
    const { usuarioLogado, carregando } = useAuth();

    if (carregando) {
        return <div>Carregando...</div>
    }

    if (!usuarioLogado) {
        localStorage.removeItem('token');
        return <Navigate to="/LoginUsuario" replace />;
    }

    return children;
}

const rotas = [
    {
        path: '/',
        element: <RotaRaiz />
    },
    {
        path: '/LoginUsuario',
        element: <RotaLogin />
    },
    {
        path: '/CadastroUsuario',
        element: <TelaCadastroUsuario />
    },
    {
        path: '/Dashboard',
        element: <RotaProtegida><Dashboard /></RotaProtegida>
    },
    {
        path: '/Financeiro',
        element: <RotaProtegida><Financeiro /></RotaProtegida>
    },
    {
        path: '/Estoque',
        element: <RotaProtegida><Estoque /></RotaProtegida>
    },
    {
        path: '/Perfil',
        element: <RotaProtegida><Perfil /></RotaProtegida>
    },
    {
        path: '/Produtos',
        element: <RotaProtegida><Produtos /></RotaProtegida>
    }
]

export default rotas;