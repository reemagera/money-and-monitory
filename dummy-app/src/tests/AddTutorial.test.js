import React from 'react';
import { shallow } from 'enzyme';
import AddTutorial from '../components/AddTutorial';

describe('AddTutorial Component', () => {
    it('should render without errors', () => {
        const wrapper = shallow(<AddTutorial />);
        expect(wrapper.exists()).toBe(true);
    });

    it('should handle form input changes', () => {
        const wrapper = shallow(<AddTutorial />);
        const customerIdInput = wrapper.find('TextField').at(0);
        customerIdInput.simulate('change', { target: { value: '123456' } });

        // Add similar tests for other input fields (accountNumber, name, email, password, confirmPassword)
    });

    it('should handle form submission', () => {
        const wrapper = shallow(<AddTutorial />);
        const form = wrapper.find('form');
        form.simulate('submit', { preventDefault: () => { } });

        // You may want to check the state after form submission to assert that the submission logic is working as expected.
    });

    it('should handle the "Cancel" button click', () => {
        const wrapper = shallow(<AddTutorial />);
        const cancelButton = wrapper.find('Button').at(0);
        cancelButton.simulate('click');

        // You can add assertions for what should happen when the "Cancel" button is clicked.
    });

    it('should handle the "Login" link click', () => {
        const wrapper = shallow(<AddTutorial />);
        const loginLink = wrapper.find('Link').find('Button');
        loginLink.simulate('click');

        // You can add assertions for what should happen when the "Login" link is clicked.
    });
});
