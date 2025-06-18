import { useState } from "react";
import Header from "../../components/Header/Header";
import { Box, Button, FormControl, InputLabel, MenuItem, NativeSelect, Select, Typography } from "@mui/material";


function Produtos() {


    const [isAddingrProduto, setIsAddingProduto] = useState(false);

    function adicionarProduto() {
        setIsAddingProduto(true);
    }

    return (
        <Box sx={{ width: '100%', height: '100%', gridTemplateColumns: '1fr 1fr', display: 'flex' }}>

            <Header />


            <Box sx={{ height: "100%", width: '100%', backgroundColor: 'white', marginTop: "85px" }}>
                <Box sx={{ marginTop: "35px", marginLeft: "35px", marginRight: "35px", display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h4" gutterBottom sx={{ color: "#004468", fontWeight: "bold", fontSize: "40px" }}>
                        Produtos
                    </Typography>
                    <Button variant='contained' size='large' sx={{ padding: '8px', height: '40px', borderRadius: '10px' }} onClick={adicionarProduto}>
                        + Incluir Lançamento
                    </Button>
                </Box>
                <Box>
                    <FormControl sx={{ height: "100%", width: '30%', marginLeft: '35px' }} size='small' >
                        <InputLabel id="select-label" variant="standard">Seleção de Produtos</InputLabel>
                        <NativeSelect
                            id="select-produtos"
                        >
                            <option value={1}>Produto Protótipo</option>
                            <option value={2}>Produto Protótipo 2</option>
                        </NativeSelect>
                    </FormControl>
                </Box>
                {isAddingrProduto && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>Novo Produto</h2>
                            <input
                                placeholder="Tipo"
                            />
                            <button onClick={() => setIsAddingProduto(false)}>Cancelar</button>
                        </div>
                    </div>
                )}

                <Box>

                </Box>
            </Box >
        </Box >
    )
}

export default Produtos;