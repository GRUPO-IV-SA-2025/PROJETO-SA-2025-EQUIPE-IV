import { Box, Button, Stack, TextField } from '@mui/material';
import './Cadastro.css';

function TelaCadastro() {
    return (
        <Box sx={{ width: '100vw', height: '100vh', gridTemplateColumns: '1fr 1fr', display: 'flex' }}>
            <Box sx={{ width: '50%', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Stack spacing={3} sx={{ pt: '8px', width: '50%' }}>
                    <TextField label="Nome da empresa" variant="outlined" />
                    <TextField label="Nome" variant="outlined" />
                    <TextField label="Sobrenome" variant="outlined" />
                    <TextField label="CNPJ" variant="outlined" />
                    <TextField label="Número de contato" variant="outlined" />
                    <TextField label="E-mail" variant="outlined" />
                    <TextField label="Crie uma senha forte" variant="outlined" />
                    <Button>Cadastrar</Button>
                </Stack>
            </Box>
            <Box sx={{ width: '50%', backgroundColor: '#0077b6' }} />
        </Box>
    )
}

export default TelaCadastro;