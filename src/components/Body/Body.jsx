import './Body.css'

function Body() {
    return (
        <div className="container-body">
            <div className='titulo-texto-imagem'>
                <div className='container-texto-btn'>
                    <h2>Sistema de gerenciamento e controle de estoque para sua empresa</h2>
                    <p>
                        Com o sistema de gereanciamento e controle de estoque <span>Estoque+</span>, você organiza e movimenta com eficiência o estoque de sua empresa. Simplifique sua gestão agora!
                    </p>
                    <button className='btn-new-user-style style-btns'>Criar Conta</button>
                </div>
                <img className='img-style' src="./images/warehouse-worker.avif" alt="" />
            </div>
        </div >
    )
}

export default Body;