import { Component } from "react"
import App from "../App";
import TelaLogin from "../telas/Login";
import TelaCadastro from "../telas/Cadastro";

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