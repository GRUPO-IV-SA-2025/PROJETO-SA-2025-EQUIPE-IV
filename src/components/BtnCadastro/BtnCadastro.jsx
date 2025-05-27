import './BtnCadastroStyle.css';
import { Link } from 'react-router'

const BtnCadastro = () => {
    return (
        <>
            <button className='btn-new-user-style'>
                <Link to="telas/Cadastro/Cadastro">Criar Conta</Link>
            </button>
        </>
    )
}

export default BtnCadastro;