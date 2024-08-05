import { useState } from "react";
import { useListaParticipantes } from "../state/hooks/useListaParticipantes";
import { useResultadoSorteio } from "../state/hooks/useResultadoSorteio";

import "./Sorteio.css";

function Sorteio() {
    const participantes = useListaParticipantes();
    const [participanteDaVez, setParticipanteDaVez] = useState("");
    const [amigoSecreto, setAmigoSecreto] = useState("");
    const resultado = useResultadoSorteio();
    const sortear = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (resultado.has(participanteDaVez)) {
            setAmigoSecreto(resultado.get(participanteDaVez)!);
        }
    };
    return (
        <section>
            <form onSubmit={sortear}>
                <select
                    required
                    name="participanteDaVez"
                    id="participanteDaVez"
                    placeholder="Selecione o seu nome"
                    value={participanteDaVez}
                    onChange={(e) => setParticipanteDaVez(e.target.value)}
                >
                    <option>Selecione seu nome</option>
                    {participantes.map((participante) => (
                        <option key={participante}>{participante}</option>
                    ))}
                </select>

                <button>Sortear</button>
            </form>
            {amigoSecreto && <p role="alert">{amigoSecreto}</p>}
        </section>
    );
}

export default Sorteio;
