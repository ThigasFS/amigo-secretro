import { realizarSorteio } from "./realizarSorteio";

describe("Sorteio de Amigo Secreto", () => {
    test("Deve sortear alguém além de si mesmo", () => {
        const participantes = [
            "Ana",
            "Catarina",
            "Juliana",
            "João",
            "Vinicios",
            "Nathália",
        ];

        const sorteio = realizarSorteio(participantes);
        participantes.forEach((participante) => {
            const amigoSecreto = sorteio.get(participante);
            expect(amigoSecreto).not.toEqual(participante);
        });
    });
});
