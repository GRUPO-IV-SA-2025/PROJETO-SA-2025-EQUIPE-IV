import { Box, Card, CardContent, Typography } from '@mui/material';
import BtnCadastro from '../BtnCadastro/BtnCadastro';
import './HomeContent.css'
import img from '/src/images/warehouse-worker.avif';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import imgEstoque from '../../images/mulher-de-tiro-medio-com-tablet.jpg'
import imgRelatorio from '../../images/close-up-homem-de-negocios-escrevendo-um-resumo.jpg'
import imgFluxoCaixa from '../../images/documento-de-remessa-pagina-inicial-da-conexao-laptop.jpg'

function HomeContent() {

    return (
        <div className="container-body">
            <div className='titulo-texto-imagem'>
                <div className='container-texto-btn'>
                    <h2>Sistema de gerenciamento e controle de estoque para sua empresa</h2>
                    <p>
                        Com o sistema de gerenciamento e controle de estoque
                        <span> Estoque+ </span>
                        você organiza e movimenta com eficiência o estoque de sua empresa.
                        Simplifique sua gestão agora!
                    </p>
                    <BtnCadastro />
                </div>
                <img className='img-style' src={img} alt="" />
            </div>

            <Box sx={{ width: '70%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '40px', gap: '24px' }}>
                <p>Serviços que nosso software oferece:</p>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '48px', padding: '18px' }}>
                    
                    <Card sx={{
                        position: 'relative', width: '100%', maxWidth: 345,
                        transition: 'filter 0.3s ease',
                        '&:hover .img-blur': {
                            filter: 'blur(2px) brightness(0.7)',
                        },
                    }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="280"
                                image={imgEstoque}
                                className="img-blur"
                            // alt="green iguana"
                            />

                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    textAlign: 'center',
                                    textShadow: '2px 2px 4px rgba(0,0,0,0.6)', // sombra para melhor contraste
                                    zIndex: 1,
                                    width: '100%',
                                    px: 2,
                                }}
                            >
                                <Typography variant="h5"
                                sx={{
                                    color: 'white',
                                    fontWeight: 'bold',
                                    lineHeight: 1.3,
                                    fontSize: '46px',
                                    
                                }}
                                >
                                    Controle de Estoque
                                </Typography>
                            </Box>
                        </CardActionArea>
                    </Card>
                    <Card sx={{
                        position: 'relative', width: '100%', maxWidth: 345,
                        transition: 'filter 0.3s ease',
                        '&:hover .img-blur': {
                            filter: 'blur(2px) brightness(0.7)',
                        },
                    }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="280"
                                image={imgRelatorio}
                                className="img-blur"
                            // alt="green iguana"
                            />

                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    textAlign: 'center',
                                    textShadow: '2px 2px 4px rgba(0,0,0,0.6)', // sombra para melhor contraste
                                    zIndex: 1,
                                    width: '100%',
                                    px: 2,
                                }}
                            >
                                <Typography variant="h5"
                                sx={{
                                    color: 'white',
                                    fontWeight: 'bold',
                                    lineHeight: 1.3,
                                    fontSize: '46px',
                                    
                                }}
                                >
                                    Relatórios
                                </Typography>
                            </Box>
                        </CardActionArea>
                    </Card>
                    <Card sx={{
                        position: 'relative', width: '100%', maxWidth: 345,
                        transition: 'filter 0.3s ease',
                        '&:hover .img-blur': {
                            filter: 'blur(2px) brightness(0.7)',
                        },
                    }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="280"
                                image={imgFluxoCaixa}
                                className="img-blur"
                            // alt="green iguana"
                            />

                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    textAlign: 'center',
                                    textShadow: '2px 2px 4px rgba(0,0,0,0.6)', // sombra para melhor contraste
                                    zIndex: 1,
                                    width: '100%',
                                    px: 2,
                                }}
                            >
                                <Typography variant="h5"
                                sx={{
                                    color: 'white',
                                    fontWeight: 'bold',
                                    lineHeight: 1.3,
                                    fontSize: '46px',
                                    
                                }}
                                >
                                    Fluxo de Caixa
                                </Typography>
                            </Box>
                        </CardActionArea>
                    </Card>
                </Box>
            </Box>
        </div >
    )
}

export default HomeContent;