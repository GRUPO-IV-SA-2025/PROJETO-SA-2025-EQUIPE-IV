import { Box, Button, IconButton, Stack, TextField, InputAdornment } from '@mui/material';
import './CadastroUsuario.css';
import LogoProjeto from '../../components/LogoProjeto/LogoProjeto';
import imgWorker from '/src/images/Checking boxes-amico.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import api from '../../services/api';

function TelaCadastroUsuario() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        empresa: '',
        nome: '',
        sobrenome: '',
        contato: '',
        email: '',
        senha: '',
        confirmarSenha: ''
    });

    const [errors, setErrors] = useState({
        empresa: false,
        nome: false,
        sobrenome: false,
        contato: false,
        email: false,
        senha: false,
        confirmarSenha: false
    });

    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

    const toggleMostrarSenha = () => {
        setMostrarSenha(!mostrarSenha);
    };

    const toggleMostrarConfirmarSenha = () => {
        setMostrarConfirmarSenha(!mostrarConfirmarSenha);
    };

    const emailEhValido = (email) => {
        const regex = /^[\w-.]+@[\w-]+\.[a-z]{2,}$/i;
        return regex.test(email);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (value.trim() !== '') {
            setErrors(prev => ({ ...prev, [name]: false }));
        }
    };

    const handleSubmit = async () => {
        const novosErros = {};
        let hasError = false;

        for (const campo in formData) {
            if (formData[campo].trim() === '') {
                novosErros[campo] = true;
                hasError = true;
            } else {
                novosErros[campo] = false;
            }
        }

        if (formData.senha !== formData.confirmarSenha) {
            novosErros.confirmarSenha = true;
            hasError = true;
        }

        if (!emailEhValido(formData.email)) {
            novosErros.email = true;
            hasError = true;
        }

        setErrors(novosErros);

        if (hasError) return;

        try {
            const response = await api.post('/cadastro', {
                empresa: formData.empresa,
                nome: formData.nome,
                sobrenome: formData.sobrenome,
                contato: formData.contato,
                email: formData.email,
                senha: formData.senha
            });

            console.log(response);
            alert('Cadastro realizado com sucesso!');
            navigate('/LoginUsuario');
        } catch (error) {
            console.error('Erro ao cadastrar:', error);
            alert(error.response?.data?.message || 'Erro ao cadastrar usuário.');
        }
    };

    const handleButtonClick = (e) => {
        handleSubmit(e);
    };

    return (
        <Box sx={{ width: '100vw', height: '100vh', gridTemplateColumns: '1fr 1fr', display: 'flex' }}>
            <Box sx={{ width: '50%', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Stack spacing={2} sx={{ width: '50%', alignItems: 'center' }}>
                    <LogoProjeto />
                    <Stack spacing={2} sx={{ width: '100%' }}>
                        <TextField name='empresa' value={formData.empresa} onChange={handleChange} fullWidth label="Nome da empresa" variant="outlined"
                            error={errors.empresa} helperText={errors.empresa ? 'Campo obrigatório' : ''} sx={{ mb: 1 }} />

                        <TextField name='nome' value={formData.nome} onChange={handleChange} fullWidth label="Nome" variant="outlined"
                            error={errors.nome} helperText={errors.nome ? 'Campo obrigatório' : ''} sx={{ mb: 1 }} />

                        <TextField name='sobrenome' value={formData.sobrenome} onChange={handleChange} fullWidth label="Sobrenome" variant="outlined"
                            error={errors.sobrenome} helperText={errors.sobrenome ? 'Campo obrigatório' : ''} sx={{ mb: 1 }} />

                        <TextField name='contato' value={formData.contato} onChange={handleChange} fullWidth label="Número de contato" variant="outlined"
                            error={errors.contato} helperText={errors.contato ? 'Campo obrigatório' : ''} sx={{ mb: 1 }} />

                        <TextField name='email' value={formData.email} onChange={handleChange} fullWidth label="E-mail" variant="outlined"
                            error={errors.email} helperText={errors.email ? 'Informe um e-mail válido' : ''} sx={{ mb: 1 }} />

                        <TextField
                            name='senha'
                            value={formData.senha}
                            onChange={handleChange}
                            fullWidth
                            label="Crie uma senha forte"
                            variant="outlined"
                            type={mostrarSenha ? "text" : "password"}
                            error={errors.senha}
                            helperText={errors.senha ? 'Campo obrigatório' : ''}
                            sx={{ mb: 1 }}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={toggleMostrarSenha}
                                                edge="end"
                                            >
                                                {mostrarSenha ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }
                            }}
                        />

                        <TextField
                            name='confirmarSenha'
                            value={formData.confirmarSenha}
                            onChange={handleChange}
                            fullWidth
                            label="Confirme sua senha"
                            variant="outlined"
                            type={mostrarConfirmarSenha ? "text" : "password"}
                            error={errors.confirmarSenha}
                            helperText={errors.confirmarSenha ? 'As senhas não coincidem ou campo vazio' : ''}
                            sx={{ mb: 1 }}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={toggleMostrarConfirmarSenha}
                                                edge="end"
                                            >
                                                {mostrarConfirmarSenha ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }
                            }}
                        />

                        <Button variant='contained' size='large' onClick={handleButtonClick}>Cadastrar</Button>
                    </Stack>
                </Stack>
            </Box>
            <Box sx={{ width: '50%', backgroundColor: '#0077b6' }}>
                <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '8px' }}>
                    <p className='text-img'>Controle seu estoque de forma ágil e simples – rápido e eficiente!</p>
                    <img src={imgWorker} className='img-worker' alt="" />
                </Box>
            </Box>
        </Box>
    );
}

export default TelaCadastroUsuario;
