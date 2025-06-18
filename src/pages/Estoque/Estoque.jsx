import { useState } from "react";
import Header from "../../components/Header/Header";
import { Box, Button, FormControl, Card, CardContent , TextField ,InputLabel, CardActions, NativeSelect, Typography } from "@mui/material";


function Estoque() {


    const [isAddingrProduto, setIsAddingProduto] = useState(false);
    const [descricao, setDescricao] = useState("");
    const [codigo, setCodigo] = useState("");
    const [categoria, setCategoria] = useState("");
    const [produtoSelecionado, setProdutoSelecionado] = useState("");

    function adicionarProduto() {
        setIsAddingProduto(true);
    }

    function cancelarInclusao() {
        setIsAddingProduto(false);
        setDescricao("");
        setCodigo("");
        setCategoria(""),
            setProdutoSelecionado("");
    }


    function salvarProduto() {
        // implementa a lógica para salvar o produto no estoque
        console.log({
            descricao,
            codigo,
            categoria,
            produtoSelecionado
        });

        cancelarInclusao(); // depois que salva fecha o card
    }

    return (
        // <Box sx={{ width: '100%', height: '100%', gridTemplateColumns: '1fr 1fr', display: 'flex' }}>
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


                {/* <Box> */}
                <Box sx={{ marginLeft: '35px', marginBottom: '20px' }}>
                    <FormControl sx={{ width: '30%' }} size='small'>
                        <InputLabel id="select-label" variant="standard">Seleção de Produtos</InputLabel>
                        <NativeSelect
                            id="select-produtos"
                            value={produtoSelecionado}
                            onChange={(e) => setProdutoSelecionado(e.target.value)}
                        >
                            <option>Selecione</option>
                            <option value={1}>Produto Protótipo</option>
                            <option value={2}>Produto Protótipo 2</option>
                        </NativeSelect>
                    </FormControl>
                </Box>

                {/* Modal Sobreposto */}
                {isAddingrProduto && (

                    <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                         {/* <Card sx={{ margin: '35px', padding: '20px', width: '400px', backgroundColor: '#f5f5f5' }}> */}
                         <Card sx={{ width: 400, padding: 2 }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Incluir Lançamento no Estoque
                                </Typography>

                                <TextField
                                    fullWidth
                                    label="Descrição"
                                    variant="outlined"
                                    margin="normal"
                                    value={descricao}
                                    onChange={(e) => setDescricao(e.target.value)}
                                />

                                <TextField
                                    fullWidth
                                    label="Código"
                                    variant="outlined"
                                    type="number"
                                    margin="normal"
                                    value={codigo}
                                    onChange={(e) => setCodigo(e.target.value)}
                                />


                                <TextField
                                    fullWidth
                                    label="Categoria"
                                    variant="outlined"
                                    margin="normal"
                                    value={categoria}
                                    onChange={(e) => setCategoria(e.target.value)}
                                />

                            </CardContent>
                            <CardActions sx={{ justifyContent: 'flex-end' }}>
                                <Button variant="outlined" onClick={cancelarInclusao}>Cancelar</Button>
                                <Button variant="outlined" onClick={salvarProduto}>Salvar</Button>
                            </CardActions>
                        </Card>

                    </Box>
                )}

            </Box >
        </Box >
    )
}

export default Estoque;