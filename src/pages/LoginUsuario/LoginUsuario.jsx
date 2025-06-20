import './LoginUsuario.css';
import { Link, replace, useNavigate } from 'react-router';
import LogoProjeto from '../../components/LogoProjeto/LogoProjeto'
import { useEffect, useState } from 'react';
import { Alert, Box, Button, Stack, TextField } from '@mui/material';
import img from '/src/images/conceito-de-tecnologia-futurista.jpg';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';


function TelaLogin() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', senha: '' });
    const [errors, setErrors] = useState({ email: false, senha: false });
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [carregando, setCarregando] = useState(false)
    const { login, usuarioLogado } = useAuth();
    const [mensagemErro, setMensagemErro] = useState(null);

    useEffect(() => {
        if (usuarioLogado) {
            navigate('/Dashbboard', { replace: true })
        }
    }, [usuarioLogado, navigate]);


    const alteraVisibilidadeSenha = () => {
        setMostrarSenha(!mostrarSenha)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        setErrors(prev => ({
            ...prev,
            [name]: false
        }))
    }

    const validarEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };


    const Entrar = async () => {
        if (!formData.email || !formData.senha) {
            setErrors({
                email: !formData.email,
                senha: !formData.senha
            })
            return;
        }

        if (!validarEmail(formData.email)) {
            setMensagemErro('Por favor, insira um e-mail válido.');
            return;
        }

        setCarregando(true);
        setMensagemErro(null);

        try {
            const response = await api.post('/login', {
                email: formData.email,
                senha: formData.senha
            })

            const { token } = response.data;

            login(token);

            // const privateResponse = await api.get('/private');
            // console.log('Sessão privada ativa:', privateResponse.data);

            navigate('/Dashboard');

        } catch (error) {
            console.error('Erro de login/sessão:', error);

            if (error.response) {
                if (error.response.status === 401) {
                    setMensagemErro('Credenciais inválidas. Verifique seu e-mail e senha.');
                } else if (error.response.status === 500) {
                    setMensagemErro('Erro no servidor. Tente novamente mais tarde.');
                } else {
                    setMensagemErro('Ocorreu um erro ao fazer login.');
                }
            } else {
                setMensagemErro('Não foi possível conectar ao servidor.');
            }
        } finally {
            setCarregando(false);
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
                    {mensagemErro && (
                        <Alert severity="error" sx={{ width: '100%' }}>
                            {mensagemErro}
                        </Alert>
                    )}
                    <Stack spacing={5} sx={{ width: '100%' }}>
                        <TextField
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            label="Seu e-mail"
                            variant="outlined"
                            error={errors.email}
                            helperText={errors.email ? 'Campo obrigatório' : ''} />
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
                        <Button
                            sx={{ height: '50px' }}
                            variant="contained"
                            onClick={Entrar}
                            disabled={carregando}
                        >
                            {carregando ? 'Carregando...' : 'Acessar minha conta'}
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
