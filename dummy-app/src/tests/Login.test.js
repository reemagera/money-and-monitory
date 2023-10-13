import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../components/Login';

describe('Login Component', () => {
    it('should render without errors', () => {
        render(<Login />);
        const headingElement = screen.getByText('Login');
        const customerIdInput = screen.getByLabelText('Customer ID');
        const passwordInput = screen.getByLabelText('Password');
        const loginButton = screen.getByText('Login');
        const signUpLink = screen.getByText('Sign Up');

        expect(headingElement).toBeInTheDocument();
        expect(customerIdInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(loginButton).toBeInTheDocument();
        expect(signUpLink).toBeInTheDocument();
    });

    it('should display an error message for an invalid Customer ID', () => {
        render(<Login />);
        const loginButton = screen.getByText('Login');
        fireEvent.click(loginButton);
        const errorMessage = screen.getByText('Invalid Customer ID');

        expect(errorMessage).toBeInTheDocument();
    });

    it('should display an error message for an invalid password', () => {
        render(<Login />);
        const customerIdInput = screen.getByLabelText('Customer ID');
        const passwordInput = screen.getByLabelText('Password');
        fireEvent.change(customerIdInput, { target: { value: 'exampleUser' } });
        fireEvent.change(passwordInput, { target: { value: 'pass' } });

        const loginButton = screen.getByText('Login');
        fireEvent.click(loginButton);

        const errorMessage = screen.getByText('Invalid password (min 8 characters)');

        expect(errorMessage).toBeInTheDocument();
    });

    it('should open a snackbar with an error message', () => {
        render(<Login />);
        const loginButton = screen.getByText('Login');
        fireEvent.click(loginButton);

        // Here, you may need to include logic to handle the opening and closing of the snackbar and check its content.
    });

    // Additional test cases can be added to cover other scenarios.

    // Add tests for the actual login logic after integration and mocking of Axios.
});
