import Header from "../../components/Header/Header";
import Content from '../../components/Content/Content';
import Footer from "../../components/Footer/Footer";
import { useAuth } from "../../contexts/AuthContext";

function Home() {
    const {usuarioLogado, usuario} = useAuth();

    return (
        <>
            <Header />
            <Content />
            <Footer />
        </>
    )
}

export default Home;