import React from 'react';
import { render, screen } from '@testing-library/react';
import NavbarAdd from '../components/NavbarAdd';
import { MemoryRouter } from 'react-router-dom';

describe('NavbarAdd Component', () => {
    it('should render without errors', () => {
        render(
            <MemoryRouter>
                <NavbarAdd />
            </MemoryRouter>
        );
        const spend2SaveText = screen.getByText('Spend2Save');
        const loginButton = screen.getByText('Login');

        expect(spend2SaveText).toBeInTheDocument();
        expect(loginButton).toBeInTheDocument();
    });

    it('should have a responsive layout', () => {
        // Test for responsive layout based on the media query
        // You might need to adjust the screen size depending on your breakpoints
        // Use something like "@mui/system" to mock the responsive behavior
        render(
            <MemoryRouter>
                <NavbarAdd />
            </MemoryRouter>
        );

        // You can simulate a small screen and check the rendering
        // For example:
        // window.innerWidth = 500; // Set a smaller screen width
        // Then check the rendering of your component
    });

    it('should navigate to the login page when the "Login" button is clicked', () => {
        render(
            <MemoryRouter>
                <NavbarAdd />
            </MemoryRouter>
        );

        const loginButton = screen.getByText('Login');
        loginButton.click();

        // Add assertions for navigation logic here.
    });
});