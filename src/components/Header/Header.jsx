import BtnCadastro from '../BtnCadastro/BtnCadastro'
import BtnLogin from '../BtnLogin/BtnLogin'
import './Header.css'


function Header() {


    return (
        <div className='container-header'>
            <div className='container-logo-nome'>
                <img src="./images/icon-caixa.svg" className='style-img' alt='Icon' />
                <h1 className='nome-projeto'>Estoque+</h1>
            </div>
            <div className='container-btns-header'>
                <BtnLogin />
                <BtnCadastro />
            </div>
        </div>
    )
}

export default Header