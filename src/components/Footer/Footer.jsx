import './Footer.css';


const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Sobre Nós</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
                <div className="footer-section">
                    <h3>Contato</h3>
                    <p>email@exemplo.com</p>
                    <p>(00) 1234-5678</p>
                </div>
                <div className="footer-section">
                    <h3>Redes Sociais</h3>
                    <a href="#">Facebook</a>
                    <a href="#">Instagram</a>
                    <a href="#">Twitter</a>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2025 Estoque+. Todos os direitos reservados.</p>
            </div>
        </footer>
    )
}

export default Footer;