import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [usuarioLogado, setUsuarioLogado] = useState(false);
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const usuarioNoStorage = localStorage.getItem('usuario');
        if(usuarioNoStorage) {
            setUsuario(JSON.parse(usuarioNoStorage))
        }
    }, [])

    const login = (dadoUsuario) => {
        localStorage.setItem('usuario', JSON.stringify(dadoUsuario))
        // console.log(dadoUsuario);
        setUsuarioLogado(true);
        setUsuario(dadoUsuario);
    };

    const logOut = () => {
        localStorage.removeItem('usuario')
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