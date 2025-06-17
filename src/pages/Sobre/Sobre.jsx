import { Box, Grid, Typography } from '@mui/material';
import Header from '../../components/Header/Header'
import Paper from '@mui/material/Paper';
// import img from 'images/imgTESTE.png'
import img from '../../../public/images/imgTESTE.png'

function Sobre() {

    return (
        <Box sx={{ width: '100vw', height: '100vh', backgroundColor: '#F0FAFF', gridTemplateColumns: '1fr 1fr', display: 'flex' }}>
            <Header />

            <Box sx={{ width: '35%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 3 }}>

                <Grid container spacing={10} sx={{ width: 220, display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
                    <Grid size={12}>
                        <Paper elevation={3} sx={{ borderRadius: 4, overflow: "hidden" }}>
                            <img
                                src={img}
                                alt="Avatar"
                                style={{ width: "100%", height: "300px", objectFit: "cover" }}
                            />
                        </Paper>
                    </Grid>
                    <Grid size={12}>
                        <Paper elevation={3} sx={{ borderRadius: 4, overflow: "hidden" }}>
                            <img
                                src={img}
                                alt="Avatar"
                                style={{ width: "100%", height: "300px", objectFit: "cover" }}
                            />
                        </Paper>
                    </Grid>
                </Grid>


                <Grid container spacing={10} sx={{ width: 220, display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", paddingTop: 25 }}>
                    <Grid size={12}>
                        <Paper elevation={3} sx={{ borderRadius: 4, overflow: "hidden" }}>
                            <img
                                src={img}
                                alt="Avatar"
                                style={{ width: "100%", height: "300px", objectFit: "cover" }}
                            />
                        </Paper>
                    </Grid>
                    <Grid size={12}>
                        <Paper elevation={3} sx={{ borderRadius: 4, overflow: "hidden" }}>
                            <img
                                src={img}
                                alt="Avatar"
                                style={{ width: "100%", height: "300px", objectFit: "cover" }}
                            />
                        </Paper>
                    </Grid>
                </Grid>

            </Box>

            <Box sx={{ width: '65%', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>

                <Box sx={{ gap: '30px' }}>
                    <Typography variant='h1' sx={{ color: "#004468" }}>Nossa História</Typography>
                </Box>

                <Box sx={{ width: '75%', display: 'flex', justifyContent: 'center', flexDirection: 'column', paddingTop: 2 }}>
                    <Typography variant="h5" sx={{ color: "#004468" }}>
                        Fundado em Florianópolis/SC, o Estoque+ nasceu da iniciativa de quatro estudantes do SENAI — Wallace, Ian, Lucca e Allyson — movidos pelo desejo de transformar a forma como pequenos negócios lidam com a gestão empresarial. Observando as dificuldades enfrentadas por microempreendedores em manter o controle de suas operações, os fundadores decidiram unir seus conhecimentos em tecnologia, design e negócios para criar uma solução acessível, eficiente e fácil de usar.
                            <br /><br />
                        O Estoque+ é mais do que uma simples ferramenta: é uma plataforma desenvolvida para oferecer uma gestão integrada e simplificada, permitindo que empreendedores tenham total controle sobre seu estoque, vendas e finanças. Com recursos intuitivos e informações centralizadas, a plataforma garante praticidade, organização e agilidade na tomada de decisões.
                        <br /><br />
                        Nosso compromisso é apoiar o crescimento sustentável de pequenos negócios, oferecendo tecnologia de ponta, suporte contínuo e uma experiência de uso que se adapta à realidade do empreendedor brasileiro. Acreditamos que, com as ferramentas certas, qualquer empresa pode alcançar seu máximo potencial. </Typography>
                </Box>

            </Box>
        </Box>

    )
}

export default Sobre;