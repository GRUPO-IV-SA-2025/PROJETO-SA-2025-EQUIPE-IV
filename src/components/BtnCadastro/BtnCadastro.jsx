import './BtnCadastroStyle.css';
import { useNavigate } from 'react-router'

const BtnCadastro = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        // console.log('Button clicked'); 
        navigate("/pages/Cadastro")
    }

    return (
        <>
            <button onClick={handleClick} className='btn-new-user-style' type='button'>
                Criar Conta
            </button>
        </>
    )
}

export default BtnCadastro;