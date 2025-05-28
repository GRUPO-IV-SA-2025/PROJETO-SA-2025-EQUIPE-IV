import './BtnLoginStyle.css'
import { useNavigate } from 'react-router'

const BtnLogin = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("../telas/Login/Login")
    }

    return (
        <button onClick={handleClick} className='btn-login-style'>
            Acessar
        </button>
    );
};

export default BtnLogin;