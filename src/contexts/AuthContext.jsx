import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        const usuarioNoStorage = localStorage.getItem('usuario');
        const token = localStorage.getItem('token');
        if (usuarioNoStorage) {
            setUsuario(JSON.parse(usuarioNoStorage))
        }

        if (token) {
            try {
                const decoded = JSON.parse(atob(token.split('.')[1]));
                setUsuario({
                    id: decoded.id,
                    nome: decoded.nome || dadosUsuario.nome,
                    email: decoded.email || dadosUsuario.email,
                    token
                });
            } catch (error) {
                console.error('Token inválido:', error);
                localStorage.removeItem('token');
            }
        }
        setCarregando(false)
    }, [])

    const login = (dadosUsuario, token) => {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        setUsuario({
            id: decoded.id,
            nome: decoded.nome || dadosUsuario.nome,
            email: decoded.email || dadosUsuario.email,
            token
        });
    }

    const logOut = async () => {
        localStorage.removeItem('token');
        setUsuario(null);
    };

    return (
        <AuthContext.Provider value={{ usuarioLogado: !!usuario, usuario, login, logOut, carregando }}>
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