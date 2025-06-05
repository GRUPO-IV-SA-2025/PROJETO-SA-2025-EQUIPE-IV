import { Box, Grid, Stack, Button, Typography, Paper, TextField } from "@mui/material";
import Header from '../../components/Header/Header';
import './PaginaInicial.css';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from "@mui/x-charts";

function PaginaInicial() {

    return (
        <Box sx={{ width: '100vw', height: '100vh', gridTemplateColumns: '1fr 1fr', display: 'flex' }}>

            <Header />

            <Box sx={{ width: '100%', backgroundColor: 'white', marginTop: "85px" }}>
                <Box sx={{ marginTop: "35px", marginLeft: "35px" }}>
                    <Typography variant="h4" gutterBottom sx={{ color: "#004468", fontWeight: "bold" }}>Home</Typography>
                </Box>

                <Box sx={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', }}>
                        
                    <Grid container spacing={4} mb={5} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Grid>
                            <Paper elevation={4} sx={{ p: 2 }}>
                                <Typography variant="subtitle1" fontWeight="bold" color="white" bgcolor="#004468" p={1} borderRadius="8px 8px 8px 8px">
                                    Fluxo de Caixa
                                </Typography>
                                <Box sx={{ mt: 2, bgcolor: 'grey.100' }}>

                                    <LineChart
                                        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                                        series={[
                                            {
                                                data: [2, 5.5, 2, 8.5, 1.5, 5],
                                            },
                                        ]}
                                        height={300}
                                        width={500}
                                    />
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>

                    <Grid container spacing={4} mb={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Grid item xs={12} md={6}>
                            <Paper elevation={4} sx={{ p: 2 }}>
                                <Typography variant="subtitle1" fontWeight="bold" color="white" bgcolor="#004468" p={1} borderRadius="8px 8px 0 0">
                                    Quantidade de Estoque
                                </Typography>
                                <Box sx={{ mt: 2, bgcolor: 'grey.100' }}>
                                    <PieChart
                                        series={[
                                            {
                                                data: [
                                                    { id: 0, value: 10, label: 'series A' },
                                                    { id: 1, value: 15, label: 'series B' },
                                                    { id: 2, value: 20, label: 'series C' },
                                                ],
                                            },
                                        ]}
                                        height={300}
                                        width={500}
                                    />
                                </Box>
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