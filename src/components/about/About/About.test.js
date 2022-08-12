import { render, screen } from "@testing-library/react";
import About from "./About";

describe('Testing about page', () => {
    it('tests if h4 appears', () => {
        const value = 'About';
        render(
            <About>
                <h4>{value}</h4>
            </About>
        );
        expect(screen.getByText(value)).toBeInTheDocument();
    });

    it('tests if h3 appearc', () => {
        const value = 'Technologies used:';
        render(
            <About>
                <h3>{value}</h3>
            </About>
        );
        expect(screen.getByText(value)).toBeInTheDocument();
    });

    it('tests if  paragraph appears', () => {
        const value = 'This is a project for the React.js course at Software University';
        render(
            <About>
                <p>{value}</p>
            </About>
        );
        expect(screen.getByText(value)).toBeInTheDocument();
    })
});