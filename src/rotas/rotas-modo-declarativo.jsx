import App from "../App";
import TelaLogin from "../pages/Login/Login";
import TelaCadastro from "../pages/Cadastro/Cadastro";
import PaginaInicial from "../pages/PaginaInicial/PaginaInicial";
import Financeiro from "../pages/Financeiro/Financeiro";
import PerfilUsuario from "../pages/PerfilUsuario/PerfilUsuario";

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
        path: '/pages/PerfilUsuario',
        element: <PerfilUsuario />
    }
]

export default rotas;