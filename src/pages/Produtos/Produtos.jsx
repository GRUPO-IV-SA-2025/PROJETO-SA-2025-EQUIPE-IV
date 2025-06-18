import { useState } from "react";
import Header from "../../components/Header/Header";
import { Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";

function Produtos1() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [produtos, setProdutos] = useState([
    { codigo: '123456', descricao: 'Produto', categoria: 'Mercadoria para revenda' },
    { codigo: '123456', descricao: 'Produto', categoria: 'Mercadoria para revenda' },
    { codigo: '123456', descricao: 'Produto', categoria: 'Mercadoria para revenda' },
    { codigo: '123456', descricao: 'Produto', categoria: 'Mercadoria para revenda' },
    { codigo: '123456', descricao: 'Produto', categoria: 'Mercadoria para revenda' },
    { codigo: '123456', descricao: 'Produto', categoria: 'Mercadoria para revenda' }
  ]);

  const [novoProduto, setNovoProduto] = useState({
    descricao: '',
    codigo: '',
    categoria: ''
  });

  const abrirDialog = () => setIsDialogOpen(true);
  const fecharDialog = () => {
    setIsDialogOpen(false);
    setNovoProduto({ descricao: '', codigo: '', categoria: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovoProduto((prev) => ({ ...prev, [name]: value }));
  };

  const cadastrarProduto = () => {
    setProdutos((prev) => [...prev, novoProduto]);
    fecharDialog();
  };

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
                <TableRow key={index}>
                  <TableCell>{produto.descricao}</TableCell>
                  <TableCell>{produto.codigo}</TableCell>
                  <TableCell>{produto.categoria}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <Button variant="contained" size="small" sx={{ backgroundColor: '#0d47a1' }}>Estoque rápido</Button>
                      <Button variant="contained" size="small" sx={{ backgroundColor: '#0288d1' }}>Editar</Button>
                      <Button variant="contained" size="small" sx={{ backgroundColor: '#d32f2f' }}>Excluir</Button>
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
              <TextField label="Código" name="codigo" value={novoProduto.codigo} onChange={handleChange} fullWidth />
              <TextField label="Categoria" name="categoria" value={novoProduto.categoria} onChange={handleChange} fullWidth />
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={fecharDialog} variant="outlined" color="primary">Cancelar</Button>
          <Button onClick={cadastrarProduto} variant="contained" sx={{ backgroundColor: '#004468' }}>Cadastrar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Produtos1;
