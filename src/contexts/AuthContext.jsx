import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [usuarioLogado, setUsuarioLogado] = useState(false);
    const [usuario, setUsuario] = useState(null);

    const login = (dadoUsuario) => {
        setUsuarioLogado(true);
        setUsuario(dadoUsuario);
    }

    const logOut = () => {
        setUsuarioLogado(false);
        setUsuario(null);
    }

    return (
        <AuthContext.Provider value={{ usuarioLogado, usuario, login, logOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider; 