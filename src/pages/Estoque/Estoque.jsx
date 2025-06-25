import { useState } from "react";
import Header from "../../components/Header/Header";
import { Box, Button, FormControl, Card, CardContent, TextField, InputLabel, CardActions, NativeSelect, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function Estoque() {

    const [produtos, setProdutos] = useState([]);
    const [isAddingProduto, setIsAddingProduto] = useState(false);
    const [tipo, setTipo] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [precoCompra, setPrecoCompra] = useState("");
    const [precoCusto, setPrecoCusto] = useState("");
    const [produtoSelecionado, setProdutoSelecionado] = useState("");

    function adicionarProduto() {
        setIsAddingProduto(true);
    }

    function cancelarInclusao() {
        setIsAddingProduto(false);
        setTipo("");
        setQuantidade("");
        setPrecoCompra(""),
            setPrecoCusto(""),
            setProdutoSelecionado("")
    }


    function incluirProduto() {
        // implementa a lógica para incluir o produto no estoque
        // console.log({
        //     tipo,
        //     quantidade,
        //     precoCompra,
        //     precoCusto,
        //     produtoSelecionado
        // });

        const novoProduto = {
            tipo,
            quantidade: Number(quantidade),
            precoCompra: Number(precoCompra),
            precoCusto: Number(precoCusto),
            data: "00/00/00",
            entrada: 0,
            precoVenda: 0,
            precoCompra: 0,
        }

        setProdutos((prev) => [...prev, novoProduto]);

        cancelarInclusao(); // depois que salva fecha o card
    }

    const removerProduto = (index) => {
        setProdutos((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <Box sx={{ height: "100%", width: '100%', backgroundColor: 'white', marginTop: "85px" }}>
                <Box sx={{ marginTop: "35px", marginLeft: "35px", marginRight: "35px", display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h4" gutterBottom sx={{ color: "#004468", fontWeight: "bold", fontSize: "40px" }}>
                        Estoque
                    </Typography>
                    <Button variant='contained' size='large' sx={{ padding: '8px', height: '40px', borderRadius: '10px' }} onClick={adicionarProduto}>
                        + Incluir Lançamento
                    </Button>
                </Box>
                <Box sx={{ marginLeft: '35px', marginBottom: '20px' }}>
                    <FormControl sx={{ width: '30%' }} size='small'>
                        <InputLabel id="select-label" variant="standard">Seleção de Produtos</InputLabel>
                        <NativeSelect
                            id="select-produtos"
                            value={produtoSelecionado}
                            onChange={(e) => setProdutoSelecionado(e.target.value)}
                        >
                            <option value="">Selecione</option>
                            {produtos.map((produto, index) => (
                                <option key={index} value={index}>
                                    {produto.tipo}
                                </option>
                            ))}
                        </NativeSelect>
                    </FormControl>
                </Box>
                {/* Tabela visual */}
                <Box sx={{ width: '75%', paddingLeft: '10px' }}>
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr auto',
                        backgroundColor: '#e0f4ff',
                        borderRadius: '8px',
                        padding: '10px',
                        fontWeight: 'bold',
                        color: '#004468'
                    }}>
                        <Typography>Produto</Typography>
                        <Typography>Data</Typography>
                        <Typography>Entrada</Typography>
                        <Typography>Preço de venda</Typography>
                        <Typography>Preço de compra</Typography>
                        <Typography>Preço de custo</Typography>
                        <Box /> {/* Ícone */}
                    </Box>
                    {produtos.map((produto, index) => (
                        <Box key={index} sx={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr auto',
                            backgroundColor: 'white',
                            borderRadius: '8px',
                            padding: '10px',
                            marginY: '8px',
                            alignItems: 'center'
                        }}>
                            <Typography>{produto.tipo}</Typography>
                            <Typography>{produto.data}</Typography>
                            <Typography>{produto.entrada}</Typography>
                            <Typography>{produto.saida}</Typography>
                            <Typography>R$ {produto.precoVenda.toFixed(2)}</Typography>
                            <Typography>R$ {produto.precoCompra.toFixed(2)}</Typography>
                            <Typography>R$ {produto.precoCusto.toFixed(2)}</Typography>
                            <IconButton onClick={() => removerProduto(index)}>
                                <DeleteIcon sx={{ color: 'red' }} />
                            </IconButton>
                        </Box>
                    ))}
                </Box>
                {/* Card lateral com resumo */}
                <Card sx={{
                    position: 'absolute',
                    right: '35px',
                    top: '180px',
                    width: '250px',
                    borderRadius: '10px',
                    boxShadow: '0px 2px 10px rgba(0,0,0,0.1)',
                    padding: '15px',
                    backgroundColor: '#fff'
                }}>
                    <Typography variant="h6" sx={{
                        textAlign: 'center',
                        backgroundColor: '#004468',
                        color: 'white',
                        padding: '10px',
                        borderRadius: '10px'
                    }}>
                        {produtoSelecionado
                            ? produtos.find((p, i) => i === parseInt(produtoSelecionado))?.tipo || 'Nome produto'
                            : 'Nome produto'}
                    </Typography>
                    <Typography mt={2}>Total em estoque: 00,00</Typography>
                    <Typography>Entradas: 00,00</Typography>
                    <Typography>Saídas: 00,00</Typography>
                    <Typography sx={{ color: '#0077cc', fontWeight: 'bold' }}>Valor entradas: 0.000,00</Typography>
                    <Typography sx={{ color: '#0077cc', fontWeight: 'bold' }}>Valor saídas: 0.000,00</Typography>
                </Card>
            </Box>
            {/* Modal Sobreposto */}
            {isAddingProduto && (
                <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Card sx={{ width: 400, padding: 2 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Incluir Lançamento no Estoque
                            </Typography>
                            <TextField
                                fullWidth
                                label="Tipo"
                                variant="outlined"
                                margin="normal"
                                value={tipo}
                                onChange={(e) => setTipo(e.target.value)}
                            />
                            <TextField
                                fullWidth
                                label="Código"
                                variant="outlined"
                                type="number"
                                margin="normal"
                                value={quantidade}
                                onChange={(e) => setQuantidade(e.target.value)}
                            />
                            <TextField
                                fullWidth
                                label="Preço de Compra"
                                variant="outlined"
                                margin="normal"
                                value={precoCompra}
                                onChange={(e) => setPrecoCompra(e.target.value)}
                            />
                            <TextField
                                fullWidth
                                label="Preço de Custo"
                                variant="outlined"
                                margin="normal"
                                value={precoCusto}
                                onChange={(e) => setPrecoCusto(e.target.value)}
                            />
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'flex-end' }}>
                            <Button variant="outlined" onClick={cancelarInclusao}>Cancelar</Button>
                            <Button variant="outlined" onClick={incluirProduto}>Incluir</Button>
                        </CardActions>
                    </Card>
                </Box>
            )}
        </Box>
    )
}

export default Estoque;