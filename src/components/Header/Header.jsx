import BtnCadastro from '../BtnCadastro/BtnCadastro'
import BtnLogin from '../BtnLogin/BtnLogin'
import LogoProjeto from '../LogoProjeto/LogoProjeto';
import './Header.css'
import iconBox from '/images/icon-caixa.svg';


function Header() {
    return (
        <div className='container-header'>
          <LogoProjeto />
            <div className='container-btns-header'>
                <BtnLogin />
                <BtnCadastro />
            </div>
        </div>
    )
}

export default Header