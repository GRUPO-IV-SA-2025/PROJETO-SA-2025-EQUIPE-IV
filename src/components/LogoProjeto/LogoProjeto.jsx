import iconBox from '/images/icon-caixa.svg';
import './LogoProjeto.css';

const LogoProjeto = () => {
    return (
        <div className='container-logo-nome'>
            <img src={iconBox} className='style-img' alt='Icon' />
            <h1 className='nome-projeto'>Estoque+</h1>
        </div>

    )
}

export default LogoProjeto;