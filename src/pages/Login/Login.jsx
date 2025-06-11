import './Login.css';
import iconBox from '/images/icon-caixa.svg';
import { Link, useNavigate } from 'react-router';
import LogoProjeto from '../../components/LogoProjeto/LogoProjeto'
import { useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, Stack, TextField, Typography } from '@mui/material';
import imgWorker from '/images/Checking boxes-amico.svg';
import img from '/images/conceito-de-tecnologia-futurista.jpg';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const usuariosTeste = [
    {
        nome: 'administrador',
        email: 'admin@estoque.com',
        senha: 'admin123'   
    }
]


function TelaLogin() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', senha: '' });
    const [errors, setErrors] = useState({ email: false, senha: false });
    const [mostrarSenha, setMostrarSenha] = useState(false);

    const alteraVisibilidadeSenha = () => {
        setMostrarSenha(!mostrarSenha); //alterna entre visivel e oculto
    }

    const handleEntrarClick = (e) => {
        // e.preventDefault();
        // setUsuarioLogado(true);
        // navigate('/')

        // Validação simples dos campos
        // const novosErros = {
        //     email: formData.email.trim() === '',
        //     senha: formData.senha.trim() === ''
        // };

        // setErrors(novosErros);

        // Se tiver erro, não continua
        // if (novosErros.email || novosErros.senha) {
        //     return;
        // }


        // Se passou na validação
        alert('Login realizado com sucesso!');
        navigate('/pages/PaginaInicial');
    }



    const handleChange = (e) => {
        const { name, valorCampo } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (valorCampo.trim() !== '') {
            setErrors(prev => ({ ...prev, [name]: false }));
        }
    };

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
                                to="/pages/Cadastro"
                                className="signup-link" >
                                Cadastre-se
                            </Link>
                        </p>
                    </Stack>
                </Stack>
            </Box>
        </Box>
        // <div className="login-container">

        //     <LogoProjeto />
        //     <div className="login-box">
        //         <h2 className="login-title">Acessar sua conta</h2>

        //         <label className="login-label">Email ou nome de Usuário</label>
        //         <input
        //             type="text"
        //             name='usuarioEmail'
        //             className={`login-input ${errors.usuarioEmail ? 'input-error' : ''}`}
        //             placeholder="Insira o nome do seu usuário ou E-mail"
        //             value={formData.usuarioEmail}
        //             onChange={handleChange}
        //         />
        //         {errors.usuarioEmail && <span className='error-text'>Campo obrigatório</span>}

        //         <label className="login-label">Senha</label>
        //         <div className="password-wrapper">
        //             <input
        //                 // type="password"
        //                 type={mostrarSenha ? "text" : "password"}  // Altera o tipo entre "text" e "password"
        //                 name='senha'
        //                 className={`login-input ${errors.senha ? 'input-error' : ''}`}
        //                 placeholder="Insira sua senha"
        //                 value={formData.senha}
        //                 onChange={handleChange}
        //             />
        //             <button type='button' onClick={alteraVisibilidadeSenha} className='show-password-btn'>
        //                 {mostrarSenha ? 'Ocultar' : 'Mostrar'}
        //             </button>
        //         </div>
        //         {errors.senha && <span className='error-text'>Campo obrigatório</span>}

        //         <a className="login-link">Esqueceu sua senha?</a>

        //         <button className="login-button" onClick={handleEntrarClick}>Entrar</button>

        //         <p className="signup-text">
        //             Não possui conta ainda?{' '}
        //             <Link
        //                 to="/telas/Cadastro"
        //                 className="signup-link" >
        //                 Cadastre-se
        //             </Link>
        //         </p>
        //     </div>
        // </div>
    )
}

export default TelaLogin; 
