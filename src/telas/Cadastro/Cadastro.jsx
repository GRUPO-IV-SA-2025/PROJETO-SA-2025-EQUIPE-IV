import { Box, Button, Stack, TextField } from '@mui/material';
import './Cadastro.css';
import LogoProjeto from '../../components/LogoProjeto/LogoProjeto';
import imgWorker from '/images/Checking boxes-amico.svg';

function TelaCadastro() {

    return (
        <Box sx={{ width: '100vw', height: '100vh', gridTemplateColumns: '1fr 1fr', display: 'flex' }}>
            <Box sx={{ width: '50%', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Stack spacing={3} sx={{ width: '50%', alignItems: 'center' }}>
                    <LogoProjeto />
                    <Stack spacing={3} sx={{ width: '100%' }}>
                        <TextField fullWidth label="Nome da empresa" variant="outlined" />
                        <TextField fullWidth label="Nome" variant="outlined" />
                        <TextField fullWidth label="Sobrenome" variant="outlined" />
                        <TextField fullWidth label="CNPJ" variant="outlined" />
                        <TextField fullWidth label="Número de contato" variant="outlined" />
                        <TextField fullWidth label="E-mail" variant="outlined" />
                        <TextField fullWidth label="Crie uma senha forte" variant="outlined" />
                        <Button variant='contained' size='large'>Cadastrar</Button>
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