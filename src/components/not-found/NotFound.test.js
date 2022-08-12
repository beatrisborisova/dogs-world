import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { NotFound } from './NotFound';

describe('Testing 404 page', () => {
    it('tests if h1 appears', () => {
        const value = '404';
        render(
            <BrowserRouter>
                <NotFound>
                    <h1>{value}</h1>
                </NotFound>
            </BrowserRouter>
        );
        expect(screen.getByText(value)).toBeInTheDocument();
    });

    it('tests if  h2 appears', () => {
        const value = 'Page not found';
        render(
            <BrowserRouter>
                <NotFound>
                    <h2>{value}</h2>
                </NotFound>
            </BrowserRouter>
        );
        expect(screen.getByText(value)).toBeInTheDocument();
    });


    it('tests if  paragraph appears', () => {
        const value = 'The page you are looking for does not exist';
        render(
            <BrowserRouter>
                <NotFound>
                    <p>{value}</p>
                </NotFound>
            </BrowserRouter>
        );
        expect(screen.getByText(value)).toBeInTheDocument();
    })
});