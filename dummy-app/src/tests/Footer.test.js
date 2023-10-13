import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';

describe('Footer Component', () => {
    it('should render without errors', () => {
        render(<Footer />);
        const footerElement = screen.getByText('Customer Care');
        expect(footerElement).toBeInTheDocument();
    });

    it('should render contact information', () => {
        render(<Footer />);
        const emailLink = screen.getByText('spend2save@natwest.com');
        const phoneText = screen.getByText('1800-xxxx-xxxx');
        const addressLink = screen.getByText('Postal address: Edinburg');

        expect(emailLink).toBeInTheDocument();
        expect(phoneText).toBeInTheDocument();
        expect(addressLink).toBeInTheDocument();
    });

    it('should render social media links', () => {
        render(<Footer />);
        const mailLink = screen.getByText('MailOutline');
        const facebookLink = screen.getByText('FacebookOutlined');
        const instagramLink = screen.getByText('Instagram');
        const twitterLink = screen.getByText('Twitter');
        const whatsappLink = screen.getByText('WhatsApp');
        const linkedinLink = screen.getByText('LinkedIn');

        expect(mailLink).toBeInTheDocument();
        expect(facebookLink).toBeInTheDocument();
        expect(instagramLink).toBeInTheDocument();
        expect(twitterLink).toBeInTheDocument();
        expect(whatsappLink).toBeInTheDocument();
        expect(linkedinLink).toBeInTheDocument();
    });

    it('should render terms and conditions links', () => {
        render(<Footer />);
        const termsLink = screen.getByText('Terms and Conditions');
        const policyLink = screen.getByText('Policy');

        expect(termsLink).toBeInTheDocument();
        expect(policyLink).toBeInTheDocument();
    });
});
