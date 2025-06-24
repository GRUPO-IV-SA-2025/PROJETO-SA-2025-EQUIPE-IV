import { createContext, useContext, useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [showExpiredDialog, setshowExpiredDialog] = useState(false);
    const [isBlocked, setIsBlocked] = useState(false);


    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            try {
                const decoded = JSON.parse(atob(token.split('.')[1]));
                setUsuario({
                    id: decoded.id,
                    nome: decoded.nome,
                    email: decoded.email,
                    token
                });
            } catch (error) {
                console.error('Token inválido:', error);
                localStorage.removeItem('token');
            }
        }
        setCarregando(false);


        const handleSessionExpired = () => setshowExpiredDialog(true);

        window.addEventListener('sessionExpired', handleSessionExpired);

        return () => window.removeEventListener('sessionExpired', handleSessionExpired);
    }, []);

    const handleExpiredConfirm = () => {
        localStorage.removeItem('token');
        setUsuario(null);
        setshowExpiredDialog(false);
        setIsBlocked(true);
        window.location.href = '/pages/Home/LoginUsuario?reason=session_expired';
    }

    const login = (token) => {
        localStorage.setItem('token', token);
        const decoded = JSON.parse(atob(token.split('.')[1]));
        setUsuario({
            id: decoded.id,
            nome: decoded.nome,
            email: decoded.email,
            token
        });
    }

    const logOut = async () => {
        localStorage.removeItem('token');
        // navigate('/LoginUsuario');
        setUsuario(null);
    };

    return (
        <AuthContext.Provider value={{
            usuarioLogado: !!usuario,
            usuario,
            login,
            logOut,
            carregando,
            isBlocked
        }}>
            {isBlocked && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    zIndex: 9998,
                    pointerEvents: 'auto'
                }} />
            )}
            {children}

            <Dialog
                open={showExpiredDialog}
                onClose={() => { }}
            >
                <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <WarningAmberIcon color="warning" />
                    Sessão expirada
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Sua sessão expirou. Por favor, faça login novamente.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleExpiredConfirm}
                        variant="contained"
                        fullWidth
                    >
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
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