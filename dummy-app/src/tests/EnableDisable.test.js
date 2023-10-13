import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EnableDisable from '../components/EnableDisable';

describe('EnableDisable Component', () => {
    it('should render without errors', () => {
        render(<EnableDisable />);
        const enableDisableElement = screen.getByText('Block/Unblock');
        expect(enableDisableElement).toBeInTheDocument();
    });

    it('should display an error for empty Instant Account Number', () => {
        render(<EnableDisable />);
        const submitButton = screen.getByText('Submit');
        fireEvent.click(submitButton); // Click Submit without entering anything

        const errorText = screen.getByText('Instant Account Number is required');
        expect(errorText).toBeInTheDocument();
    });

    it('should display an error for invalid Instant Account Number format', () => {
        render(<EnableDisable />);
        const accountNumberInput = screen.getByLabelText('CustomerID');
        fireEvent.change(accountNumberInput, { target: { value: 'abc123' } }); // Invalid format

        const submitButton = screen.getByText('Submit');
        fireEvent.click(submitButton);

        const errorText = screen.getByText('Invalid format, should contain only digits');
        expect(errorText).toBeInTheDocument();
    });

    it('should display an error for Instant Account Number length', () => {
        render(<EnableDisable />);
        const accountNumberInput = screen.getByLabelText('CustomerID');
        fireEvent.change(accountNumberInput, { target: { value: '12345' } }); // Invalid length

        const submitButton = screen.getByText('Submit');
        fireEvent.click(submitButton);

        const errorText = screen.getByText('Instant Account Number must be 6 digits only');
        expect(errorText).toBeInTheDocument();
    });

    it('should display an error for empty PIN', () => {
        render(<EnableDisable />);
        const pinInput = screen.getByLabelText('PIN');
        fireEvent.change(pinInput, { target: { value: '' } }); // Empty PIN

        const submitButton = screen.getByText('Submit');
        fireEvent.click(submitButton);

        const errorText = screen.getByText('Pin is required');
        expect(errorText).toBeInTheDocument();
    });

    it('should successfully submit the form when all fields are filled correctly', () => {
        render(<EnableDisable />);
        const accountNumberInput = screen.getByLabelText('CustomerID');
        const pinInput = screen.getByLabelText('PIN');
        const submitButton = screen.getByText('Submit');

        // Fill the form with valid values
        fireEvent.change(accountNumberInput, { target: { value: '123456' } });
        fireEvent.change(pinInput, { target: { value: 'password' } });

        fireEvent.click(submitButton);

        // Add assertions to check if the form is submitted successfully.
    });
});