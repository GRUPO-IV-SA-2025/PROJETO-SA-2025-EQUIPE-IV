import App from "../App";
import TelaLogin from "../telas/Login/Login";
import TelaCadastro from "../telas/Cadastro/Cadastro";
import PaginaInicial from "../telas/PaginaInicial/PaginaInicial";

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
        path: '/telas/Home/Home',
        element: <PaginaInicial />
    }
]

export default rotas;