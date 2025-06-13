import { Box, Avatar, Typography, TextField } from "@mui/material";
import Header from "../../components/Header/Header"

function Perfil() {


    return (
        <Box sx={{ width: '100vw', height: '100vh', backgroundColor: '#F0FAFF', gridTemplateColumns: '1fr 1fr', display: 'flex' }}>
            <Header />

            <Box sx={{ width: '28%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 3 }}>
                <Avatar sx={{ height: '350px', width: '350px', padding: '10px', fontSize: '120px', backgroundColor: '#003049'}}>I</Avatar>
                <Typography sx={{ fontSize: '45px', padding: '10px' }}>Nome da Empresa</Typography>

            </Box>

            <Box sx={{ width: '72%', display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', paddingTop: 15 , paddingLeft: 10}}>

                <Box sx={{ gap: "30px" }}>
                    <Typography variant="h2" sx={{ color: 'black' }}>Dados da Empresa</Typography>
                </Box>

                <Box sx={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                    <Typography variant="h5" sx={{paddingTop: 10}}>Nome da Empresa</Typography>
        
                    <TextField id="outlined-basic" variant="outlined"
                        slotProps={{
                            input: {
                                readOnly: true,
                            },
                        }}
                        sx={{ width: '750px'}} />

                    <Typography variant="h5" sx={{paddingTop: 8}}>Proprietário</Typography>
                    <TextField id="outlined-basic" variant="outlined"
                        slotProps={{
                            input: {
                                readOnly: true,
                            },
                        }}
                        sx={{ width: '750px' }} />

                    <Typography variant="h5" sx={{paddingTop: 8}}>Contato</Typography>
                    <TextField id="outlined-basic" variant="outlined"
                        slotProps={{
                            input: {
                                readOnly: true,
                            },
                        }}
                        sx={{ width: '750px' }} />

                    <Typography variant="h5" sx={{paddingTop: 8}}>E-mail</Typography>
                    <TextField id="outlined-basic" variant="outlined"
                        slotProps={{
                            input: {
                                readOnly: true,
                            },
                        }}
                        sx={{ width: '750px' }} />
                </Box>


            </Box>
        </Box>


    )
}

export default Perfil;