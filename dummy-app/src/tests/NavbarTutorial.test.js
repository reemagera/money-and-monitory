import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NavbarTutorials from '../components/NavbarTutorials';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { setCustomer } from '../store/actions';

const mockStore = configureStore([]);

describe('NavbarTutorials Component', () => {
    let store;
    let component;

    beforeEach(() => {
        store = mockStore({ customer: { customerID: 'exampleCustomerID' } });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <NavbarTutorials />
                </MemoryRouter>
            </Provider>
        );
    });

    it('should render without errors', () => {
        const spend2SaveText = screen.getByText('Spend2Save');
        const homeButton = screen.getByText('Home');
        const logoutButton = screen.getByText('Logout');

        expect(spend2SaveText).toBeInTheDocument();
        expect(homeButton).toBeInTheDocument();
        expect(logoutButton).toBeInTheDocument();
    });

    it('should navigate to the home page when the "Home" button is clicked', () => {
        const homeButton = screen.getByText('Home');
        fireEvent.click(homeButton);

        // Add assertions for navigation logic here.
    });

    it('should dispatch the setCustomer action and navigate to the root page when the "Logout" button is clicked', () => {
        const logoutButton = screen.getByText('Logout');
        fireEvent.click(logoutButton);

        // Check that the setCustomer action has been dispatched with null.
        const actions = store.getActions();
        expect(actions).toEqual([setCustomer(null)]);

        // Add assertions for navigation logic here.
    });
});