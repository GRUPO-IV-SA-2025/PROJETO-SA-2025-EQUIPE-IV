import App from "../App";
import TelaCadastro from "../telas/Cadastro";
import TelaLogin from "../telas/Login";

const rotas = [
    {
        path: '/',
        element: <App /> 
    },
    {
        path: '/telas/Login',
        element: <TelaLogin /> 
    },
    {
        path: '/telas/Cadastro',
        element: <TelaCadastro /> 
    }
]

export default rotas;