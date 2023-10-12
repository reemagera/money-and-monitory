// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import ViewBalance from './ViewBalance';

describe('ViewBalance Component', () => {
  it('should render without errors', () => {
    const wrapper = shallow(<ViewBalance />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should display error messages for invalid input', () => {
    const wrapper = mount(<ViewBalance />);
    const checkBalanceButton = wrapper.find('button').at(0); // Find the "Check Balance" button

    // Simulate clicking the button
    checkBalanceButton.simulate('click');

    // Find error messages
    const userIDError = wrapper.find('p').at(0); // Assuming your error messages are wrapped in <p> elements
    const passwordError = wrapper.find('p').at(1);

    // Expect error messages to be displayed
    expect(userIDError.text()).toContain('Invalid User ID (at least 6 characters)');
    expect(passwordError.text()).toContain('Invalid Password (8 characters)');
  });

  it('should fetch balance on valid input and display it', async () => {
    const wrapper = mount(<ViewBalance />);
    const checkBalanceButton = wrapper.find('button').at(0); // Find the "Check Balance" button

    // Mock axios response for a successful balance fetch
    jest.spyOn(axios, 'get').mockResolvedValue({
      status: 200,
      data: { mainAccount: 1000, redeem: 50 }
    });

    // Fill in the User ID and Password inputs
    wrapper.find('input[id="user-id"]').simulate('change', { target: { value: '123456' } });
    wrapper.find('input[id="password"]').simulate('change', { target: { value: 'password123' } });

    // Simulate clicking the button
    checkBalanceButton.simulate('click');

    // Wait for the balance data to be displayed
    await new Promise((resolve) => setImmediate(resolve));
    wrapper.update();

    // Find balance data elements
    const mainAccountBalance = wrapper.find('Typography').at(0);
    const redeemBalance = wrapper.find('Typography').at(1);

    // Expect balance data to be displayed correctly
    expect(mainAccountBalance.text()).toContain('Your Main Account Balance:');
    expect(mainAccountBalance.text()).toContain('$1000');
    expect(redeemBalance.text()).toContain('Your Redeem Balance:');
    expect(redeemBalance.text()).toContain('$50');
  });
});
