import App from "../App";
import TelaLogin from "../pages/Login/Login";
import TelaCadastro from "../pages/Cadastro/Cadastro";
import PaginaInicial from "../pages/PaginaInicial/PaginaInicial";
import Financeiro from "../telas/Financeiro/Financeiro";

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
        path: '/telas/Financeiro',
        element: <Financeiro />
    }
]

export default rotas;