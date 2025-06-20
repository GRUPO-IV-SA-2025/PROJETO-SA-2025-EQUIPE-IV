import { Box, Avatar, Typography, TextField } from "@mui/material";
import Header from "../../components/Header/Header"
import { useAuth } from "../../contexts/AuthContext";
import useProtectedData from "../../hooks/useProtectedData";

function Perfil() {
    const { usuario, usuarioLogado } = useAuth();

    const {
        dados: perfil,
        carregando,
        error
    } = useProtectedData(
        usuarioLogado && usuario?.id ? `/usuarios/${usuario?.id}` : null);

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

            </Box>

            <Box sx={{ width: '72%', display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', paddingTop: 15, paddingLeft: 10 }}>

                <Box sx={{ gap: "30px" }}>
                    <Typography variant="h2" sx={{ color: 'black' }}>Dados da Empresa</Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                    <Typography variant="h5" sx={{ paddingTop: 8 }}>Nome da Empresa</Typography>

                    <TextField id="outlined-basic" variant="outlined"
                        slotProps={{
                            input: {
                                readOnly: true,
                            },
                        }}
                        sx={{ width: '750px' }}
                        value={perfil.empresa}
                    />

                    <Typography variant="h5" sx={{ paddingTop: 7 }}>Proprietário</Typography>
                    <TextField id="outlined-basic" variant="outlined"
                        slotProps={{
                            input: {
                                readOnly: true,
                            },
                        }}
                        sx={{ width: '750px' }}
                        value={perfil.nome + ' ' + perfil.sobrenome}
                    />

                    <Typography variant="h5" sx={{ paddingTop: 7 }}>Contato</Typography>
                    <TextField id="outlined-basic" variant="outlined"
                        slotProps={{
                            input: {
                                readOnly: true,
                            },
                        }}
                        sx={{ width: '750px' }} 
                        value={perfil.contato}
                        />

                    <Typography variant="h5" sx={{ paddingTop: 7 }}>E-mail</Typography>
                    <TextField id="outlined-basic" variant="outlined"
                        slotProps={{
                            input: {
                                readOnly: true,
                            },
                        }}
                        sx={{ width: '750px' }} 
                        value={perfil.email}
                        />
                </Box>


            </Box>
        </Box>


    )
}

export default Perfil;