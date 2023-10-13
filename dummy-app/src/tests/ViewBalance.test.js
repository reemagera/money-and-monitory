import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import ViewBalance from '../components/Viewbalance';
import { Provider } from 'react-redux';
import store from './your-redux-store'; // Import your Redux store
import axios from 'axios';

const mockBalanceData = {
  mainAccount: 1000,
  redeem: 250,
};

test('Renders the ViewBalance component', () => {
  render(
    <Provider store={store}>
      <ViewBalance />
    </Provider>
  );

  // Ensure "View Balance" title is displayed
  expect(screen.getByText('View Balance')).toBeInTheDocument();

  // Ensure "Check Balance" button is displayed
  expect(screen.getByText('Check Balance')).toBeInTheDocument();
});

test('Check balance and display results', async () => {
  render(
    <Provider store={store}>
      <ViewBalance />
    </Provider>
  );

  // Mock axios GET requests
  axios.get = jest.fn().mockResolvedValue({ data: mockBalanceData });

  // Click the "Check Balance" button
  fireEvent.click(screen.getByText('Check Balance'));

  // Wait for the balance to be displayed
  await waitFor(() => {
    expect(screen.getByText(`Your Main Account Balance: $${mockBalanceData.mainAccount}`)).toBeInTheDocument();
    expect(screen.getByText(`Your Redeem Balance: $${mockBalanceData.redeem}`)).toBeInTheDocument();
  });
});

test('Check balance and handle API error', async () => {
  render(
    <Provider store={store}>
      <ViewBalance />
    </Provider>
  );

  // Mock axios GET requests to simulate an error
  axios.get = jest.fn().mockRejectedValue(new Error('API Error'));

  // Click the "Check Balance" button
  fireEvent.click(screen.getByText('Check Balance'));

  // Wait for the snackbar to show the error message
  await waitFor(() => {
    expect(screen.getByText('An error occurred. Please try again later.')).toBeInTheDocument();
  });
});

test('Check balance with empty customer ID', async () => {
  render(
    <Provider store={store}>
      <ViewBalance />
    </Provider>
  );

  // Click the "Check Balance" button without entering the customer ID
  fireEvent.click(screen.getByText('Check Balance'));

  // Ensure the error message is displayed
  await waitFor(() => {
    expect(screen.getByText('An error occurred. Please try again later.')).toBeInTheDocument();
  });
});

test('Check balance with valid customer ID', async () => {
  render(
    <Provider store={store}>
      <ViewBalance />
    </Provider>
  );

  // Set a valid customer ID
  const customerIDInput = screen.getByLabelText('User ID');
  fireEvent.change(customerIDInput, { target: { value: 'validCustomerID' } });

  // Mock axios GET requests
  axios.get = jest.fn().mockResolvedValue({ data: mockBalanceData });

  // Click the "Check Balance" button
  fireEvent.click(screen.getByText('Check Balance'));

  // Wait for the balance to be displayed
  await waitFor(() => {
    expect(screen.getByText(`Your Main Account Balance: $${mockBalanceData.mainAccount}`)).toBeInTheDocument();
    expect(screen.getByText(`Your Redeem Balance: $${mockBalanceData.redeem}`)).toBeInTheDocument();
  });
});

test('Check balance with invalid customer ID', async () => {
  render(
    <Provider store={store}>
      <ViewBalance />
    </Provider>
  );

  // Set an invalid customer ID
  const customerIDInput = screen.getByLabelText('User ID');
  fireEvent.change(customerIDInput, { target: { value: 'invalid' } });

  // Click the "Check Balance" button
  fireEvent.click(screen.getByText('Check Balance'));

  // Ensure an error message is displayed
  await waitFor(() => {
    expect(screen.getByText('An error occurred. Please try again later.')).toBeInTheDocument();
  });
});