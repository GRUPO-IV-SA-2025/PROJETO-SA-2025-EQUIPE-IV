import { Component } from "react"
import App from "../App";
import TelaLogin from "../telas/Login/Login";
import TelaCadastro from "../telas/Cadastro/Cadastro";

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
    }
]

export default rotas;