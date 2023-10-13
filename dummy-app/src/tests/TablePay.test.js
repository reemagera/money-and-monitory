import React from 'react';
import { render, screen } from '@testing-library/react';
import TablePay from '../components/TablePay';

const mockData = {
    payData: {
        account: '1234567890',
        paymentMethod: 'Credit Card',
    },
    entity: 'Bank',
    debit: 100,
    status: 'confirm',
    transactionID: 123,
};

test('Renders the TablePay component with provided data', () => {
    render(<TablePay {...mockData} />);

    // Ensure the component displays the provided data
    expect(screen.getByText('Transaction ID')).toBeInTheDocument();
    expect(screen.getByText('123')).toBeInTheDocument();
    expect(screen.getByText('Recepient Bank Account')).toBeInTheDocument();
    expect(screen.getByText('1234567890')).toBeInTheDocument();
    // Add more assertions for other fields in the data
});

test('Renders the TablePay component for a confirmed transaction', () => {
    render(<TablePay {...mockData} />);

    // Ensure the "Transaction ID" is displayed for confirmed transaction
    expect(screen.getByText('Transaction ID')).toBeInTheDocument();
    expect(screen.getByText('123')).toBeInTheDocument();
});

test('Does not render the Transaction ID for unconfirmed transaction', () => {
    const mockDataUnconfirmed = { ...mockData, status: 'unconfirmed' };
    render(<TablePay {...mockDataUnconfirmed} />);

    // Ensure the "Transaction ID" is not displayed for unconfirmed transaction
    expect(screen.queryByText('Transaction ID')).not.toBeInTheDocument();
    expect(screen.queryByText('123')).not.toBeInTheDocument();
});

test('Renders the TablePay component for Bank entity', () => {
    render(<TablePay {...mockData} />);

    // Ensure the entity is displayed as "Bank"
    expect(screen.getByText('Transferred using')).toBeInTheDocument();
    expect(screen.getByText('Bank')).toBeInTheDocument();
});

test('Renders the TablePay component for different entities', () => {
    const mockDataMerchant = { ...mockData, entity: 'Merchant' };
    render(<TablePay {...mockDataMerchant} />);

    // Ensure the entity is displayed as "Merchant"
    expect(screen.getByText('Transferred using')).toBeInTheDocument();
    expect(screen.getByText('Merchant')).toBeInTheDocument();

    const mockDataService = { ...mockData, entity: 'Service' };
    render(<TablePay {...mockDataService} />);

    // Ensure the entity is displayed as "Service"
    expect(screen.getByText('Transferred using')).toBeInTheDocument();
    expect(screen.getByText('Service')).toBeInTheDocument();
});

test('Renders the TablePay component with positive debit amount', () => {
    render(<TablePay {...mockData} />);

    // Ensure positive debit amount is displayed
    expect(screen.getByText('Amount')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
});

test('Renders the TablePay component with zero debit amount', () => {
    const mockDataZeroDebit = { ...mockData, debit: 0 };
    render(<TablePay {...mockDataZeroDebit} />);

    // Ensure zero debit amount is displayed
    expect(screen.getByText('Amount')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
});

test('Renders the TablePay component with round-up debit', () => {
    const mockDataRoundUp = { ...mockData, debit: 10.5 };
    render(<TablePay {...mockDataRoundUp} />);

    // Ensure round-up debit amount is displayed
    expect(screen.getByText('Round Up Debited (Transferred to Instant Savings Account)')).toBeInTheDocument();
    expect(screen.getByText('0.50')).toBeInTheDocument();
});

test('Renders the TablePay component with zero round-up debit', () => {
    render(<TablePay {...mockData} />);

    // Ensure zero round-up debit amount is displayed
    expect(screen.getByText('Round Up Debited (Transferred to Instant Savings Account)')).toBeInTheDocument();
    expect(screen.getByText('0.00')).toBeInTheDocument();
});

test('Renders the TablePay component with specific status', () => {
    render(<TablePay {...mockData} />);

    // Ensure the provided status is displayed
    expect(screen.getByText('Transaction ID')).toBeInTheDocument();
    expect(screen.getByText('123')).toBeInTheDocument();
});

test('Renders the TablePay component for different status', () => {
    const mockDataConfirm = { ...mockData, status: 'confirm' };
    render(<TablePay {...mockDataConfirm} />);

    // Ensure "Transaction ID" is displayed for confirmed status
    expect(screen.getByText('Transaction ID')).toBeInTheDocument();
    expect(screen.getByText('123')).toBeInTheDocument();
});