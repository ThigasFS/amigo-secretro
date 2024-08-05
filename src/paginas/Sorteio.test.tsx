import { fireEvent, render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { useListaParticipantes } from "../state/hooks/useListaParticipantes";
import Sorteio from "./Sorteio";
import { useResultadoSorteio } from "../state/hooks/useResultadoSorteio";

jest.mock("../state/hooks/useListaParticipantes", () => {
    return {
        useListaParticipantes: jest.fn(),
    };
});

jest.mock("../state/hooks/useResultadoSorteio", () => {
    return {
        useResultadoSorteio: jest.fn(),
    };
});

describe("Página de Sorteio", () => {
    const participantes = ["Ana", "Catarina", "Jorel"];

    const resultado = new Map([
        ["Ana", "Jorel"],
        ["Catarina", "Ana"],
        ["Jorel", "Catarina"],
    ]);
    beforeEach(() => {
        (useListaParticipantes as jest.Mock).mockReturnValue(participantes);
        (useResultadoSorteio as jest.Mock).mockReturnValue(resultado);
    });
    test("Deve exibir o amigo secreto", () => {
        render(
            <RecoilRoot>
                <Sorteio />
            </RecoilRoot>
        );

        const opcoes = screen.queryAllByRole("option");
        expect(opcoes).toHaveLength(participantes.length + 1);
    });

    test("Deve exibir o amigo secreto quando solicitado", () => {
        render(
            <RecoilRoot>
                <Sorteio />
            </RecoilRoot>
        );

        const select = screen.getByPlaceholderText("Selecione o seu nome");

        fireEvent.change(select, {
            target: {
                value: participantes[0],
            },
        });

        const botao = screen.getByRole("button");

        fireEvent.click(botao);

        const amigoSecreto = screen.getByRole("alert");

        expect(amigoSecreto).toBeInTheDocument();
    });
});
