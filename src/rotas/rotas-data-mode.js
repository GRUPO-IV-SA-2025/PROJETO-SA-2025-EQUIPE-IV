import App from "../App";
import TelaLogin from "../telas/LoginUsuario/LoginUsuario";
import TelaCadastro from "../telas/Cadastro/Cadastro";
import Dashboard from "../telas/Dashboard/Dashboard"
import Financeiro from "../pages/Financeiro/Financeiro";
import Perfil from "../pages/Perfil/Perfil"
import Sobre from "../pages/Sobre/Sobre"

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
        path: '/pages/Dashboard',
        Component: <Dashboard />
    },
    {
        path: '/pages/Financeiro',
        Component: <Financeiro />
    },
    {
        path: '/pages/Perfil',
        Component: <Perfil />
    },
    {
        path: '/pages/Sobre',
        Component: <Sobre />
    }
]

export default rotas;