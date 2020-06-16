import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CheckoutForm from './CheckoutForm';

// Write up the two tests here and make sure they are testing what the title shows

test('form header renders', () => {
	const { getByText } = render(<CheckoutForm />);
	getByText(/checkout form/i);
});

test('form shows success message on submit with form details', () => {
	const { getByLabelText, findAllByText, getByTestId } = render(<CheckoutForm />);

	fireEvent.change(getByLabelText(/first name/i), {target: { value: 'oscar' }});
    fireEvent.change(getByLabelText(/last name/i), {target: { value: 'lopez' }});
    
	fireEvent.change(getByLabelText(/address/i), {target: { value: '1609 w something' }});
    fireEvent.change(getByLabelText(/city/i), {target: { value: 'san jose' }});
    
	fireEvent.change(getByLabelText(/state/i), {target: { value: 'california' }});
	fireEvent.change(getByLabelText(/zip/i), { target: { value: '95112' } });

	const checkoutButton = getByTestId('checkoutButton');
	fireEvent.click(checkoutButton);

	findAllByText(/oscar/i);

	expect(getByTestId('successMessage')).toBeInTheDocument();
});