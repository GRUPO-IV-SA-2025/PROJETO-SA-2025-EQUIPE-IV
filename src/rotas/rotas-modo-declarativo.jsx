import App from "../App";
import Dashboard from "../pages/Dashboard/Dashboard";
import Financeiro from "../pages/Financeiro/Financeiro";
import Produtos from "../pages/Produtos/Produtos";
import Perfil from "../pages/Perfil/Perfil"
import Sobre from "../pages/Sobre/Sobre"
import TelaCadastroUsuario from "../pages/CadastroUsuario/CadastroUsuario";
import TelaLogin from "../pages/LoginUsuario/LoginUsuario";


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
        path: '/Produtos',
        element: <Produtos />
    },
    {
        path: '/Perfil',
        element: <Perfil />
    },
    {
        path: '/Sobre',
        element: <Sobre />
    }
]

export default rotas;