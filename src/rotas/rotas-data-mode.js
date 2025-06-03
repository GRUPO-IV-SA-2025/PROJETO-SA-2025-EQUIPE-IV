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
        path: '/telas/Login',
        Component: <TelaLogin />
    },
    {
        path: '/telas/Cadastro',
        Component: <TelaCadastro />
    },
    {
        path: '/telas/Home',
        Component: <PaginaInicial />
    }
]

export default rotas;