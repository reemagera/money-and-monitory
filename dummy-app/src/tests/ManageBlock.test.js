import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ManageBlock from '../components/ManageBlock';

describe('ManageBlock Component', () => {
    it('should render without errors', () => {
        render(<ManageBlock />);
        const headingElement = screen.getByText('Manage your Instant Account Blockage');
        const changeStatusButton = screen.getByText('Confirm');
        const cancelButton = screen.getByText('Cancel');

        expect(headingElement).toBeInTheDocument();
        expect(changeStatusButton).toBeInTheDocument();
        expect(cancelButton).toBeInTheDocument();
    });

    it('should show the current round-up feature status', () => {
        render(<ManageBlock />);
        const status = screen.getByText('Current Roundup feature status');
        expect(status).toBeInTheDocument();
    });

    it('should show the option to change the feature status', () => {
        render(<ManageBlock />);
        const status = screen.getByText('You want to change it to :');
        expect(status).toBeInTheDocument();
    });

    it('should display a success message after confirming', () => {
        render(<ManageBlock />);
        const changeStatusButton = screen.getByText('Confirm');
        fireEvent.click(changeStatusButton);

        // You may need to include logic for handling the success message and check its content.
    });

    it('should navigate to the home page after confirming', () => {
        render(<ManageBlock />);
        const changeStatusButton = screen.getByText('Confirm');
        fireEvent.click(changeStatusButton);

        // You should include logic for handling the navigation to the home page.
    });

    it('should not navigate to the home page without confirmation', () => {
        render(<ManageBlock />);
        const cancelButton = screen.getByText('Cancel');
        fireEvent.click(cancelButton);

        // You should include logic for handling the navigation to the home page in case of cancellation.
    });

    // Add tests for handling the feature status change logic.

    // Additional test cases can be added to cover other scenarios.
});