import './Login.css';
import iconBox from '/images/icon-caixa.svg';
import { useNavigate } from 'react-router';
import LogoProjeto from '../../components/LogoProjeto/LogoProjeto'


function TelaLogin() {
    const navigate = useNavigate();

    const handleCadastroClick = (e) => {
        e.preventDefault();
        navigate('../telas/Cadastro/Cadastro');
    };

    const handleEntrarClick = (e) => {
        e.preventDefault();
        setUsuarioLogado(true);
        navigate('/')
    }

    return (
        <div className="login-container">

            <LogoProjeto />
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

                <button className="login-button" onClick={handleEntrarClick}>Entrar</button>

                <p className="signup-text">
                    Não possui conta ainda?{' '}
                    <a className="signup-link" onClick={handleCadastroClick}>
                        Cadastre-se
                    </a>
                </p>
            </div>
        </div>
    );
}

export default TelaLogin; 
