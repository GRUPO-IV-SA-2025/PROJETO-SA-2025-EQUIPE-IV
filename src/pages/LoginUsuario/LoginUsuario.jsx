import './LoginUsuario.css';
import { Link, useNavigate } from 'react-router';
import LogoProjeto from '../../components/LogoProjeto/LogoProjeto'
import { useState } from 'react';
import { Box, Button, Stack, TextField } from '@mui/material';
import img from '/images/conceito-de-tecnologia-futurista.jpg';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';


function TelaLogin() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', senha: '' });
    const [errors, setErrors] = useState({ email: false, senha: false });
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const { login } = useAuth();

    const alteraVisibilidadeSenha = () => {
        setMostrarSenha(!mostrarSenha)
    }


    const handleChange = (e) => {
        const { name, value } = e.target; // Corrigido: use 'value' em vez de 'valorCampo'
        setFormData(prev => ({ ...prev, [name]: value }));

        if (value.trim() !== '') {
            setErrors(prev => ({ ...prev, [name]: false }));
        }
    }

    const handleEntrarClick = () => {
        const novosErros = {
            email: formData.email.trim() === '',
            senha: formData.senha.trim() === ''
        }

        setErrors(novosErros);

        if (novosErros.email || novosErros.senha) {
            return;
        }

        const usuarioValido = formData.email === 'admin@estoque.com' &&
            formData.senha === 'admin123';

        if (usuarioValido) {
            login({ 
                nome: 'Administrador',
                email: formData.email
            });
            navigate('/PaginaInicial');
        } else {
            alert('Credenciais inválidas!');
        }
    }

    return (

        <Box sx={{ width: '100vw', height: '100vh', gridTemplateColumns: '1fr 1fr', display: 'flex' }}>
            <Box sx={{ width: '50%', backgroundColor: '#0077b6' }}>
                <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '8px' }}>
                <img src={img} className='img-worker' alt="" />
                </Box>
            </Box>
            <Box sx={{ width: '50%', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Stack spacing={5} sx={{ width: '50%', alignItems: 'center' }}>
                    <LogoProjeto />
                    <Stack spacing={5} sx={{ width: '100%' }}>
                        <TextField name='email' value={formData.email} onChange={handleChange} fullWidth label="Seu e-mail" variant="outlined"
                            error={errors.email} helperText={errors.empresa ? 'Campo obrigatório' : ''} />
                        <TextField
                            name='senha'
                            value={formData.senha}
                            onChange={handleChange}
                            fullWidth
                            label="Sua senha"
                            variant="outlined"
                            type={mostrarSenha ? "text" : "password"}
                            error={errors.senha}
                            helperText={errors.senha ? 'Campo obrigatório' : ''}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={alteraVisibilidadeSenha}
                                                edge="end"
                                            >
                                                {mostrarSenha ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }
                            }}
                        />
                        <Button sx={{ height: '50px' }} variant="contained" onClick={handleEntrarClick}>
                            Acessar minha conta
                        </Button>
                        <p className="signup-text">
                            Não possui conta ainda?
                            <Link
                                to="/CadastroUsuario"
                                className="signup-link" >
                                Cadastre-se
                            </Link>
                        </p>
                    </Stack>
                </Stack>
            </Box>
        </Box>
    )
}

export default TelaLogin;
