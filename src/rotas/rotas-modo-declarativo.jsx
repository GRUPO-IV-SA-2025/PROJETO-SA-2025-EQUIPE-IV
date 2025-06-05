import App from "../App";
import TelaLogin from "../telas/Login/Login";
import TelaCadastro from "../telas/Cadastro/Cadastro";
import PaginaInicial from "../telas/PaginaInicial/PaginaInicial";
import Financeiro from "../telas/Financeiro/Financeiro"

const rotas = [
    {
        path: '/',
        element: <App /> 
    },
    {
        path: '/telas/Login/Login',
        element: <TelaLogin /> 
    },
    {
        path: '/telas/Cadastro/Cadastro',
        element: <TelaCadastro /> 
    },
    {
        path: '/telas/PaginaInicial',
        element: <PaginaInicial />
    },
    {
        path: '/telas/Financeiro',
        element: <Financeiro />
    }
]

export default rotas;