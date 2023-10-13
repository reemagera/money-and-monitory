import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Transaction from '../components/Transaction';
import { Provider } from 'react-redux';
import store from './your-redux-store'; // Import your Redux store

const mockData = [
    {
        transactionID: 1,
        timestamp: '2023-10-12T10:00:00Z',
        method: 'Credit Card',
        amount: 100,
        roundUp: 5,
        type: 'credit',
        currentBalance: 500,
        toOrFrom: 'Savings Account',
        currentSavings: 250,
    },
    // Add more mock data as needed
];

test('Renders the Transaction component while loading', () => {
    render(
        <Provider store={store}>
            <Transaction />
        </Provider>
    );

    // Ensure loading indicator is displayed
    expect(screen.getByText('Transactions')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
});

test('Renders the Transaction component with data', () => {
    render(
        <Provider store={store}>
            <Transaction />
        </Provider>
    );

    // Ensure the "Transactions" title is displayed
    expect(screen.getByText('Transactions')).toBeInTheDocument();

    // Ensure DataGrid is displayed
    const dataGrid = screen.getByRole('grid');
    expect(dataGrid).toBeInTheDocument();

    // Check if some data rows are displayed
    for (const transaction of mockData) {
        expect(screen.getByText(transaction.transactionID.toString())).toBeInTheDocument();
        expect(screen.getByText(transaction.timestamp)).toBeInTheDocument();
        expect(screen.getByText(transaction.method)).toBeInTheDocument();
        expect(screen.getByText(transaction.amount.toString())).toBeInTheDocument();
        // Add more assertions as needed for other fields
    }
});

test('Renders the Transaction component without data', () => {
    render(
        <Provider store={store}>
            <Transaction />
        </Provider>
    );

    // Ensure the "Transactions" title is displayed
    expect(screen.getByText('Transactions')).toBeInTheDocument();

    // Ensure a message about no data is displayed
    expect(screen.getByText('No transactions found.')).toBeInTheDocument();
});

test('Renders the Transaction component with empty data', () => {
    render(
        <Provider store={store}>
            <Transaction />
        </Provider>
    );

    // Ensure the "Transactions" title is displayed
    expect(screen.getByText('Transactions')).toBeInTheDocument();

    // Ensure a message about no transactions is displayed
    expect(screen.getByText('No transactions found.')).toBeInTheDocument();
});

test('Renders the Transaction component with error message', () => {
    render(
        <Provider store={store}>
            <Transaction />
        </Provider>
    );

    // Ensure the error message is displayed
    expect(screen.getByText('An error occurred. Please try again later.')).toBeInTheDocument();
});

test('Click on a transaction row to navigate', async () => {
    render(
        <Provider store={store}>
            <Transaction />
        </Provider>
    );

    // Mock your Redux store to provide the customer ID and data

    // Click on a transaction row
    fireEvent.click(screen.getByText(mockData[0].transactionID.toString()));

    // Wait for navigation
    await waitFor(() => {
        // Ensure the page has navigated to the transaction details page
        expect(screen.getByText('Transaction Details')).toBeInTheDocument();
    });
});

test('Apply sorting to the data grid', async () => {
    render(
        <Provider store={store}>
            <Transaction />
        </Provider>
    );

    // Ensure DataGrid is displayed
    const dataGrid = screen.getByRole('grid');
    expect(dataGrid).toBeInTheDocument();

    // Click on the column header to apply sorting
    const columnHeader = screen.getByText('timestamp');
    fireEvent.click(columnHeader);

    // Wait for sorting to be applied
    await waitFor(() => {
        // Ensure the data grid is sorted by the selected column
        expect(screen.getByText('Sorted by timestamp')).toBeInTheDocument();
    });
});

test('Apply filtering to the data grid', async () => {
    render(
        <Provider store={store}>
            <Transaction />
        </Provider>
    );

    // Ensure DataGrid is displayed
    const dataGrid = screen.getByRole('grid');
    expect(dataGrid).toBeInTheDocument();

    // Type into the filter input to apply filtering
    const filterInput = screen.getByPlaceholderText('Filter…');
    fireEvent.change(filterInput, { target: { value: 'Credit Card' } });

    // Wait for filtering to be applied
    await waitFor(() => {
        // Ensure the data grid is filtered to show only "Credit Card" transactions
        expect(screen.getByText('Filtered by method: Credit Card')).toBeInTheDocument();
    });
});

test('Clear filters in the data grid', async () => {
    render(
        <Provider store={store}>
            <Transaction />
        </Provider>
    );

    // Ensure DataGrid is displayed
    const dataGrid = screen.getByRole('grid');
    expect(dataGrid).toBeInTheDocument();

    // Type into the filter input to apply filtering
    const filterInput = screen.getByPlaceholderText('Filter…');
    fireEvent.change(filterInput, { target: { value: 'Credit Card' } });

    // Wait for filtering to be applied
    await waitFor(() => {
        // Ensure the data grid is filtered to show only "Credit Card" transactions
        expect(screen.getByText('Filtered by method: Credit Card')).toBeInTheDocument();
    });

    // Click the clear filter button
    const clearFilterButton = screen.getByText('Clear filter');
    fireEvent.click(clearFilterButton);

    // Wait for the filter to be cleared
    await waitFor(() => {
        // Ensure the data grid no longer has a filter
        expect(screen.queryByText('Filtered by method: Credit Card')).toBeNull();
    });
});