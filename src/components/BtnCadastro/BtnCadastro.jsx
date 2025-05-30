import './BtnCadastroStyle.css';
import { useNavigate } from 'react-router'

const BtnCadastro = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("../telas/Cadastro/Cadastro")
    }

    return (
        <>
            <button onClick={handleClick} className='btn-new-user-style'>
                Criar Conta
            </button>
        </>
    )
}

export default BtnCadastro;