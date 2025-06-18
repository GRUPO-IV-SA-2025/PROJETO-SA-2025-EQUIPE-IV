import App from "../App";
import TelaLogin from "../pages/Login/Login";
import TelaCadastro from "../pages/Cadastro/Cadastro";
import PaginaInicial from "../pages/PaginaInicial/PaginaInicial";
import Financeiro from "../pages/Financeiro/Financeiro";
import Produtos from "../pages/Produtos/Produtos";
import Perfil from "../pages/Perfil/Perfil";
import Produtos1 from "../pages/Produtos1/Produtos1"

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
        path: '/pages/PaginaInicial',
        element: <PaginaInicial />
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
        path: '/pages/Produtos1',
        element: <Produtos1 />
    }
]

export default rotas;