import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LearnMore from '../components/LearnMore';

describe('LearnMore Component', () => {
    it('should render without errors', () => {
        render(<LearnMore />);
        const titleElement = screen.getByText("How Does this plan work?");
        const stepsElements = steps.map((step) => screen.getByText(step.summary));
        const cardContentElement = screen.getByText(steps[0].details);

        expect(titleElement).toBeInTheDocument();
        expect(stepsElements.length).toBe(steps.length);
        expect(cardContentElement).toBeInTheDocument();
    });

    it('should display the correct content when a step is clicked', () => {
        render(<LearnMore />);
        const stepButtons = steps.map((step) => screen.getByText(step.summary));
        const cardContentElement = screen.getByText(steps[0].details);

        // Click a step
        fireEvent.click(stepButtons[1]);

        // Check if the card content has changed
        const updatedCardContent = screen.getByText(steps[1].details);
        expect(updatedCardContent).toBeInTheDocument();
    });

    it('should display corresponding images', () => {
        render(<LearnMore />);
        const cardImage = screen.getByAltText('corresponding step');
        const firstStepImage = steps[0].displayImg;

        expect(cardImage).toHaveAttribute('src', firstStepImage);
    });
});