import App from "../App";
import Dashboard from "../pages/Dashboard/Dashboard";
import Financeiro from "../pages/Financeiro/Financeiro";
import Produtos from "../pages/Produtos/Produtos";
import Perfil from "../pages/Perfil/Perfil"

import TelaLogin from "../pages/LoginUsuario/LoginUsuario"
import TelaCadastroUsuario from "../pages/CadastroUsuario/CadastroUsuario"
import Estoque from "../pages/Estoque/Estoque"    
import Sobre from "../pages/Sobre/Sobre";

const rotas = [
    {
        path: '/',
        element: <App /> 
    },
    {
        path: '/LoginUsuario',
        element: <TelaLogin /> 
    },
    {
        path: '/CadastroUsuario',
        element: <TelaCadastroUsuario /> 
    },
    {
        path: '/Dashboard',
        element: <Dashboard />
    },
    {
        path: '/Financeiro',
        element: <Financeiro />
    },
    {
        path: '/Estoque',
        element: <Estoque />
    },
    {
        path: '/Perfil',
        element: <Perfil />
    },
    {
        path: '/Produtos',
        element: <Produtos />
    },
    {
        path: '/Sobre',
        element: <Sobre />
    }
]

export default rotas;