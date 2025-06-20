import * as React from 'react';
import { Button, Typography, Menu, MenuItem, IconButton, Avatar } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import BtnCadastro from '../BtnCadastro/BtnCadastro'
import BtnLogin from '../BtnLogin/BtnLogin'
import LogoProjeto from '../LogoProjeto/LogoProjeto';
import './Header.css'
import { useNavigate } from 'react-router';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';


function Header() {
    const [anchorUsuario, setAnchorUsuario] = React.useState(null)
    const [anchorEstoque, setAnchorEstoque] = React.useState(null)
    const [anchorEmpresa, setAnchorEmpresa] = React.useState(null)
    const openUsuario = Boolean(anchorUsuario)
    const openEstoque = Boolean(anchorEstoque)
    const openEmpresa = Boolean(anchorEmpresa)
    const { usuarioLogado, logOut } = useAuth();
    const navigate = useNavigate();
    const [openLogoutDialog, setOpenLogoutDialog] = React.useState(false);

    const handleLogOut = () => {
        setOpenLogoutDialog(false);
        logOut();
        window.location.reload();
    }

    const handleOpenLogOutDialog = () => {
        setOpenLogoutDialog(true);
    }

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
        navigate('/Financeiro')
    }

    const handleClickPerfil = (e) => {
        e.preventDefault();
        navigate('/Perfil')
    }

    const handleClickPaginaInicial = (e) => {
        e.preventDefault();
        navigate('/Dashboard')
    }

    const handleClickSobre = (e) => {
        e.preventDefault();
        navigate('/Sobre')
    }

    return (
        <div className='container-header'>
            <LogoProjeto />
            <div className='container-btns-header'>
                {usuarioLogado ? (
                    <>
                        <Typography onClick={handleClickPaginaInicial} sx={{
                            display: 'flex', alignItems: 'center', padding: '15px', cursor: 'pointer',
                            borderRadius: 2,
                            backgroundColor: 'white',
                            transition: 'backgroundColor 0.5s',
                            '&:hover': {
                                backgroundColor: '#1976d2', // Azul do MUI (ou outra cor)
                                transform: 'scale()',
                            }
                        }}>
                            Home
                        </Typography>
                        <Typography onClick={handleClickSobre} sx={{
                            display: 'flex', alignItems: 'center', padding: '15px', cursor: 'pointer',
                            borderRadius: 2,
                            backgroundColor: 'white',
                            transition: 'backgroundColor 0.5s',
                            '&:hover': {
                                backgroundColor: '#1976d2', // Azul do MUI (ou outra cor)
                                transform: 'scale()',
                            }
                        }}>
                            Sobre
                        </Typography>

                        <Typography
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '15px',
                                cursor: 'pointer', // Adiciona cursor de clique
                                borderRadius: 2,
                                backgroundColor: 'white',
                                transition: 'backgroundColor 0.5s',
                                '&:hover': {
                                    backgroundColor: '#1976d2', // Azul do MUI (ou outra cor)
                                    transform: 'scale()',
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
                            onClose={handleCloseEstoque}
                            autoFocus={false}
                            Paper={{
                                sx: {
                                    borderRadius: 2, // bordas arredondadas
                                    backgroundColor: "#fdf8f8", // cor clara como na imagem
                                    padding: 1,
                                }
                            }}
                        >
                            <MenuItem
                            // onClick={() => handleCloseEstoque('/estoque')}
                            >
                                Estoque
                            </MenuItem>
                            <MenuItem
                            // onClick={() => handleCloseEstoque('/produtos')}
                            >
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
                            autoFocus={false}
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


                        <IconButton onClick={handleClickUsuario} sx={{ paddingLeft: '5' }}>
                            <Avatar sx={{ backgroundColor: '#1976d2' }}>
                                {/* {(perfil?.nome ? perfil.nome[0].toUpperCase() : 'U')} */}
                            </Avatar>
                        </IconButton>

                        <Menu
                            anchorEl={anchorUsuario}
                            open={openUsuario}
                            onClose={handleCloseUsuario}
                        >
                            <MenuItem onClick={handleClickPerfil}>
                                <Avatar sx={{ width: 24, height: 24, mr: 1, backgroundColor: '#1976d2' }} />
                                Minha conta
                            </MenuItem>

                            <MenuItem
                                sx={{ alignItems: 'center', justifyContent: 'center' }}
                                onClick={() => { handleCloseUsuario(); handleOpenLogOutDialog(); }}
                            >
                                Sair
                            </MenuItem>
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
            {/* Dialog de confirmação de logout */}
            <Dialog
                open={openLogoutDialog}
                onClose={() => setOpenLogoutDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                slotProps={{
                    sx: {
                        borderRadius: 3,
                        padding: 2,
                        minWidth: '400px'
                    }
                }}
            >
                <DialogTitle id="alert-dialog-title" sx={{ fontWeight: 'bold' }}>
                    Confirmar saída
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Tem certeza que deseja sair da sua conta?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setOpenLogoutDialog(false)}
                        variant="outlined"
                        sx={{ borderRadius: 2 }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleLogOut}
                        color="error"
                        variant="contained"
                        autoFocus
                        sx={{ borderRadius: 2 }}
                    >
                        Sair
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Header;