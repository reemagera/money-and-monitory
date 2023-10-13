import React from 'react';
import { render, screen } from '@testing-library/react';
import HeroUnit from '../components/HeroUnit';

describe('HeroUnit Component', () => {
    it('should render without errors', () => {
        render(<HeroUnit />);
        const headingElement = screen.getByText('Save as you spend!');
        const contentElement = screen.getByText('Save every penny upon your transactions.');

        expect(headingElement).toBeInTheDocument();
        expect(contentElement).toBeInTheDocument();
    });

    it('should render a "Learn More" button', () => {
        render(<HeroUnit />);
        const buttonElement = screen.getByText('Learn More');
        expect(buttonElement).toBeInTheDocument();
    });

    it('should render an image', () => {
        render(<HeroUnit />);
        const imageElement = screen.getByAltText('a woman sitting in a cafe');
        expect(imageElement).toBeInTheDocument();
    });
});