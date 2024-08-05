import Card from "../componentes/Card";
import Formulario from "../componentes/Formulario/Formulario";
import ListaParticipante from "../componentes/ListaParticipantes/ListaParticipante";
import Rodape from "../componentes/Rodape/Rodape";

const Config = () => {
    return (
        <Card>
            <section>
                <h2>Vamos começar!</h2>
                <Formulario />
                <ListaParticipante />
                <Rodape />
            </section>
        </Card>
    );
};

export default Config;
