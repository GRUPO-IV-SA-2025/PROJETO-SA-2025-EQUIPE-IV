import './Header.css'


function Header() {
    return (
        <div className='container-header'>
            <div className='container-logo-nome'>
                <img src="./images/icon-caixa.svg" className='style-img' alt='Icon' />
                <h1 className='nome-projeto'>Estoque+</h1>
            </div>
            <div className='container-btns-header'>
                <button className='btn-login-style style-btns'>Acessar</button>
                <button className='btn-new-user-style style-btns'>Criar Conta</button>
            </div>
        </div>
    )
}

export default Header