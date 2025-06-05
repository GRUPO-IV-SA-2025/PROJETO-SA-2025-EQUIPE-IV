import { Component } from "react"
import App from "../App";
import TelaLogin from "../telas/Login/Login";
import TelaCadastro from "../telas/Cadastro/Cadastro";
import PaginaInicial from "../telas/PaginaInicial/PaginaInicial"

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
        path: '/pages/Home',
        Component: <PaginaInicial />
    }
]

export default rotas;