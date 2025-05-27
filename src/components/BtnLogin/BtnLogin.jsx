import './BtnLoginStyle.css'
import { Link } from 'react-router'

const BtnLogin = () => {

    return (
        <button className='btn-login-style'>
            <Link to="/telas/Login/Login">Acessar</Link>
        </button>
    )
}

export default BtnLogin;