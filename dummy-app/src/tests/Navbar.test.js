import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../components/Navbar';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const history = createMemoryHistory();

describe('Navbar Component', () => {
    it('should render without errors', () => {
        render(<Router history={history}><Navbar /></Router>);
        const logoElement = screen.getByText('Spend2Save');
        const menuButton = screen.getByRole('button', { name: 'account of current user' });
        const aboutButton = screen.getByText('About');
        const contactButton = screen.getByText('Contact');
        const loginButton = screen.getByText('Login');
        const signupButton = screen.getByText('SignUp');

        expect(logoElement).toBeInTheDocument();
        expect(menuButton).toBeInTheDocument();
        expect(aboutButton).toBeInTheDocument();
        expect(contactButton).toBeInTheDocument();
        expect(loginButton).toBeInTheDocument();
        expect(signupButton).toBeInTheDocument();
    });

    it('should open the menu when clicking the menu button', () => {
        render(<Router history={history}><Navbar /></Router>);
        const menuButton = screen.getByRole('button', { name: 'account of current user' });
        fireEvent.click(menuButton);
        const aboutMenuItem = screen.getByText('About');
        const contactMenuItem = screen.getByText('Contact');

        expect(aboutMenuItem).toBeInTheDocument();
        expect(contactMenuItem).toBeInTheDocument();
    });

    it('should navigate to the About page when About is clicked', () => {
        render(<Router history={history}><Navbar /></Router>);
        const aboutButton = screen.getByText('About');
        fireEvent.click(aboutButton);

        // Assertions for navigation to About page
        expect(history.location.pathname).toBe('/about');
    });

    it('should navigate to the Contact page when Contact is clicked', () => {
        render(<Router history={history}><Navbar /></Router>);
        const contactButton = screen.getByText('Contact');
        fireEvent.click(contactButton);

        // Assertions for navigation to Contact page
        expect(history.location.pathname).toBe('/contact');
    });

    it('should navigate to the Login page when Login is clicked', () => {
        render(<Router history={history}><Navbar /></Router>);
        const loginButton = screen.getByText('Login');
        fireEvent.click(loginButton);

        // Assertions for navigation to Login page
        expect(history.location.pathname).toBe('/login');
    });

    it('should navigate to the SignUp page when SignUp is clicked', () => {
        render(<Router history={history}><Navbar /></Router>);
        const signupButton = screen.getByText('SignUp');
        fireEvent.click(signupButton);

        // Assertions for navigation to SignUp page
        expect(history.location.pathname).toBe('/signup');
    });
});