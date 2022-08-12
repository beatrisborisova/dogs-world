import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Home } from "./Home";

describe('Testing home page', () => {
    it('tests if title appears', () => {
        const value = 'Welcome to DogLand';
        render(
            <BrowserRouter>
                <Home>
                    <h1>{value}</h1>
                </Home>
            </BrowserRouter>
        );
        expect(screen.getByText(value)).toBeInTheDocument();
    });

    it('tests if explore button appears', () => {
        const value = 'EXPLORE';
        render(
            <BrowserRouter>
                <Home>
                    <button>{value}</button>
                </Home>
            </BrowserRouter>
        );
        expect(screen.getByText(value)).toBeInTheDocument();
    })
});