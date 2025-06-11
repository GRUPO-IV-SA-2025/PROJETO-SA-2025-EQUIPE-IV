import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [usuarioLogado, setUsuarioLogado] = useState(false);
    const [usuario, setUsuario] = useState(null);

    const login = (dadoUsuario) => {
        setUsuarioLogado(true);
        setUsuario(dadoUsuario);
    };

    const logOut = () => {
        setUsuarioLogado(false);
        setUsuario(null);
    };

    return (
        <AuthContext.Provider value={{ usuarioLogado, usuario, login, logOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }
    return context;
};