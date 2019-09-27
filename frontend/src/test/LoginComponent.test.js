import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, configure } from 'enzyme';
import LoginComponent from '../components/LoginComponent';
configure({ adapter: new Adapter() });

describe("LoginComponent", () => {
    it("should render LoginComponent", () => {
        const wrapper = shallow(<LoginComponent />);
        expect(wrapper.exists()).toBe(true)
    });

    it("Should validated input fields", () => {
        const wrapper = shallow(<LoginComponent />)
        let prevented = false
        wrapper.find("ValidatorForm").simulate("submit", {
            preventDefault: () => {
                prevented = true
            }
        });
        expect(prevented).toBe(true)

    });

    it("Should validated input fields", () => {
        const wrapper = shallow(<LoginComponent />)
        expect(wrapper.getElements()).toMatchSnapshot();
    });
    // it("onChange param is the same value as the input element's value property", () => {
    //     const wrapper = shallow(<LoginComponent />)

    //     wrapper.find('TextValidator').simulate('change', { target: { value: 'matched' } });
    //     expect('email').toBe('matched');
    // });
});