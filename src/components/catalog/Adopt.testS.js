import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Adopt } from "./Adopt";
import { store } from '../../index';

describe('Testing Adopt component', () => {
    it('tests title appears', () => {
        const value = 'Adopt a dog'
        render(
            <BrowserRouter>
                <Provider store={store}>
                    < Adopt >
                        <h1>{value}</h1>
                    </Adopt >
                </Provider>
            </BrowserRouter>
        );
        expect(screen.getByText(value)).toBeInTheDocument();
    });

    it('tests if search button appears with correct text', () => {
        const value = 'All is paw-sible when you rescue a dog.';
        const subtitle = screen.getByText(value);

        render(
            <BrowserRouter>
                <Provider store={store}>
                    <Adopt>
                        <p>{subtitle}</p>
                    </Adopt>
                </Provider>
            </BrowserRouter>
        );
        expect(subtitle).toBeInTheDocument();
    });

})