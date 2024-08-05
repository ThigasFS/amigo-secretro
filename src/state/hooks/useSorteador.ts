import { useListaParticipantes } from "./useListaParticipantes";
import { useSetRecoilState } from "recoil";
import { resultadoSorteio } from "../atom";
import { realizarSorteio } from "../helpers/realizarSorteio";

export const useSorteador = () => {
    const participantes = useListaParticipantes();

    const setResultado = useSetRecoilState(resultadoSorteio);

    return () => {
        const resultado = realizarSorteio(participantes);
        setResultado(resultado);
    };
};
