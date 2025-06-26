import { Box, Grid, Stack, Typography, Paper } from "@mui/material";
import Header from '../../components/Header/Header';
import './Dashboard.css';
import { LineChart } from '@mui/x-charts/LineChart';
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { BarPlot } from '@mui/x-charts/BarChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { BarLabel } from '@mui/x-charts';
import { useNavigate } from "react-router";
import { useEffect } from "react";
import api from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";

function Dashboard() {
    const navigate = useNavigate();
    const { LogOut } = useAuth();''

    useEffect(() => {
        api.get('/private').then(response => {
            console.log("Sessão ativa:", response.data);
        }).catch(() => {
            LogOut();
        });
    }, []);

    const handleFinanceiroClick = (e) => {
        e.preventDefault();
        navigate('/Financeiro')
    }

    const handleCategoriaClick = (e) => {
        e.preventDefault();
        navigate('/Categoria')
    }


    const handleClickPaginaEstoque = (e) => {
        e.preventDefault();
        navigate('/Estoque')
    }

    const handleClickProdutos = (e) => {
        e.preventDefault();
        navigate('/Produtos')
    }

    return (
        <Box sx={{ width: '100vw', height: '100vh', gridTemplateColumns: '1fr 1fr', display: 'flex', backgroundColor: '#F0FAFF' }}>

            <Header />

            <Box sx={{ width: '100%', marginTop: "85px" }}>
                <Box sx={{ marginTop: "35px", marginLeft: "35px" }}>
                    <Typography variant="h4" gutterBottom sx={{ color: "#004468", fontWeight: "bold", fontSize: "40px" }}>
                        Dashboard
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', }}>

                    <Grid container spacing={4} mb={5} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                        <Grid sx={{ xs: 12, md: 6 }}>
                            <Paper elevation={4} sx={{ p: 2 }}>
                                <Typography variant="subtitle1" fontWeight="bold" color="white" bgcolor="#004468" p={1} borderRadius="8px 8px 0 0">
                                    Quantidade de Estoque
                                </Typography>
                                <Box sx={{ mt: 2, bgcolor: 'grey.100' }}>

                                    <ChartContainer
                                        xAxis={[{ scaleType: 'band', data: ['A', 'B', 'C'] }]}
                                        series={[
                                            {
                                                type: 'bar',
                                                id: 'base',
                                                data: [5, 17, 11],
                                            },
                                        ]}
                                        height={300}
                                        width={500}
                                    >
                                        <BarPlot barLabel="value" slots={{ barLabel: BarLabel }} />
                                        <ChartsXAxis />
                                        <ChartsYAxis />
                                    </ChartContainer>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
                <Stack direction="row" spacing={20} justifyContent="center">
                    <button variant="contained" className="btn-home" onClick={handleClickPaginaEstoque}>Estoque</button>
                    <button variant="contained" className="btn-home" onClick={handleClickProdutos}>Produtos</button>
                    <button variant="contained" className="btn-home" onClick={handleFinanceiroClick}>Financeiro</button>
                    <button variant="contained" className="btn-home" onClick={handleCategoriaClick}>Categorias</button>
                </Stack>
            </Box>
        </Box>
    )
}

export default Dashboard;