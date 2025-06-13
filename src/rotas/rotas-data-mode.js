import App from "../App";
import TelaLogin from "../telas/Login/Login";
import TelaCadastro from "../telas/Cadastro/Cadastro";
import PaginaInicial from "../telas/PaginaInicial/PaginaInicial"
import Financeiro from "../pages/Financeiro/Financeiro";
import Perfil from "../pages/Perfil/Perfil"

const rotas = [
    {
        path: '/',
        Component: <App />
    },
    {
        path: '/pages/Login',
        Component: <TelaLogin />
    },
    {
        path: '/pages/Cadastro',
        Component: <TelaCadastro />
    },
    {
        path: '/pages/PaginaInicial',
        Component: <PaginaInicial />
    },
    {
        path: '/pages/Financeiro',
        Component: <Financeiro />
    },
    {
        path: '/pages/Perfil',
        Component: <Perfil />
    }
]

export default rotas;