import { Box, Grid, Stack, Button, Typography, Paper, TextField } from "@mui/material";
import Header from '../../components/Header/Header';
import './Financeiro.css';
import { LineChart, SparkLineChart } from '@mui/x-charts';


function Financeiro() {


    return (
        <Box sx={{ width: '100%', height: '100%', gridTemplateColumns: '1fr 1fr', display: 'flex' }}>

            <Header />

            <Box sx={{height: "100%" ,width: '100%', backgroundColor: 'white', marginTop: "85px"}}>
                <Box sx={{ marginTop: "35px", marginLeft: "35px", marginRight: "35px" }}>
                    <Typography variant="h4" gutterBottom sx={{ color: "#004468", fontWeight: "bold", fontSize: "40px" }}>
                        Financeiro
                        </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexWrap: 'wrap',justifyContent: 'space-around', alignItems: 'center', m: "50px" }}>

                    <Grid container spacing={4} mb={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'stretch', }}
                    >
                        <Grid sx={{xs:12, md:6}}>
                            <Paper elevation={4} sx={{ p: 2, height: '100%' }}>
                                <Typography variant="subtitle1" fontWeight="bold" color="white" bgcolor="#004468" p={1} borderRadius="8px 8px 0 0">
                                    Saldo Atual
                                </Typography>
                                <Box sx={{ mt: 2, bgcolor: 'grey.100' }}>
                                    <Typography
                                        variant="h5"
                                        fontWeight="bold"
                                        color="primary.dark"
                                        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300, width: 500, fontSize: "100px", color: "#004468" }}
                                    >
                                        R$:00,00
                                    </Typography>

                                </Box>
                            </Paper>
                        </Grid>
                 
                        <Grid sx={{xs:12, md:6}}>
                            <Paper elevation={4} sx={{ p: 2, height: '100%' }} >
                                
                                <Typography variant="subtitle1" fontWeight="bold" color="white" bgcolor="#004468" p={1} borderRadius="8px 8px 8px 8px">
                                    Fluxo de Caixa
                                </Typography>

                                <Box sx={{ mt: 2, bgcolor: 'grey.100', flexGrow: 1 }}>

                                    <LineChart
                                        series={[
                                            {
                                                data: [2, 5.5, 2, 8.5, 1.5, 5, 10],
                                            },
                                        ]}
                                        height={300}
                                        width={500}
                                    />

                                </Box>
                            </Paper>
                        </Grid>

                        <Grid sx={{xs:12, md:6}}>
                            <Paper elevation={4} sx={{ p: 2, height: '100%' }}>
                                <Typography variant="subtitle1" fontWeight="bold" color="white" bgcolor="#004468" p={1} borderRadius="8px 8px 0 0">
                                    Custo do Estoque
                                </Typography>
                                <Box sx={{ mt: 2, bgcolor: 'grey.100' }}>

                                    <Typography
                                        variant="h5"
                                        fontWeight="bold"
                                        color="primary.dark"
                                        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300, width: 500, fontSize: "100px", color: "#004468" }}
                                    >
                                        R$:00,00
                                    </Typography>

                                </Box>
                            </Paper>
                        </Grid>

                        <Grid sx={{xs:12, md:6}}>
                            <Paper elevation={4} sx={{ p: 2 }}>
                                <Typography variant="subtitle1" fontWeight="bold" color="white" bgcolor="#004468" p={1} borderRadius="8px 8px 0 0">
                                    Custo de Entrada
                                </Typography>
                                <Box sx={{ mt: 2, bgcolor: 'grey.100' }}>

                                    <Typography
                                        variant="h5"
                                        fontWeight="bold"
                                        color="primary.dark"
                                        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300, width: 500, fontSize: "100px", color: "#004468" }}
                                    >
                                        R$:00,00
                                    </Typography>

                                </Box>
                            </Paper>
                        </Grid>

                        <Grid sx={{xs:12, md:6}}>
                            <Paper elevation={4} sx={{ p: 2 }}>
                                <Typography variant="subtitle1" fontWeight="bold" color="white" bgcolor="#004468" p={1} borderRadius="8px 8px 0 0">
                                    Custo de Saída
                                </Typography>
                                <Box sx={{ mt: 2, bgcolor: 'grey.100' }}>

                                    <Typography
                                        variant="h5"
                                        fontWeight="bold"
                                        color="primary.dark"
                                        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300, width: 500, fontSize: "100px", color: "#004468" }}
                                    >
                                        R$:00,00
                                    </Typography>

                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box >
    )
}

export default Financeiro;