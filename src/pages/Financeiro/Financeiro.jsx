import { Box, Grid, Stack, Button, Typography, Paper, TextField } from "@mui/material";
import Header from '../../components/Header/Header';
import './Financeiro.css';
import { LineChart, SparkLineChart } from '@mui/x-charts';
import { useEffect, useState } from "react";
import api from "../../services/api";


function Financeiro() {


    const [fluxoData, setFluxoData] = useState([]);
    const [lancamentosFiltrados, setLancamentosFiltrados] = useState([]);
    const [topProdutos, setTopProdutos] = useState([]);
    const [lancamentos, setLancamentos] = useState([])

    useEffect(() => {
        api.get('/estoque')
            .then(response => {
                setLancamentos(response.data);
                setLancamentosFiltrados(response.data)
            })
            .catch(error => {
                console.error("Erro ao buscar lançamentos:", error);
            });
    }, []);

    useEffect(() => {
        if (lancamentosFiltrados.length > 0) {
            setFluxoData(calcularFluxo(lancamentosFiltrados));
        }
    }, [lancamentosFiltrados]); // Atualiza quando os lançamentos mudam

    const calcularFluxo = (dados) => {
        const movimentacaoPorData = {};

        // 1. Agrupa movimentações por data
        dados.forEach(item => {
            const data = formatarData(item.data_lancamento);
            const valor = Number(item.preco_compra) * Number(item.quantidade);
            const tipo = item.tipo.toLowerCase().includes('salda') ? 'saida' : item.tipo.toLowerCase();

            if (!movimentacaoPorData[data]) {
                movimentacaoPorData[data] = 0;
            }

            // Entradas são valores negativos (saída de caixa)
            // Saídas são valores positivos (entrada de caixa)
            movimentacaoPorData[data] += tipo === 'entrada' ? -valor : valor;
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
    const calcularTotais = () => {
        let entradas = 0;
        let saidas = 0;
        let valorEntradas = 0;
        let valorSaidas = 0;

        lancamentosFiltrados.forEach(lancamento => {
            const quantidade = Number(lancamento.quantidade) || 0;
            const valor = Number(lancamento.preco_compra) || 0;
            // Corrige o tipo "salda" para "saida"
            const tipo = lancamento.tipo.toLowerCase() === 'salda' ? 'SAIDA' : lancamento.tipo.toUpperCase();

            if (tipo === 'ENTRADA') {
                entradas += quantidade;
                valorEntradas += quantidade * valor;
            } else if (tipo === 'SAIDA') {
                saidas += quantidade;
                valorSaidas += quantidade * valor;
            }
        });


        return {
            totalEstoque: entradas - saidas,
            entradas,
            saidas,
            valorEntradas,
            valorSaidas,
            valorSaldo: valorSaidas - valorEntradas // CORRETO: valor de saídas - valor de entradas
        };
    };

    const totais = calcularTotais();


    return (
        <Box sx={{height: '100vh', display: 'flex', flexDirection: 'column'  }}>

            <Header />

            <Box sx={{ height: "100%", width: '100%', marginTop: "85px",  flexGrow: 1, overflowY: 'auto'  }}>
                <Box sx={{ marginTop: "35px", marginLeft: "35px", marginRight: "35px" }}>
                    <Typography variant="h4" gutterBottom sx={{ color: "#004468", fontWeight: "bold", fontSize: "40px" }}>
                        Financeiro
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', alignItems: 'center', m: "50px" }}>

                    <Grid container spacing={4} mb={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'stretch', }}
                    >
                        <Grid sx={{ xs: 12, md: 6 }}>
                            <Paper elevation={4} sx={{ p: 2, height: '100%' }}>
                                <Typography variant="subtitle1" fontWeight="bold" color="white" bgcolor="#004468" p={1} borderRadius="8px 8px 0 0">
                                    Saldo Atual
                                </Typography>
                                <Box sx={{
                                    mt: 2,
                                    bgcolor: 'grey.100',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    height: 300,
                                    width: 500
                                }}>
                                    <Typography
                                        variant="h6"
                                        fontWeight="bold"
                                        color="primary.dark"
                                        sx={{
                                            fontSize: "71px",
                                            color: "#004468",
                                            wordBreak: 'break-all', // Quebra linha se necessário
                                            lineHeight: '1.2',
                                            color: "#004468"
                                        }}
                                    >
                                        {formatarMoeda(totais.valorSaldo)}
                                    </Typography>

                                </Box>
                            </Paper>
                        </Grid>

                        <Grid sx={{ xs: 12, md: 6 }}>
                            <Paper elevation={4} sx={{ p: 2, height: '100%' }} >

                                <Typography variant="subtitle1" fontWeight="bold" color="white" bgcolor="#004468" p={1} borderRadius="8px 8px 8px 8px">
                                    Fluxo de Caixa
                                </Typography>

                                <Box sx={{ mt: 2, bgcolor: 'grey.100', flexGrow: 1 }}>

                                    <LineChart
                                        series={[
                                            {
                                                data: fluxoData.map(item => item.saldo),
                                                label: 'Saldo Diário',
                                                color: '#0081C4',
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
                                            label: 'Valor (R$)'
                                        }]}

                                    />

                                </Box>
                            </Paper>
                        </Grid>

                        {/* <Grid sx={{ xs: 12, md: 6 }}>
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
                        </Grid> */}

                        <Grid sx={{ xs: 12, md: 6 }}>
                            <Paper elevation={4} sx={{ p: 2 }}>
                                <Typography variant="subtitle1" fontWeight="bold" color="white" bgcolor="#004468" p={1} borderRadius="8px 8px 0 0">
                                    Custo de Entrada
                                </Typography>
                                <Box
                                    sx={{
                                        mt: 2,
                                        bgcolor: 'grey.100',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        height: 300,
                                        width: 500
                                    }}
                                >

                                    <Typography
                                        variant="h6"
                                        fontWeight="bold"
                                        color="primary.dark"
                                        sx={{
                                            fontSize: "71px",
                                            color: "#004468",
                                            wordBreak: 'break-all', // Quebra linha se necessário
                                            lineHeight: '1.2',
                                            color: "#004468"
                                        }}
                                    >
                                        {formatarMoeda(totais.valorEntradas)}
                                    </Typography>

                                </Box>
                            </Paper>
                        </Grid>

                        <Grid sx={{ xs: 12, md: 6 }}>
                            <Paper elevation={4} sx={{ p: 2 }}>
                                <Typography variant="subtitle1" fontWeight="bold" color="white" bgcolor="#004468" p={1} borderRadius="8px 8px 0 0">
                                    Custo de Saída
                                </Typography>
                                <Box
                                    sx={{
                                        mt: 2,
                                        bgcolor: 'grey.100',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        height: 300,
                                        width: 500
                                    }}
                                >

                                    <Typography
                                        variant="h6"
                                        fontWeight="bold"
                                        color="primary.dark"
                                        sx={{
                                            fontSize: "71px",
                                            color: "#004468",
                                            wordBreak: 'break-all', // Quebra linha se necessário
                                            lineHeight: '1.2',
                                            color: "#004468"
                                        }}
                                    >
                                        {formatarMoeda(totais.valorSaidas)}
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