// ✅ Versão final refinada do componente Perfil.jsx com estilo claro, responsivo e sem erros no console

import {
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import useProtectedData from "../../hooks/useProtectedData";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import api from "../../services/api";
import { AlertCustomizado } from "../../components/AlertCustomizado";
import Header from "../../components/Header/Header";

function Perfil() {
  const { usuario, usuarioLogado } = useAuth();
  const [emEdicao, setEmEdicao] = useState(false);
  const [dadosEditados, setDadosEditados] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [excluindo, setExcluindo] = useState(false);
  const navigate = useNavigate();

  const [alertState, setAlertState] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const showAlert = (message, severity = 'success') => {
    setAlertState({ open: true, message, severity });
  };

  const { dados: perfil, carregando, error } = useProtectedData(
    usuarioLogado && usuario?.id ? `/usuarios/${usuario.id}` : null
  );

  useEffect(() => {
    if (perfil) setDadosEditados(perfil);
  }, [perfil]);

  const salvarDadosEditados = async () => {
    try {
      await api.patch(`/usuarios/${usuario.id}`, dadosEditados);
      setEmEdicao(false);
      showAlert('Perfil atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar:', error);
      showAlert('Erro ao atualizar perfil!', 'error');
    }
  };

  const excluirConta = async () => {
    setExcluindo(true);
    try {
      await api.delete(`/usuarios/${usuario.id}`);
      localStorage.removeItem('token');
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error("Erro ao excluir conta:", error);
      alert("Erro ao excluir conta.");
    } finally {
      setExcluindo(false);
    }
  };

  const estiloInput = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: '#003049' },
      '&:hover fieldset': { borderColor: '#003049' },
      '&.Mui-focused fieldset': { borderColor: '#003049' }
    },
    '& .MuiInputBase-input': {
      fontSize: '1rem',
      padding: '12px'
    },
  };

  if (carregando) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <Box sx={{ backgroundColor: '#F0FAFF', minHeight: '100vh' }}>
      <Header />

      <Container sx={{ pt: { xs: 10, md: 14 }}}>
        <Paper elevation={3} sx={{ padding: 4, borderRadius: 4 }}>
          <Grid container spacing={4} alignItems="flex-start">
            {/* Avatar e nome */}
            <Grid item xs={12} md={4}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Avatar sx={{ height: 180, width: 180, fontSize: 60, backgroundColor: '#003049' }}>
                  {(perfil?.nome ? perfil.nome[0].toUpperCase() : 'U')}
                </Avatar>
                <Typography variant="h5" fontWeight="bold" mt={2} textAlign="center">
                  {`${dadosEditados?.nome || ""} ${dadosEditados?.sobrenome || ""}`}
                </Typography>
                <Typography variant="subtitle1" fontStyle="italic" color="text.secondary">
                  Proprietário
                </Typography>
              </Box>
            </Grid>

            {/* Formulário */}
            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                {[{
                  label: "Nome da Empresa", field: "empresa"
                }, {
                  label: "Nome", field: "nome"
                }, {
                  label: "Sobrenome", field: "sobrenome"
                }, {
                  label: "Contato", field: "contato"
                }, {
                  label: "E-mail", field: "email"
                }, {
                  label: "CEP", field: "cep", type: "cep"
                }, {
                  label: "Logradouro", field: "logradouro"
                }, {
                  label: "Número", field: "numero"
                }, {
                  label: "Complemento", field: "complemento"
                }, {
                  label: "Bairro", field: "bairro"
                }, {
                  label: "Cidade", field: "cidade"
                }, {
                  label: "UF", field: "uf"
                }].map(({ label, field, type }) => (
                  <Grid item xs={12} sm={6} key={field}>
                    <TextField
                      label={label}
                      fullWidth
                      variant="outlined"
                      value={dadosEditados?.[field] || ""}
                      onChange={async (e) => {
                        const value = e.target.value;
                        if (type === "cep") {
                          const cep = value.replace(/\D/g, '');
                          setDadosEditados({ ...dadosEditados, cep });
                          if (cep.length === 8) {
                            try {
                              const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                              const data = await response.json();
                              if (!data.erro) {
                                setDadosEditados(prev => ({
                                  ...prev,
                                  logradouro: data.logradouro,
                                  bairro: data.bairro,
                                  cidade: data.localidade,
                                  uf: data.uf
                                }));
                              } else {
                                showAlert('CEP não encontrado', 'warning');
                              }
                            } catch {
                              showAlert('Erro ao buscar o CEP.', 'error');
                            }
                          }
                        } else {
                          setDadosEditados(prev => ({ ...prev, [field]: value }));
                        }
                      }}
                      inputProps={{ readOnly: !emEdicao }}
                      sx={estiloInput}
                    />
                  </Grid>
                ))}
              </Grid>

              {/* Botões */}
              <Box mt={4} display="flex" gap={2} flexWrap="wrap">
                {!emEdicao ? (
                  <Button variant="contained" onClick={() => setEmEdicao(true)}>
                    Editar Perfil
                  </Button>
                ) : (
                  <>
                    <Button variant="contained" color="success" onClick={salvarDadosEditados}>
                      Salvar
                    </Button>
                    <Button variant="outlined" onClick={() => setEmEdicao(false)}>
                      Cancelar
                    </Button>
                  </>
                )}
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setOpenDeleteDialog(true)}
                  disabled={excluindo}
                >
                  {excluindo ? 'Excluindo...' : 'Excluir Conta'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      {/* Diálogo Exclusão */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja excluir sua conta? Esta ação não poderá ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancelar</Button>
          <Button onClick={excluirConta} color="error" variant="contained" disabled={excluindo}>
            {excluindo ? 'Excluindo...' : 'Excluir'}
          </Button>
        </DialogActions>
      </Dialog>

      <AlertCustomizado
        open={alertState.open}
        onClose={() => setAlertState({ ...alertState, open: false })}
        message={alertState.message}
        severity={alertState.severity}
      />
    </Box>
  );
}

export default Perfil;
