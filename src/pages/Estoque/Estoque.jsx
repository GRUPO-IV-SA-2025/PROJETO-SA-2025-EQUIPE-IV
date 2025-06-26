import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, Card, CardContent, List, ListItem, ListItemText, Divider, FormControl } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import InputLabel from '@mui/material/InputLabel';
import api from "../../services/api";
// import Paper from '@mui/material/Paper';



function Estoque() {

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [lancamentosFiltrados, setLancamentosFiltrados] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [produtoSelecionado, setProdutoSelecionado] = useState('');
    const [lancamentos, setLancamentos] = useState([])
    const [novoLancamento, setNovoLancamento] = useState({
        tipo: '',
        quantidade: 0,
        preco_compra: 0,
        produtoId: '',
    })

    const [opcoesTipo] = useState([
        { valor: 'ENTRADA', label: 'Entrada' },
        { valor: 'SAIDA', label: 'Saída' }
    ]);

    useEffect(() => {
        api.get('/produtos')
            .then(response => {
                setProdutos(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar produtos:", error);
            });
    }, []);

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

    const handleSelecionarProduto = async (event) => {
        const produtoId = event.target.value;
        setProdutoSelecionado(produtoId);

        try {
            if (produtoId === '') {
                // Buscar todos os lançamentos
                const response = await api.get("/estoque");
                setLancamentos(response.data);
                setLancamentosFiltrados(response.data)
            } else {
                // Buscar lançamentos filtrando pelo produto
                const response = await api.get(`/estoque?produtoId=${produtoId}`);
                setLancamentosFiltrados(response.data);
            }
        } catch (error) {
            console.error("Erro ao buscar lançamentos:", error);
        }
    };


    const calcularTotais = () => {
        let entradas = 0;
        let saidas = 0;
        let valorEntradas = 0;
        let valorSaidas = 0;

        lancamentosFiltrados.forEach(lancamento => {
            if (lancamento.tipo === 'ENTRADA') {
                entradas += parseInt(lancamento.quantidade);
                valorEntradas += parseFloat(lancamento.preco_compra) * parseInt(lancamento.quantidade);
            } else {
                saidas += parseInt(lancamento.quantidade); // Remova o sinal negativo aqui
                valorSaidas += parseFloat(lancamento.preco_compra) * parseInt(lancamento.quantidade); // Remova o sinal negativo aqui
            }
        });

        return {
            totalEstoque: entradas - saidas,
            entradas,
            saidas,
            valorEntradas,
            valorSaidas
        };
    };

    const totais = calcularTotais();

    const abrirDialog = () => {
        setNovoLancamento({ descricao: '', codigo: '', categoria: '' });

        // setProdutoEditar(null)
        setIsDialogOpen(true);
    }

    const fecharDialog = () => {
        setIsDialogOpen(false);
        // setNovoProduto({ descricao: '', codigo: '', categoria: '' });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNovoLancamento((prev) => ({ ...prev, [name]: value }));
    };

    const cadastrarLancamento = async () => {
        try {
             await api.post('/estoque', {
                tipo: novoLancamento.tipo,
                quantidade: novoLancamento.quantidade,
                preco_compra: novoLancamento.preco_compra,
                produtos_id: novoLancamento.produtoId
            });

            const response = await api.get('/estoque')
            setLancamentos(response.data);

            if (produtoSelecionado) {
                const filtrados = response.data.filter(item => item.produtos_id == produtoSelecionado);
            setLancamentosFiltrados(filtrados);
            } else {
                setLancamentosFiltrados(response.data);
            }
            
            fecharDialog();
        } catch (error) {
            console.error("Erro ao cadastrar lançamento:", error);
        }
    };

    return (
        <Box sx={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />

            <Box sx={{ backgroundColor: '#e6f3fa', flex: 1, marginTop: "85px", padding: '2rem' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h4" gutterBottom sx={{ color: "#004468", fontWeight: "bold", fontSize: "40px" }}>
                        Estoque
                    </Typography>
                    <Button variant='contained' size='large' sx={{ padding: '8px', height: '40px', borderRadius: '10px', fontWeight: 'Bold' }} onClick={abrirDialog} >
                        + Incluir lançamento
                    </Button>
                </Box>

                <FormControl variant="standard" sx={{ m: 1, width: 180 }}>
                    <InputLabel>
                        Selecionar Produto
                    </InputLabel>
                    <Select
                        value={produtoSelecionado}
                        onChange={handleSelecionarProduto}
                        label="Selecionar Produto"
                    >
                        <MenuItem value="">
                            <em>Todos os produtos</em>
                        </MenuItem>
                        {produtos.map((prod) => (
                            <MenuItem key={prod.id} value={prod.id}>
                                {prod.descricao}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
                    <Box sx={{ flex: { xs: 1, md: 7 } }}>
                        <TableContainer component={Paper} >
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: "#fffff" }}>
                                        <TableCell><strong>Produto</strong></TableCell>
                                        <TableCell><strong>Tipo</strong></TableCell>
                                        <TableCell><strong>Quantidade</strong></TableCell>
                                        <TableCell><strong>Valor</strong></TableCell>
                                        <TableCell><strong>Data</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {lancamentosFiltrados.map((lancamento) => (
                                        <TableRow key={lancamento.id}>
                                            <TableCell>{lancamento.produto_descricao}</TableCell>
                                            <TableCell>{lancamento.tipo}</TableCell>
                                            <TableCell>{lancamento.quantidade}</TableCell>
                                            <TableCell>{lancamento.preco_compra}</TableCell>
                                            <TableCell>{lancamento.data_lancamento}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>

                    <Box sx={{ flex: { xs: 1, md: 3 } }}>
                        <Card variant="outlined" sx={{ borderRadius: 7 }}>
                            <CardContent>
                                <Box sx={{ textAlign: 'center', mb: 2 }}>
                                    <Typography variant="h5"
                                        sx={{
                                            backgroundColor: "#0081C4",
                                            color: "#fff",
                                            p: 1,
                                            borderRadius: 2,
                                            display: 'inline-block'
                                        }}>
                                        {produtoSelecionado ? produtos.find(p => p.id == produtoSelecionado)?.descricao || 'Produto' : 'Resumo Geral'}
                                    </Typography>
                                </Box>

                                <List>
                                    <ListItem>
                                        <ListItemText primary="Total em estoque" />
                                        <Typography>{totais.totalEstoque}</Typography>
                                    </ListItem>

                                    <Divider />

                                    <ListItem>
                                        <ListItemText primary="Entradas" />
                                        <Typography>{totais.entradas}</Typography>
                                    </ListItem>

                                    <ListItem>
                                        <ListItemText primary="Saídas" />
                                        <Typography>{totais.saidas}</Typography>
                                    </ListItem>

                                    <Divider />

                                    <ListItem>
                                        <ListItemText primary="Valor entradas" />
                                        <Typography>{totais.valorEntradas.toFixed(2)}</Typography>
                                    </ListItem>

                                    <ListItem>
                                        <ListItemText primary="Valor saídas" />
                                        <Typography>{totais.valorSaidas.toFixed(2)}</Typography>
                                    </ListItem>
                                </List>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>

            </Box>

            <Dialog open={isDialogOpen} onClose={fecharDialog} >
                <DialogTitle sx={{ fontWeight: 'bold', color: '#004468', fontSize: '30px' }}>Novo Lançamento</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 1 }}>

                        <Box sx={{ display: 'flex', gap: 2 }}>

                            <TextField
                                select
                                label="Produto"
                                name="produtoId"
                                value={novoLancamento.produtoId}
                                onChange={handleChange}
                                fullWidth
                            >
                                {produtos.map((prod) => (
                                    <MenuItem key={prod.id} value={prod.id}>
                                        {prod.descricao}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                select
                                label="Tipo"
                                name="tipo"
                                value={novoLancamento.tipo}
                                onChange={handleChange}
                                fullWidth
                            >
                                {opcoesTipo.map((opcao) => (
                                    <MenuItem key={opcao.valor} value={opcao.valor}>
                                        {opcao.label}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField label="Quantidade" name="quantidade" value={novoLancamento.quantidade} onChange={handleChange} fullWidth />

                            <TextField label="Valor" name="preco_compra" type="number" value={novoLancamento.preco_compra} onChange={handleChange} fullWidth
                            />

                        </Box>
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ px: 4, pb: 2 }}>
                    <Button onClick={fecharDialog} variant="outlined" color="primary">Cancelar</Button>
                    <Button onClick={cadastrarLancamento} variant="contained" sx={{ backgroundColor: '#004468' }}>Cadastrar</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default Estoque;