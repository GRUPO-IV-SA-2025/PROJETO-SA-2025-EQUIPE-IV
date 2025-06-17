import { Button } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import BtnCadastro from '../BtnCadastro/BtnCadastro'
import BtnLogin from '../BtnLogin/BtnLogin'
import LogoProjeto from '../LogoProjeto/LogoProjeto';
import './Header.css'
import { useNavigate } from 'react-router';

function Header() {
    const { usuarioLogado, logOut } = useAuth();
    const navigate = useNavigate();

    const handleLogOut = () => {
        if (window.confirm('Tem certeza que deseja sair?')) {
            logOut();
            navigate('/LoginUsuario', { replace: true });
        }
    }

    return (
        <div className='container-header'>
            <LogoProjeto />
            <div className='container-btns-header'>
                {usuarioLogado ? (
                    <Button onClick={handleLogOut} variant="contained">Sair</Button>
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