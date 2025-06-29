import { Box, Grid, Stack, Typography, Paper } from "@mui/material";
import Header from '../../components/Header/Header';
import './Dashboard.css';
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { BarPlot } from '@mui/x-charts/BarChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { BarLabel } from '@mui/x-charts';
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";

function Dashboard() {
    const navigate = useNavigate();
    const { LogOut } = useAuth(); ''

    const [fluxoData, setFluxoData] = useState([]);
    const [topProdutos, setTopProdutos] = useState([]);

    useEffect(() => {
        // Carrega dados inicialmente
        carregarDados();

        // Configura polling para atualizar a cada 30 segundos
        const intervalId = setInterval(carregarDados, 30000);

        // Limpa o intervalo quando o componente é desmontado
        return () => clearInterval(intervalId);
    }, []);

    const carregarDados = async () => {
        try {
            const response = await api.get('/estoque');
            const dados = response.data;

            // Processa os dados
            const fluxo = calcularFluxo(dados);
            const produtos = processarProdutos(dados);

            setFluxoData(fluxo);
            setTopProdutos(produtos);

        } catch (error) {
            console.error("Erro ao carregar dados:", error);
        }
    };

    const calcularFluxo = (dados) => {
        const movimentacaoPorData = {};

        // 1. Agrupa movimentações por data
        dados.forEach(item => {
            const data = formatarData(item.data_lancamento);
            const valor = Number(item.preco_compra) * Number(item.quantidade);
            const tipo = item.tipo.toLowerCase()
            // .includes('saida') ? 'saida' : item.tipo.toLowerCase();

            if (!movimentacaoPorData[data]) {
                movimentacaoPorData[data] = 0;
            }

            if (tipo.includes('saida')) {
                movimentacaoPorData[data] += valor; // entrada de dinheiro
            } else {
                movimentacaoPorData[data] -= valor; // saída de dinheiro
            }

            // Entradas são valores negativos (saída de caixa)
            // Saídas são valores positivos (entrada de caixa)
            // movimentacaoPorData[data] += tipo === 'entrada' ? -valor : valor;
        });

        // 2. Converte para array e ordena por data
        const dadosOrdenados = Object.entries(movimentacaoPorData)
            .map(([data, saldo]) => ({ data, saldo }))
            .sort((a, b) => new Date(a.data.split('/').reverse().join('/')) - new Date(b.data.split('/').reverse().join('/')));

        // 3. Calcula saldo acumulado
        let saldoAcumulado = 0;
        return dadosOrdenados.map(item => {
            saldoAcumulado += item.saldo;
            return {
                data: item.data,
                saldo: saldoAcumulado
            };
        });
    };


    const processarProdutos = (dados) => {
        // Calcula saldo por produto
        const saldos = {};

        dados.forEach(item => {
            const nome = item.produto_descricao;
            const qtd = Number(item.quantidade) || 0;
            const tipo = item.tipo.toLowerCase() === 'entrada' ? 'entrada' : 'saida';

            saldos[nome] = (saldos[nome] || 0) + (tipo === 'entrada' ? qtd : -qtd);
        });

        // Ordena e pega top 3
        return Object.entries(saldos)
            .map(([nome, qtd]) => ({ nome, qtd }))
            .sort((a, b) => b.qtd - a.qtd)
            .slice(0, 3);
    };

    const formatarDataHora = (dataString) => {
        const data = new Date(dataString);
        return `${data.getDate()}/${data.getMonth() + 1} ${data.getHours()}:${data.getMinutes()}`;
    };

    const formatarData = (dataISO) => {
        if (!dataISO) return '';
        const data = new Date(dataISO);
        return data.toLocaleDateString('pt-BR');
    };

    const formatarMoeda = (valor) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(valor);
    };


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
        <Box sx={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>

            <Header />

            <Box sx={{ width: '100%', marginTop: "85px", flexGrow: 1,
                overflowY: 'auto', }}>
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
                                        series={[
                                            {
                                                data: fluxoData.map(item => item.saldo),
                                                label: 'Saldo Diário',
                                                color: '#0081C4',
                                                showMark: true,
                                                valueFormatter: (value) => formatarMoeda(value)
                                            }
                                        ]}
                                        height={300}
                                        width={500}
                                        xAxis={[{
                                            scaleType: 'point',
                                            data: fluxoData.map(item => item.data),
                                            label: 'Data'
                                        }]}
                                        yAxis={[{
                                            label: 'Valor (R$)',
                                            valueFormatter: (value) => formatarMoeda(value)
                                        }]}

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

                                    <BarChart
                                        series={[
                                            {
                                                data: topProdutos.map(item => item.qtd),
                                                label: 'Quantidade',
                                                color: '#2196F3'
                                            }
                                        ]}
                                        height={300}
                                        width={500}

                                        xAxis={[{
                                            scaleType: 'band',
                                            data: topProdutos.map(item => item.nome)
                                        }]}
                                    />
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