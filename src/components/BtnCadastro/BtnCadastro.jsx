import './BtnCadastroStyle.css';
import { useNavigate } from 'react-router';

const BtnCadastro = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('../telas/Cadastro/Cadastro');
    };

    return (
        <button className='btn-new-user-style' onClick={handleClick}>
            Cadastrar
        </button>
    );
};

export default BtnCadastro;