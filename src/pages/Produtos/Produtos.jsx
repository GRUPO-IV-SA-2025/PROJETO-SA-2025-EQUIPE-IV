import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem } from "@mui/material";
import axios from "axios";


function Produtos1() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogOpenCategoria, setIsDialogOpenCategoria] = useState(false);
  const [isDialogOpenEditar, setIsDialogOpenEditar] = useState(false);
  const [isDialogOpenDeletar, setIsDialogOpenDeletar] = useState(false);


  useEffect(() => {
    axios.get('http://localhost:3000/categorias')
      .then(res => {
        console.log("Categorias recebidas:", res.data); // Veja isso no console
        setCategoria(res.data)
      })
      .catch(err => console.error('Erro ao carregar categorias:', err));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3000/produtos")
      .then(response => {
        setProdutos(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar produtos:", error);
      });
  }, []);

  const [produtos, setProdutos] = useState([]);

  const [novoProduto, setNovoProduto] = useState({
    descricao: '',
    categoria: ''
  });

  const [categoria, setCategoria] = useState([
    { descricao: '' }
  ])

  const [novaCategoria, setNovaCategoria] = useState({
    descricao: ''
  });

  const [produtoEditar, setProdutoEditar] = useState(null)

  const [produtoDeletar, setProdutoDeletar] = useState(null)


  // const abrirDialogEditar = () => setisDialogOpenEditar(true);
  // const fecharDialogEditar = () => {
  //   setisDialogOpenEditar(false);
  // }

  const abrirDialogEditar = (produto) => {
    setProdutoEditar(produto);
    setNovoProduto({
      descricao: produto.descricao,
      codigo: produto.codigo,
      categoria: produto.categorias_id
      // categoria: categoria.find(c => c.descricao === produto.categoria)?.id || ''
    });
    setIsDialogOpenEditar(true);
  };
  const fecharDialogEditar = () => {
    setIsDialogOpenEditar(false)
  }

  const editarProduto = async () => {
    try {
      const response = await axios.patch(`http://localhost:3000/produtos/${produtoEditar.id}`, {
        descricao: novoProduto.descricao,
        categorias_id: novoProduto.categoria
      });

      setProdutos((prev) =>
        prev.map((p) => (p.id === produtoEditar.id ? response.data : p))
      );

      fecharDialogEditar();
    } catch (error) {
      console.error("Erro ao editar produto:", error);
    }
  };

  const abrirDialogDeletar = () => setIsDialogOpenDeletar(true)
  const fecharDialogDeletar = () => {
    setIsDialogOpenDeletar(false);
  }

  const excluirProduto = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/produtos/${id}`);
      setProdutos((prev) => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
    }
  };

  const abrirDialog = () => {
    setNovoProduto({ descricao: '', codigo: '', categoria: '' });

    setProdutoEditar(null)
    setIsDialogOpen(true);
  }

  const fecharDialog = () => {
    setIsDialogOpen(false);
    // setNovoProduto({ descricao: '', codigo: '', categoria: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovoProduto((prev) => ({ ...prev, [name]: value }));
  };

  const cadastrarProduto = async () => {
    try {
      const response = await axios.post("http://localhost:3000/produtos", {
        descricao: novoProduto.descricao,
        categorias_id: novoProduto.categoria
      });

      setProdutos(prev => [...prev, response.data]);
      fecharDialog();
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
    }
  };

  const abrirDialogCategoria = () => setIsDialogOpenCategoria(true);
  const fecharDialogCategoria = () => {
    setIsDialogOpenCategoria(false);
    setNovaCategoria({ descricao: '' })
  }

  const handleChangeCategoria = (e) => {
    const { name, value } = e.target;
    setNovaCategoria((prev) => ({ ...prev, [name]: value }));
  };

  const cadastrarCategoria = async () => {
    try {
      const response = await axios.post("http://localhost:3000/categorias", {
        descricao: novaCategoria.descricao
      })
      setCategoria((prev) => [...prev, response.data]);
      setNovaCategoria({ descricao: '' });
      fecharDialogCategoria();
    } catch (error) {
      console.error("Erro ao cadastrar nova categoria: ", error)
    }
    //  const novaComId = {
    //   ...novaCategoria,
    //   id: categoria.length + 1 // Simples id incremental
    // };
  }

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <Box sx={{ backgroundColor: '#e6f3fa', flex: 1, marginTop: "85px", padding: '2rem' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" gutterBottom sx={{ color: "#004468", fontWeight: "bold", fontSize: "40px" }}>
            Produtos
          </Typography>
          <Button variant='contained' size='large' sx={{ padding: '8px', height: '40px', borderRadius: '10px', fontWeight: 'Bold' }} onClick={abrirDialog}>
            + Incluir cadastro
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#fffff" }}>
                <TableCell><strong>Descrição</strong></TableCell>
                <TableCell><strong>Código</strong></TableCell>
                <TableCell><strong>Categoria</strong></TableCell>
                <TableCell align="right"><strong>Ações</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {produtos.map((produto, index) => (
                <TableRow key={produto.id}>
                  <TableCell>{produto.descricao}</TableCell>
                  <TableCell>{produto.id}</TableCell>
                  <TableCell>{produto.categoria}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <Button variant="contained" size="small" sx={{ backgroundColor: '#0d47a1' }}>Estoque rápido</Button>
                      <Button variant="contained" size="small" onClick={() => abrirDialogEditar(produto)} sx={{ backgroundColor: '#0288d1' }}>Editar</Button>
                      <Button variant="contained" size="small" onClick={() => {
                        setProdutoDeletar(produto); // <-- salva o produto que será deletado
                        setIsDialogOpenDeletar(true);
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
        <DialogTitle sx={{ fontWeight: 'bold', color: '#004468', fontSize: '30px' }}>Novo produto</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Descrição" name="descricao" value={novoProduto.descricao} onChange={handleChange} fullWidth />
            <Box sx={{ display: 'flex', gap: 2 }}>
              {/* <TextField label="Código" name="codigo" value={novoProduto.codigo} onChange={handleChange} fullWidth /> */}
              <TextField
                select
                label="Categoria"
                name="categoria"
                value={novoProduto.categoria}
                onChange={handleChange}
                fullWidth
              >
                {categoria.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.descricao}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Stack>
        </DialogContent>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 3, pb: 0 }}>
          <Button onClick={abrirDialogCategoria} variant="contained" sx={{ backgroundColor: '#004468' }}>Cadastrar Categoria</Button>
        </Box>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={fecharDialog} variant="outlined" color="primary">Cancelar</Button>
          <Button onClick={cadastrarProduto} variant="contained" sx={{ backgroundColor: '#004468' }}>Cadastrar</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isDialogOpenCategoria} onClose={fecharDialogCategoria}>
        <DialogTitle sx={{ fontWeight: 'bold', color: '#004468', fontSize: '30px' }}>Nova categoria</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Descrição" name="descricao" value={novaCategoria.descricao} onChange={handleChangeCategoria} fullWidth />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={fecharDialogCategoria} variant="outlined" color="primary">Cancelar</Button>
          <Button onClick={cadastrarCategoria} variant="contained" sx={{ backgroundColor: '#004468' }}>Cadastrar</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isDialogOpenEditar} onClose={fecharDialogEditar}>
        <DialogTitle sx={{ fontWeight: 'bold', color: '#004468', fontSize: '30px' }}>Editar produto</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Descrição" name="descricao" value={novoProduto.descricao} onChange={handleChange} fullWidth />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField label="Código" name="codigo" disabled onChange={handleChange} fullWidth />
              <TextField
                select
                label="Categoria"
                name="categoria"
                value={novoProduto.categoria}
                onChange={handleChange}
                fullWidth
              >
                {categoria.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.descricao}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={fecharDialogEditar} variant="outlined" color="primary">Cancelar</Button>
          <Button onClick={editarProduto} variant="contained" sx={{ backgroundColor: '#004468' }}>Editar</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isDialogOpenDeletar} onClose={fecharDialogDeletar}>
        <DialogTitle sx={{ fontWeight: 'bold', color: '#004468', fontSize: '30px' }}>Deseja realmente exluir o produto?</DialogTitle>
        <DialogActions sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', px: 3, pb: 2 }}>
          <Button onClick={fecharDialogDeletar} variant="outlined" color="primary">Cancelar</Button>
          <Button
            onClick={() => {
              excluirProduto(produtoDeletar.id);
              fecharDialogDeletar()
            }}
            variant="contained" sx={{ backgroundColor: '#004468' }}>Excluir</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Produtos1;
