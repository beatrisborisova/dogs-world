import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Main } from "./Main";

describe('Testing main page', () => {
    it('tests if search input appears', () => {
        render(
            <BrowserRouter>
                <Main />
            </BrowserRouter>
        );
        const searchInput = screen.getByPlaceholderText(/Search by breed.../i).value;
        expect(searchInput).toBe("");
    });

    it('tests if search button appears with correct text', () => {
        render(
            <BrowserRouter>
                <Main />
            </BrowserRouter>
        );
        const searchBtn = screen.getByRole('button').textContent;
        expect(searchBtn).toBe("Search")
    });

})