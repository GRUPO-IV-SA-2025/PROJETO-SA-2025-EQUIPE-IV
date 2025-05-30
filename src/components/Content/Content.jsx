import { Box, Card, CardContent } from '@mui/material';
import BtnCadastro from '../BtnCadastro/BtnCadastro';
import './Content.css'
import img from '/images/warehouse-worker.avif';

function Body() {
    return (
        <div className="container-body">
            <div className='titulo-texto-imagem'>
                <div className='container-texto-btn'>
                    <h2>Sistema de gerenciamento e controle de estoque para sua empresa</h2>
                    <p>
                        Com o sistema de gerenciamento e controle de estoque <span>Estoque+</span>, você organiza e movimenta com eficiência o estoque de sua empresa. Simplifique sua gestão agora!
                    </p>
                    <BtnCadastro />
                </div>
                <img className='img-style' src={img} alt="" />
            </div>
            <Box sx={{width: '70%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '40px', gap: '24px'}}>
                <p>Serviços que nosso software oferece:</p>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '48px' }}>
                    <Card sx={{ height: '280px', width: '250px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <CardContent>
                            Item 1
                        </CardContent>
                    </Card>
                    <Card sx={{ height: '280px', width: '250px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <CardContent>
                            Item 2
                        </CardContent>
                    </Card>
                    <Card sx={{ height: '280px', width: '250px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <CardContent>
                            Item 3
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </div >
    )
}

export default Body;