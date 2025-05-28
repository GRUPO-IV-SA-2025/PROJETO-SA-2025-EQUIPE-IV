import './Login.css';
import iconBox from '/images/icon-caixa.svg';

function TelaLogin() {
    return (
        <div className="login-container">
            
            <img src={iconBox} className='style-img' alt='Icon' />
            <h1 className='nome-projeto'>Estoque+</h1>

            <div className="login-box">
                <h2 className="login-title">Acessar sua conta</h2>

                <label className="login-label">Email ou nome de Usuário</label>
                <input
                    type="text"
                    className="login-input"
                    placeholder="Insira o nome do seu usuário ou E-mail"
                />

                <label className="login-label">Senha</label>
                <div className="password-wrapper">
                    <input
                        type="password"
                        className="login-input"
                        placeholder="Insira sua senha"
                    />
                </div>

                <a className="login-link">Esqueceu sua senha?</a>

                <button className="login-button">Entrar</button>

                <p className="signup-text">
                    Não possui conta ainda? <a href="#" className="signup-link">Cadastre-se</a>
                </p>
            </div>
        </div>
    );
}

export default TelaLogin; 
