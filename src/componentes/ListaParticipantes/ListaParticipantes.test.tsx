import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import ListaParticipante from "./ListaParticipante";
import { useListaParticipantes } from "../../state/hooks/useListaParticipantes";

jest.mock("../../state/hooks/useListaParticipantes", () => {
    return {
        useListaParticipantes: jest.fn(),
    };
});

describe("Lista vazia de Participantes", () => {
    beforeEach(() => {
        (useListaParticipantes as jest.Mock).mockReturnValue([]);
    });

    test("Deve renderizá-la", () => {
        render(
            <RecoilRoot>
                <ListaParticipante />
            </RecoilRoot>
        );

        const itens = screen.queryAllByRole("listitem");
        expect(itens).toHaveLength(0);
    });
});

describe("Lista preenchida de Participantes", () => {
    const participantes = ["Ana", "Catarina"];
    beforeEach(() => {
        (useListaParticipantes as jest.Mock).mockReturnValue(participantes);
    });
    test("Deve renderizá-la com participantes", () => {
        render(
            <RecoilRoot>
                <ListaParticipante />
            </RecoilRoot>
        );

        const itens = screen.queryAllByRole("listitem");
        expect(itens).toHaveLength(participantes.length);
    });
});
