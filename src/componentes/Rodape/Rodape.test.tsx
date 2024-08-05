import { fireEvent, render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import Rodape from "./Rodape";
import { useListaParticipantes } from "../../state/hooks/useListaParticipantes";

jest.mock("../../state/hooks/useListaParticipantes", () => {
    return {
        useListaParticipantes: jest.fn(),
    };
});

const mockNavigate = jest.fn();
const mockSorteio = jest.fn();

jest.mock("../../state/hooks/useSorteador", () => {
    return {
        useSorteador: () => mockSorteio,
    };
});

jest.mock("react-router-dom", () => {
    return {
        useNavigate: () => mockNavigate,
    };
});

describe("Não há participantes suficientes", () => {
    beforeEach(() => {
        (useListaParticipantes as jest.Mock).mockReturnValue([]);
    });
    test("Deve ter pelo menos 3 participantes", () => {
        render(
            <RecoilRoot>
                <Rodape />
            </RecoilRoot>
        );

        const botao = screen.getByRole("button");
        expect(botao).toBeDisabled();
    });
});

describe("Há participantes suficientes", () => {
    beforeEach(() => {
        (useListaParticipantes as jest.Mock).mockReturnValue([
            "Ana",
            "Catarina",
            "Josefina",
        ]);
    });
    test("Deve habilitar o botão", () => {
        render(
            <RecoilRoot>
                <Rodape />
            </RecoilRoot>
        );

        const botao = screen.getByRole("button");
        expect(botao).not.toBeDisabled();
    });

    test("Deve ter iniciado corretamente a brincadeira", () => {
        render(
            <RecoilRoot>
                <Rodape />
            </RecoilRoot>
        );

        const botao = screen.getByRole("button");
        fireEvent.click(botao);

        expect(mockNavigate).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledWith("/sorteio");
        expect(mockSorteio).toHaveBeenCalledTimes(1);
    });
});
