import './BtnLoginStyle.css'
import { useNavigate } from 'react-router'

const BtnLogin = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/LoginUsuario");
    }

    return (
        <button onClick={handleClick} className='btn-login-style' type='button'>
            Acessar
        </button>
    );
};

export default BtnLogin;