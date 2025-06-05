import './Login.css';
// import iconBox from '/images/icon-caixa.svg';
import { Link, useNavigate } from 'react-router';
import LogoProjeto from '../../components/LogoProjeto/LogoProjeto'
import { useState } from 'react';


function TelaLogin() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        usuarioEmail: '',
        senha: ''
    });

    const [errors, setErrors] = useState({
        usuarioEmail: false,
        senha: false
    });

    const [mostrarSenha, setMostrarSenha] = useState(false);

    const alteraVisibilidadeSenha = () => {
        setMostrarSenha(!mostrarSenha); //alterna entre visivel e oculto
    }

    // const handleCadastroClick = (e) => {
    //     // e.preventDefault();
    //     console.log('Button clicked');
    //     navigate('/telas/Cadastro/Cadastro');
    // };

    const handleEntrarClick = (e) => {
        e.preventDefault();
        // setUsuarioLogado(true);
        // navigate('/')

        // Validação simples dos campos
        const novosErros = {
            usuarioEmail: formData.usuarioEmail.trim() === '',
            senha: formData.senha.trim() === ''
        };

        setErrors(novosErros);

        // Se tiver erro, não continua
        if (novosErros.usuarioEmail || novosErros.senha) {
            return;
        }

        // Se passou na validação
        // Aqui você pode colocar a lógica real de login
        alert('Login realizado com sucesso!');
        navigate('/');
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (value.trim() !== '') {
            setErrors(prev => ({ ...prev, [name]: false }));
        }
    };

    return (
        <div className="login-container">

            <LogoProjeto />
            <div className="login-box">
                <h2 className="login-title">Acessar sua conta</h2>

                <label className="login-label">Email ou nome de Usuário</label>
                <input
                    type="text"
                    name='usuarioEmail'
                    className={`login-input ${errors.usuarioEmail ? 'input-error' : ''}`}
                    placeholder="Insira o nome do seu usuário ou E-mail"
                    value={formData.usuarioEmail}
                    onChange={handleChange}
                />
                {errors.usuarioEmail && <span className='error-text'>Campo obrigatório</span>}

                <label className="login-label">Senha</label>
                <div className="password-wrapper">
                    <input
                        // type="password"
                        type={mostrarSenha ? "text" : "password"}
                        name='senha'
                        className={`login-input ${errors.senha ? 'input-error' : ''}`}
                        placeholder="Insira sua senha"
                        value={formData.senha}
                        onChange={handleChange}
                    />
                    <button type='button' onClick={alteraVisibilidadeSenha} className='show-password-btn'>
                        {mostrarSenha ? 'Ocultar' : 'Mostrar'}
                    </button>
                </div>
                {errors.senha && <span className='error-text'>Campo obrigatório</span>}

                <a className="login-link">Esqueceu sua senha?</a>

                <button className="login-button" onClick={handleEntrarClick}>Entrar</button>

                <p className="signup-text">
                    Não possui conta ainda?{' '}
                    <Link
                        to="/telas/Cadastro/Cadastro"
                        className="signup-link" >
                        Cadastre-se
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default TelaLogin; 
