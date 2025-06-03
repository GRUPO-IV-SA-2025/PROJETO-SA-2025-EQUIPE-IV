import { Box, Grid, Stack, Button, Typography, Paper, TextField } from "@mui/material";
import Header from '../../components/Header/Header'
import './PaginaInicial.css'
import LogoProjeto from "../../components/LogoProjeto/LogoProjeto";
import BtnCadastro from "../../components/BtnCadastro/BtnCadastro";

function PaginaInicial() {

    return (
        <Box sx={{ width: '100vw', height: '100vh', gridTemplateColumns: '1fr 1fr', display: 'flex' }}>

            <Header />

            <Box sx={{ width: '100%', backgroundColor: 'white', marginTop: "85px"}}>
                <Box sx={{ marginTop: "35px", marginLeft: "35px" }}>
                    <Typography variant="h4" gutterBottom sx={{ color: "#004468", fontWeight: "bold" }}>Home</Typography>
                </Box>

                <Box sx={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', }}>
                        
                    <Grid container spacing={4} mb={5} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Grid item xs={12} md={6}>
                            <Paper elevation={4} sx={{ p: 2 }}>
                                <Typography variant="subtitle1" fontWeight="bold" color="white" bgcolor="#004468" p={1} borderRadius="8px 8px 8px 8px">
                                    Fluxo de Caixa
                                </Typography>
                                <Box sx={{ mt: 2, height: 200, bgcolor: 'grey.100' }} />
                            </Paper>
                        </Grid>
                    </Grid>

                    <Grid container spacing={4} mb={4} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Grid item xs={12} md={6}>
                            <Paper elevation={4} sx={{ p: 2 }}>
                                <Typography variant="subtitle1" fontWeight="bold" color="white" bgcolor="#004468" p={1} borderRadius="8px 8px 0 0">
                                    Quantidade de Estoque
                                </Typography>
                                <Box sx={{ mt: 2, height: 200, bgcolor: 'grey.100' }} />
                            </Paper>
                        </Grid>
                    </Grid>

                </Box>

                <Stack direction="row" spacing={30} justifyContent="center">
                    <button variant="contained" className="btn-home">Estoque</button>
                    <button variant="contained" className="btn-home">Produtos</button>
                    <button variant="contained" className="btn-home">Financeiro</button>
                </Stack>
            </Box>
        </Box>
    )
}

export default PaginaInicial;