import App from "../App";
import TelaLogin from "../telas/Login/Login";
import TelaCadastro from "../telas/Cadastro/Cadastro";

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
    }
]

export default rotas;