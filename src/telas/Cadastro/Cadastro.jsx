import { Box, Button, Stack, TextField } from '@mui/material';
import './Cadastro.css';
import LogoProjeto from '../../components/LogoProjeto/LogoProjeto';
import imgWorker from '/images/Checking boxes-amico.svg';
import { useState } from 'react';

function TelaCadastro() {


    const [formData, setFormData] = useState({
        empresa: '',
        nome: '',
        sobrenome: '',
        cnpj: '',
        contato: '',
        email: '',
        senha: ''
    });

    const [errors, setErrors] = useState({
        empresa: false,
        nome: false,
        sobrenome: false,
        cnpj: false,
        contato: false,
        email: false,
        senha: false
    });

    const handleChange = (e) => {
        // setFormData({ ...formData, [e.target.name]: e.target.value });

        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (value.trim() !== '') {
            setErrors(prev => ({ ...prev, [name]: false }));
        }
    };


    // verifica se os campos estao preenchidos
    const handleSubmit = () => {
        // const camposVazios = Object.entries(formData).filter(([chave, valor]) => valor.trim() === '');

        // if (camposVazios.length > 0) {
        //     alert(`Preencha todos os campos. Campos faltando: ${camposVazios.map(([chave]) => chave).join(', ')}`);
        //     return;
        // }

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

        setErrors(novosErros);

        if (hasError) {
            return;
        }

        alert('Cadastro realizado com sucesso!');
        // Aqui pode chamar uma função para enviar os dados para o backend
    };

    return (
        <Box sx={{ width: '100vw', height: '100vh', gridTemplateColumns: '1fr 1fr', display: 'flex' }}>
            <Box sx={{ width: '50%', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Stack spacing={3} sx={{ width: '50%', alignItems: 'center' }}>
                    <LogoProjeto />
                    <Stack spacing={3} sx={{ width: '100%' }}>
                        <TextField name='empresa' value={formData.empresa} onChange={handleChange} fullWidth label="Nome da empresa" variant="outlined"
                        error={errors.empresa} helperText={errors.empresa ? 'Campo obrigatório' : ''}  />
                        <TextField name='nome' value={formData.nome} onChange={handleChange} fullWidth label="Nome" variant="outlined" 
                        error={errors.nome} helperText={errors.empresa ? 'Campo obrigatório' : ''} /> 
                        <TextField name='sobrenome' value={formData.sobrenome} onChange={handleChange} fullWidth label="Sobrenome" variant="outlined" 
                        error={errors.sobrenome} helperText={errors.empresa ? 'Campo obrigatório' : ''} />
                        <TextField name='cnpj' value={formData.cnpj} onChange={handleChange} fullWidth label="CNPJ" variant="outlined" 
                        error={errors.cnpj} helperText={errors.empresa ? 'Campo obrigatório' : ''} />
                        <TextField name='contato' value={formData.contato} onChange={handleChange} fullWidth label="Número de contato" variant="outlined" 
                        error={errors.contato} helperText={errors.empresa ? 'Campo obrigatório' : ''} />
                        <TextField name='email' value={formData.email} onChange={handleChange} fullWidth label="E-mail" variant="outlined" 
                        error={errors.email} helperText={errors.empresa ? 'Campo obrigatório' : ''} />
                        <TextField name='senha' value={formData.senha} onChange={handleChange} fullWidth label="Crie uma senha forte" variant="outlined" 
                        error={errors.senha} helperText={errors.empresa ? 'Campo obrigatório' : ''} />
                        <Button variant='contained' size='large' onClick={handleSubmit}>Cadastrar</Button>
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
    )
}

export default TelaCadastro;