import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import enzyme, { shallow, configure, mount } from 'enzyme';
import RegistrationComponent from '../components/RegistrationComponent';
configure({ adapter: new Adapter() });


describe("LoginComponent", () => {
    it("should render LoginComponent", () => {
        const wrapper = shallow(<RegistrationComponent />);
        expect(wrapper.exists()).toBe(true)
    });

    it("Should validated input fields", () => {
        const wrapper = shallow(<RegistrationComponent />)
        let prevented = false
        wrapper.find("ValidatorForm").simulate("submit", {
            preventDefault: () => {
                prevented = true
            }
        });
        expect(prevented).toBe(true)

    });

    it("Should validated input fields", () => {
        const wrapper = shallow(<RegistrationComponent />)
        expect(wrapper.getElements()).toMatchSnapshot();
    });
    
    // it("onChange param is the same value as the input element's value property", () => {
    //     const wrapper = shallow(<RegistrationComponent />)

    //     wrapper.find('TextValidator').simulate('click', { target: { value: 'matched' } });
    //     expect('email').toBe('matched');
    // });
});