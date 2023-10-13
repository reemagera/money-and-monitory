import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Redeem from '../components/Redeem';

test('Renders the Redeem component', () => {
    render(<Redeem />);

    // Ensure important elements are rendered
    expect(screen.getByText('Redeem savings')).toBeInTheDocument();
    expect(screen.getByText('Amount')).toBeInTheDocument();
    expect(screen.getByText('PIN')).toBeInTheDocument();
    expect(screen.getByText('Redeem')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('View Balance')).toBeInTheDocument();
});

test('Validates form input with insufficient balance', () => {
    render(<Redeem />);

    // Get input fields
    const amountInput = screen.getByLabelText('Amount');
    const pinInput = screen.getByLabelText('PIN');

    // Simulate user input with insufficient balance
    fireEvent.change(amountInput, { target: { value: '50' } });
    fireEvent.change(pinInput, { target: { value: '1234' } });

    // Submit form
    fireEvent.click(screen.getByText('Redeem'));

    // Check if the insufficient balance error message is displayed
    expect(screen.getByText('Insufficient balance to perform redemption')).toBeInTheDocument();
});

test('Validates form input with missing PIN', () => {
    render(<Redeem />);

    // Get input fields
    const amountInput = screen.getByLabelText('Amount');

    // Simulate user input with missing PIN
    fireEvent.change(amountInput, { target: { value: '10' } });

    // Submit form
    fireEvent.click(screen.getByText('Redeem'));

    // Check if the missing PIN error message is displayed
    expect(screen.getByText('PIN is required')).toBeInTheDocument();
});

test('Submits valid form and shows success message', () => {
    render(<Redeem />);

    // Get input fields
    const amountInput = screen.getByLabelText('Amount');
    const pinInput = screen.getByLabelText('PIN');

    // Simulate user input with valid data
    fireEvent.change(amountInput, { target: { value: '10' } });
    fireEvent.change(pinInput, { target: { value: '1234' } });

    // Submit form
    fireEvent.click(screen.getByText('Redeem'));

    // Check if the success message is displayed
    expect(screen.getByText('Redemption successful')).toBeInTheDocument();
});

test('Clicking the View Balance button triggers the correct action', () => {
    const mockHandleBalance = jest.fn();
    render(<Redeem onHandleBalance={mockHandleBalance} />);

    // Simulate clicking the View Balance button
    fireEvent.click(screen.getByText('View Balance'));

    // Check if the mock function is called
    expect(mockHandleBalance).toHaveBeenCalled();
});

test('Validates form input with invalid PIN', () => {
    render(<Redeem />);

    // Get input fields
    const amountInput = screen.getByLabelText('Amount');
    const pinInput = screen.getByLabelText('PIN');

    // Simulate user input with invalid PIN (e.g., less than 4 digits)
    fireEvent.change(amountInput, { target: { value: '10' } });
    fireEvent.change(pinInput, { target: { value: '123' } });

    // Submit form
    fireEvent.click(screen.getByText('Redeem'));

    // Check if the invalid PIN error message is displayed
    expect(screen.getByText('Invalid PIN (4 digits required)')).toBeInTheDocument();
});

test('Resets the form after successful redemption', () => {
    render(<Redeem />);

    // Get input fields
    const amountInput = screen.getByLabelText('Amount');
    const pinInput = screen.getByLabelText('PIN');

    // Simulate user input with valid data
    fireEvent.change(amountInput, { target: { value: '10' } });
    fireEvent.change(pinInput, { target: { value: '1234' } });

    // Submit form
    fireEvent.click(screen.getByText('Redeem'));

    // Check if the form is reset (inputs are cleared)
    expect(amountInput).toHaveValue('');
    expect(pinInput).toHaveValue('');
});

test('Shows error message for negative redemption amount', () => {
    render(<Redeem />);

    // Get input fields
    const amountInput = screen.getByLabelText('Amount');
    const pinInput = screen.getByLabelText('PIN');

    // Simulate user input with negative redemption amount
    fireEvent.change(amountInput, { target: { value: '-10' } });
    fireEvent.change(pinInput, { target: { value: '1234' } });

    // Submit form
    fireEvent.click(screen.getByText('Redeem'));

    // Check if the error message for negative amount is displayed
    expect(screen.getByText('Invalid amount (must be positive)')).toBeInTheDocument();
});

test('Displays confirmation dialog before redemption', () => {
    render(<Redeem />);

    // Get input fields
    const amountInput = screen.getByLabelText('Amount');
    const pinInput = screen.getByLabelText('PIN');

    // Simulate user input with valid data
    fireEvent.change(amountInput, { target: { value: '10' } });
    fireEvent.change(pinInput, { target: { value: '1234' } });

    // Submit form
    fireEvent.click(screen.getByText('Redeem'));

    // Check if the confirmation dialog is displayed
    expect(screen.getByText('Confirm Redemption')).toBeInTheDocument();
    expect(screen.getByText('Amount: $10')).toBeInTheDocument();
    expect(screen.getByText('PIN: 1234')).toBeInTheDocument();
});

test('Closes confirmation dialog on "Cancel" click', () => {
    render(<Redeem />);

    // Get input fields
    const amountInput = screen.getByLabelText('Amount');
    const pinInput = screen.getByLabelText('PIN');

    // Simulate user input with valid data
    fireEvent.change(amountInput, { target: { value: '10' } });
    fireEvent.change(pinInput, { target: { value: '1234' } });

    // Submit form
    fireEvent.click(screen.getByText('Redeem'));

    // Simulate clicking the "Cancel" button in the confirmation dialog
    fireEvent.click(screen.getByText('Cancel'));

    // Check if the confirmation dialog is closed
    expect(screen.queryByText('Confirm Redemption')).toBeNull();
});

test('Proceeds with redemption on "Confirm" click', () => {
    render(<Redeem />);

    // Get input fields
    const amountInput = screen.getByLabelText('Amount');
    const pinInput = screen.getByLabelText('PIN');

    // Simulate user input with valid data
    fireEvent.change(amountInput, { target: { value: '10' } });
    fireEvent.change(pinInput, { target: { value: '1234' } });

    // Submit form
    fireEvent.click(screen.getByText('Redeem'));

    // Check if the success message is displayed
    expect(screen.getByText('Redemption successful')).toBeInTheDocument();
});