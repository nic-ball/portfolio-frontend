import { render, screen, fireEvent } from '@testing-library/react';
import ContactForm from './ContactForm';

// Mock the API service so we don't actually send HTTP requests during tests
vi.mock('../services/api', () => ({
    sendContactMessage: vi.fn(() => Promise.resolve({ success: true }))
}));

describe('ContactForm Component', () => {
    it('renders all input fields', () => {
        render(<ContactForm />);

        // Check if elements exist on screen
        expect(screen.getByPlaceholderText('Your Name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('your.email@example.com')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument();
    });

    it('updates input values when typing', () => {
        render(<ContactForm />);

        const nameInput = screen.getByPlaceholderText('Your Name');
        fireEvent.change(nameInput, { target: { value: 'Nic' } });

        expect(nameInput.value).toBe('Nic');
    });
});
