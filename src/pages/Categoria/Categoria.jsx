import { Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem } from "@mui/material";
import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";
import api from "../../services/api";


function Categoria() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDialogOpenDeletar, setisDialogOpenDeletar] = useState(false)
    const [isDialogOpenEditar, setIsDialogOpenEditar] = useState(false)

    useEffect(() => {
        api.get("/categorias")
            .then(response => {
                setCategorias(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar categorias:", error);
            });
    }, []);

    const [categorias, setCategorias] = useState([])
    const [novaCategoria, setNovaCategoria] = useState({
        descricao: ''
    })

    const [categoriaEditar, setCategoriaEditar] = useState(null)
    const [categoriaDeletar, setCategoriaDeletar] = useState(null)

    const abrirDialog = () => {
        setNovaCategoria({ descricao: '' });
        setIsDialogOpen(true)
    }
    const fecharDialog = () => {
        setIsDialogOpen(false)
    }



    const abrirDialogEditar = (categoria) => {
        setCategoriaEditar(categoria);
        setNovaCategoria({
            descricao: categoria.descricao,
        });
        setIsDialogOpenEditar(true);
    };
    const fecharDialogEditar = () => {
        setIsDialogOpenEditar(false)
    }

    const editarCategoria = async () => {
        try {
            const response = await api.patch(`/categorias/${categoriaEditar.id}`, {
                descricao: novaCategoria.descricao,
            });

            setCategorias((prev) =>
                prev.map((c) => (c.id === categoriaEditar.id ? response.data : c))
            );

            fecharDialogEditar();
        } catch (error) {
            console.error("Erro ao editar a categoria:", error);
        }
    };

    const abrirDialogDeletar = () => setIsDialogOpenDeletar(true)
    const fecharDialogDeletar = () => {
        setisDialogOpenDeletar(false);
    }

    const excluirCategoria = async (id) => {
        try {
            await api.delete(`/categorias/${id}`);
            setCategorias((prev) => prev.filter(p => p.id !== id));
        } catch (error) {
            console.error("Erro ao excluir categoria:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNovaCategoria((prev) => ({ ...prev, [name]: value }));
    };

    const cadastrarCategoria = async () => {
        try {
            const response = await api.post("/categorias", {
                descricao: novaCategoria.descricao
            })
            setCategorias((prev) => [...prev, response.data]);
            setNovaCategoria({ descricao: '' });
            fecharDialog();
        } catch (error) {
            console.error("Erro ao cadastrar nova categoria: ", error)
        }
    }


    return (
        <Box sx={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />

            <Box sx={{ backgroundColor: '#e6f3fa', flex: 1, marginTop: "85px", padding: '2rem' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h4" gutterBottom sx={{ color: "#004468", fontWeight: "bold", fontSize: "40px" }}>
                        Categorias
                    </Typography>
                    <Button variant='contained' size='large' sx={{ padding: '8px', height: '40px', borderRadius: '10px', fontWeight: 'Bold' }} onClick={abrirDialog}>
                        + Incluir categoria
                    </Button>
                </Box>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#fffff" }}>
                                <TableCell><strong>Descrição</strong></TableCell>
                                <TableCell><strong>Código</strong></TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categorias.map((categoria, index) => (
                                <TableRow key={categoria.id}>
                                    <TableCell>{categoria.descricao}</TableCell>
                                    <TableCell>{categoria.id}</TableCell>
                                    <TableCell align="right">
                                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                                            <Button variant="contained" size="small" onClick={() => abrirDialogEditar(categoria)} sx={{ backgroundColor: '#0288d1' }}>Editar</Button>
                                            <Button variant="contained" size="small" onClick={() => {
                                                setCategoriaDeletar(categoria);
                                                setisDialogOpenDeletar(true);
                                            }} sx={{ backgroundColor: '#d32f2f' }}>Excluir</Button>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <Dialog open={isDialogOpen} onClose={fecharDialog}>
                <DialogTitle sx={{ fontWeight: 'bold', color: '#004468', fontSize: '30px' }}>Nova Categoria</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        <TextField label="Descrição" name="descricao"
                            onChange={handleChange} fullWidth />
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={fecharDialog} variant="outlined" color="primary">Cancelar</Button>
                    <Button onClick={cadastrarCategoria} variant="contained" sx={{ backgroundColor: '#004468' }}>Cadastrar</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={isDialogOpenEditar} onClose={fecharDialogEditar}>
                <DialogTitle sx={{ fontWeight: 'bold', color: '#004468', fontSize: '30px' }}>Editar categoria</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        <TextField label="Descrição" name="descricao" value={novaCategoria.descricao} onChange={handleChange} fullWidth />
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={fecharDialogEditar} variant="outlined" color="primary">Cancelar</Button>
                    <Button onClick={editarCategoria} variant="contained" sx={{ backgroundColor: '#004468' }}>Editar</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={isDialogOpenDeletar} onClose={fecharDialogDeletar}>
                <DialogTitle sx={{ fontWeight: 'bold', color: '#004468', fontSize: '30px' }}>Deseja realmente exluir a categoria?</DialogTitle>
                <DialogActions sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', px: 3, pb: 2 }}>
                    <Button onClick={fecharDialogDeletar} variant="outlined" color="primary">Cancelar</Button>
                    <Button
                        onClick={() => {
                            excluirCategoria(categoriaDeletar.id);
                            fecharDialogDeletar()
                        }}
                        variant="contained" sx={{ backgroundColor: '#004468' }}>Excluir</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )

}

export default Categoria;