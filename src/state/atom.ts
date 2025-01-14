import { atom } from "recoil";

export const listaParticipantesState = atom<string[]>({
    key: "listaParticipantesState",
    default: [],
});

export const erroState = atom<string>({
    key: "erroState",
    default: "",
});

export const resultadoSorteio = atom<Map<string, string>>({
    key: "resultadoSorteio",
    default: new Map(),
});
