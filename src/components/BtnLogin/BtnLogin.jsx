import './BtnLoginStyle.css'
import { useNavigate } from 'react-router';

const BtnLogin = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('../telas/Login/Login');
    };

    return (
        <button className='btn-login-style' onClick={handleClick}>
            Entrar
        </button>
    );
};

export default BtnLogin;