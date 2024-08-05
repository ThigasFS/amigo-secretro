import { act, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import Formulario from "./Formulario";
import { RecoilRoot } from "recoil";

describe("Comportamento do Formulário", () => {
    test("Deve não adicionar participantes com input vazio", () => {
        render(
            <RecoilRoot>
                <Formulario />
            </RecoilRoot>
        );
        const input = screen.getByPlaceholderText(
            "Insira os nomes dos participantes"
        );
        const botao = screen.getByRole("button");

        expect(input).toBeInTheDocument();
        expect(botao).toBeDisabled();
    });

    test("Deve adicionar o participante quando input estiver preenchido", () => {
        render(
            <RecoilRoot>
                <Formulario />
            </RecoilRoot>
        );
        const input = screen.getByPlaceholderText(
            "Insira os nomes dos participantes"
        );
        const botao = screen.getByRole("button");

        fireEvent.change(input, {
            target: {
                value: "Ana Catarina",
            },
        });

        fireEvent.click(botao);

        expect(input).toHaveFocus();
        expect(input).toHaveValue("");
    });

    test("nomes duplicados não podem ser adicionados na lista", () => {
        render(
            <RecoilRoot>
                <Formulario />
            </RecoilRoot>
        );
        const input = screen.getByPlaceholderText(
            "Insira os nomes dos participantes"
        );
        const botao = screen.getByRole("button");
        fireEvent.change(input, {
            target: {
                value: "Ana Catarina",
            },
        });
        fireEvent.click(botao);
        fireEvent.change(input, {
            target: {
                value: "Ana Catarina",
            },
        });
        fireEvent.click(botao);

        const mensagemDeErro = screen.getByRole("alert");

        expect(mensagemDeErro.textContent).toBe(
            "Nomes duplicados não são permitidos"
        );
    });

    test("Deve desaparecer a mensagem depois de 5 segundos", () => {
        jest.useFakeTimers();
        render(
            <RecoilRoot>
                <Formulario />
            </RecoilRoot>
        );
        const input = screen.getByPlaceholderText(
            "Insira os nomes dos participantes"
        );
        const botao = screen.getByRole("button");
        fireEvent.change(input, {
            target: {
                value: "Ana Catarina",
            },
        });
        fireEvent.click(botao);
        fireEvent.change(input, {
            target: {
                value: "Ana Catarina",
            },
        });
        fireEvent.click(botao);
        let mensagemDeErro = screen.queryByRole("alert");
        expect(mensagemDeErro).toBeInTheDocument();

        act(() => {
            jest.runAllTimers();
        });

        mensagemDeErro = screen.queryByRole("alert");
        expect(mensagemDeErro).toBeNull();
    });
});
