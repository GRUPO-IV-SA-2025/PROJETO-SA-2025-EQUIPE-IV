import * as React from 'react';
import { Button, Typography, Menu, MenuItem, Tooltip, IconButton, Avatar } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import BtnCadastro from '../BtnCadastro/BtnCadastro'
import BtnLogin from '../BtnLogin/BtnLogin'
import LogoProjeto from '../LogoProjeto/LogoProjeto';
import './Header.css'
import { useNavigate } from 'react-router';
// import Button from '@mui/material/Button';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';



function Header() {
    const { usuarioLogado, logOut } = useAuth();
    const navigate = useNavigate();

    const handleLogOut = () => {
        if (window.confirm('Tem certeza que deseja sair?')) {
            logOut();
            navigate('/');
        }
    }

    const [anchorUsuario, setAnchorUsuario] = React.useState(null)
    const [anchorEstoque, setAnchorEstoque] = React.useState(null)
    const [anchorEmpresa, setAnchorEmpresa] = React.useState(null)
    const openUsuario = Boolean(anchorUsuario)
    const openEstoque = Boolean(anchorEstoque)
    const openEmpresa = Boolean(anchorEmpresa)


    const handleClickEstoque = (e) => {
        setAnchorEstoque(e.currentTarget)
    }
    const handleCloseEstoque = () => {
        setAnchorEstoque(null)
    }

    const handleClickEmpresa = (e) => {
        setAnchorEmpresa(e.currentTarget)
    }
    const handleCloseEmpresa = (e) => {
        setAnchorEmpresa(null)
    }

    const handleClickUsuario = (e) => {
        setAnchorUsuario(e.currentTarget)
    }
    const handleCloseUsuario = () => {
        setAnchorUsuario(null)
    }


    const handleFinanceiroClick = (e) => {
        e.preventDefault();
        navigate('/pages/Financeiro')
    }

    const handleClickPerfil = (e) => {
        e.preventDefault();
        navigate('/pages/Perfil')
    }


    return (
        <div className='container-header'>
            <LogoProjeto />
            <div className='container-btns-header'>
                {usuarioLogado ? (
                    // <div className='teste'>
                    <>
                        <Typography sx={{ display: 'flex', alignItems: 'center', padding: '15px' }}>Home</Typography>
                        <Typography sx={{ display: 'flex', alignItems: 'center', padding: '15px' }}>Sobre</Typography>

                        <Typography
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '15px',
                                cursor: 'pointer', // Adiciona cursor de clique
                                borderRadius: 2,
                                '&:hover': {
                                    backgroundColor: '#1976d2', // Azul do MUI (ou outra cor)
                                }
                            }}
                            onClick={handleClickEstoque}
                        >
                            Estoque
                            <KeyboardArrowDownIcon fontSize="small" sx={{ ml: 0.5 }} /> {/* Ícone alinhado */}
                        </Typography>

                        <Menu
                            anchorEl={anchorEstoque}
                            open={openEstoque}
                            onClose={() => handleCloseEstoque()}
                            Paper={{
                                sx: {
                                    borderRadius: 2, // bordas arredondadas
                                    backgroundColor: "#fdf8f8", // cor clara como na imagem
                                    padding: 1,
                                }
                            }}
                        >
                            <MenuItem onClick={() => handleCloseEstoque('/estoque')}>
                                Estoque
                            </MenuItem>
                            <MenuItem onClick={() => handleCloseEstoque('/produtos')}>
                                Produtos
                            </MenuItem>

                        </Menu>

                        <Typography
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '15px',
                                cursor: 'pointer', // Adiciona cursor de clique
                                borderRadius: 2,
                                '&:hover': {
                                    backgroundColor: '#1976d2', // Azul do MUI (ou outra cor)
                                }
                            }}
                            onClick={handleClickEmpresa}
                        >
                            Empresa
                            <KeyboardArrowDownIcon fontSize="small" sx={{ ml: 0.5 }} /> {/* Ícone alinhado */}
                        </Typography>

                        <Menu
                            anchorEl={anchorEmpresa}
                            open={openEmpresa}
                            onClose={() => handleCloseEmpresa()}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                            Paper={{
                                sx: {
                                    borderRadius: 2, // bordas arredondadas
                                    backgroundColor: "#fdf8f8", // cor clara como na imagem
                                    padding: 1,
                                }
                            }}
                        >
                            <MenuItem
                                onClick={handleFinanceiroClick}
                            >
                                Financeiro
                            </MenuItem>
                        </Menu>


                        <IconButton onClick={handleClickUsuario}>
                            <Avatar sx={{ backgroundColor: '#1976d2' }}>I</Avatar>
                        </IconButton>

                        <Menu
                            anchorEl={anchorUsuario}
                            open={openUsuario}
                            onClose={handleCloseUsuario}
                        >
                            <MenuItem onClick={handleClickPerfil}>
                                <Avatar sx={{ width: 24, height: 24, mr: 1 }} /> 
                                My account
                            </MenuItem>

                            <MenuItem onClick={() => { handleCloseUsuario(); handleLogOut(); }}>Sair</MenuItem>
                        </Menu>
                    </>
                    // </div>
                ) : (
                    <>
                        <BtnLogin />
                        <BtnCadastro />
                    </>
                )}
            </div>
        </div>
    )
}

export default Header;