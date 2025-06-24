import { Box, Avatar, Typography, TextField, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import Header from "../../components/Header/Header"
import { useAuth } from "../../contexts/AuthContext";
import useProtectedData from "../../hooks/useProtectedData";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import api from "../../services/api";
import { AlertCustomizado } from "../../components/AlertCustomizado";


function Perfil() {
    const { usuario, usuarioLogado } = useAuth();
    const [emEdicao, setEmEdicao] = useState(false);
    const [dadosEditados, setDadosEditados] = useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const navigate = useNavigate();

    const [alertState, setAlertState] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const showAlert = (message, severity = 'success') => {
        setAlertState({
            open: true,
            message,
            severity
        });
    };

    const {
        dados: perfil,
        carregando,
        error
    } = useProtectedData(
        usuarioLogado && usuario?.id ? `/usuarios/${usuario?.id}` : null);

    useEffect(() => {
        if (perfil) setDadosEditados(perfil);
    }, [perfil]);

    const salvarDadosEditados = async () => {
        try {
            console.log('Dados sendo enviados:', dadosEditados);
            await api.patch(`/usuarios/${usuario.id}`, dadosEditados);
            setEmEdicao(false);
            showAlert('Perfil atualizado com sucesso!');

        } catch (error) {
            console.error('Erro ao salvar:', error);
            showAlert('Erro ao atualizar perfil!', 'error');
        }
    }

    const [excluindo, setExcluindo] = useState(false);

    const excluirConta = async () => {
        setExcluindo(true);
        try {
            await api.delete(`/usuarios/${usuario.id}`);
            localStorage.removeItem('token');
            navigate('/');
            window.location.reload();
        } catch (error) {
            if (error.response?.status === 404) {
                localStorage.removeItem('token');
                navigate('/');
                window.location.reload();
                console.error("Erro ao excluir conta:", error);
                alert("Erro ao excluir conta.");
            }
        } finally {
            setExcluindo(false);
        }
    }

    if (carregando) return <div>Carregando...</div>;
    if (error) return <div>Erro: {error}</div>;

    return (
        <Box sx={{ width: '100vw', height: '100vh', backgroundColor: '#F0FAFF', gridTemplateColumns: '1fr 1fr', display: 'flex' }}>
            <Header />

            <Box sx={{ width: '28%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 3 }}>
                <Avatar
                    sx={{ height: '350px', width: '350px', padding: '10px', fontSize: '120px', backgroundColor: '#003049' }}>
                    {(perfil?.nome ? perfil.nome[0].toUpperCase() : 'U')}
                </Avatar>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 'bold',
                        color: '#003049',
                        textAlign: 'center',
                        marginTop: 2
                    }}
                >
                    {`${dadosEditados?.nome || ""} ${dadosEditados?.sobrenome || ""}`}
                </Typography>

                <Typography
                    variant="subtitle1"
                    sx={{
                        color: '#555',
                        fontStyle: 'italic',
                        textAlign: 'center'
                    }}
                >
                    Proprietário
                </Typography>
            </Box>

            <Box sx={{ width: '72%', display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', paddingTop: 15, paddingLeft: 10 }}>

                {/* <Box sx={{ gap: "30px" }}>
                    <Typography variant="h2" sx={{ color: 'black' }}>Dados da Empresa</Typography>
                </Box> */}

                <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                    {/* Campo: Nome da Empresa */}
                    <Typography variant="h5" sx={{ paddingTop: 8 }}>Nome da Empresa</Typography>
                    <TextField
                        value={dadosEditados?.empresa || ""}
                        onChange={(e) => setDadosEditados({ ...dadosEditados, empresa: e.target.value })}
                        slotProps={{
                            input: {
                                readOnly: !emEdicao
                            }
                        }}
                        sx={{
                            width: '750px',
                            backgroundColor: 'white',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#003049',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#003049',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#003049',
                                },
                            },
                            '& .MuiInputBase-input': {
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                padding: '14px',
                            },
                        }}
                        variant="outlined"
                    />

                    {/* Campo: Nome (editável) */}
                    <Typography variant="h5" sx={{ paddingTop: 7 }}>Nome</Typography>
                    <TextField
                        value={dadosEditados?.nome || ""}
                        onChange={(e) => setDadosEditados({ ...dadosEditados, nome: e.target.value })}
                        slotProps={{
                            input: {
                                readOnly: !emEdicao
                            }
                        }}
                        sx={{
                            width: '750px',
                            backgroundColor: 'white', // Fundo branco
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#003049', // Cor da borda
                                },
                                '&:hover fieldset': {
                                    borderColor: '#003049',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#003049',
                                },
                            },
                            '& .MuiInputBase-input': {
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                padding: '14px',
                            },
                        }}
                        variant="outlined"
                    />

                    {/* Campo: Sobrenome (editável) */}
                    <Typography variant="h5" sx={{ paddingTop: 7 }}>Sobrenome</Typography>
                    <TextField
                        value={dadosEditados?.sobrenome || ""}
                        onChange={(e) => setDadosEditados({ ...dadosEditados, sobrenome: e.target.value })}
                        slotProps={{
                            input: {
                                readOnly: !emEdicao
                            }
                        }}
                        sx={{
                            width: '750px',
                            backgroundColor: 'white',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#003049',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#003049',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#003049',
                                },
                            },
                            '& .MuiInputBase-input': {
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                padding: '14px',
                            },
                        }}
                        variant="outlined"
                    />
                    {/* Campo: Contato */}
                    <Typography variant="h5" sx={{ paddingTop: 7 }}>Contato</Typography>
                    <TextField
                        value={dadosEditados?.contato || ""}
                        onChange={(e) => setDadosEditados({ ...dadosEditados, contato: e.target.value })}
                        slotProps={{
                            input: {
                                readOnly: !emEdicao
                            }
                        }}
                        sx={{
                            width: '750px',
                            backgroundColor: 'white',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#003049',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#003049',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#003049',
                                },
                            },
                            '& .MuiInputBase-input': {
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                padding: '14px',
                            },
                        }}
                        variant="outlined"
                    />

                    {/* Campo: E-mail */}
                    <Typography variant="h5" sx={{ paddingTop: 7 }}>E-mail</Typography>
                    <TextField
                        value={dadosEditados?.email || ""}
                        onChange={(e) => setDadosEditados({ ...dadosEditados, email: e.target.value })}
                        slotProps={{
                            input: {
                                readOnly: !emEdicao
                            }
                        }}
                        sx={{
                            width: '750px',
                            backgroundColor: 'white',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#003049',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#003049',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#003049',
                                },
                            },
                            '& .MuiInputBase-input': {
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                padding: '14px',
                            },
                        }}
                        variant="outlined"
                    />
                </Box>

                {/* Botões de Ação */}
                <Box sx={{ display: 'flex', gap: 2, marginTop: 4 }}>
                    {!emEdicao ? (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setEmEdicao(true)}
                            sx={{ width: '200px' }}
                        >
                            Editar Perfil
                        </Button>
                    ) : (
                        <>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={salvarDadosEditados}
                                sx={{ width: '200px' }}
                            >
                                Salvar
                            </Button>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => setEmEdicao(false)}
                                sx={{ width: '200px' }}
                            >
                                Cancelar
                            </Button>
                        </>
                    )}
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => setOpenDeleteDialog(true)}
                        sx={{ width: '200px' }}
                        disabled={excluindo}
                    >
                        {excluindo ? 'Excluindo...' : 'Excluir Conta'}
                    </Button>
                </Box>
            </Box>
            {/* Diálogo de Confirmação para Exclusão */}
            <Dialog
                open={openDeleteDialog}
                onClose={() => setOpenDeleteDialog(false)}
            >
                <DialogTitle>Confirmar Exclusão</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
                        Cancelar
                    </Button>
                    <Button
                        onClick={excluirConta}
                        color="error"
                        variant="contained"
                        disabled={excluindo}
                    >
                        {excluindo ? 'Excluindo...' : 'Excluir'}
                    </Button>
                </DialogActions>
            </Dialog>
            <AlertCustomizado
                open={alertState.open}
                onClose={() => setAlertState({ ...alertState, open: false })}
                message={alertState.message}
                severity={alertState.severity}
            />
        </Box>
    )
}

export default Perfil;