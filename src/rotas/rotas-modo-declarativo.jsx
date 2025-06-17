import App from "../App";
import TelaLogin from "../pages/Login/Login";
import TelaCadastro from "../pages/Cadastro/Cadastro";
import Dashboard from "../pages/Dashboard/Dashboard";
import Financeiro from "../pages/Financeiro/Financeiro";
import Produtos from "../pages/Produtos/Produtos";
import Perfil from "../pages/Perfil/Perfil"
import Sobre from "../pages/Sobre/Sobre"


const rotas = [
    {
        path: '/',
        element: <App /> 
    },
    {
        path: '/pages/Login',
        element: <TelaLogin /> 
    },
    {
        path: '/pages/Cadastro',
        element: <TelaCadastro /> 
    },
    {
        path: '/pages/Dashboard',
        element: <Dashboard />
    },
    {
        path: '/pages/Financeiro',
        element: <Financeiro />
    },
    {
        path: '/pages/Produtos',
        element: <Produtos />
    },
    {
        path: '/pages/Perfil',
        element: <Perfil />
    },
    {
        path: '/pages/Sobre',
        element: <Sobre />
    }
]

export default rotas;