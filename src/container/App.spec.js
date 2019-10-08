import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';
import Home from '../component/Home/Home'
import { MemoryRouter
} from 'react-router'


describe('App', () => {
    let wrapper;
    beforeEach(() => wrapper = shallow( <App /> ));

    it('should render correctly', () => expect(wrapper).toMatchSnapshot());

    it('should render a <div />', () => {
        expect(wrapper.find('div').length).toEqual(1);
    });

    it('should render the Home Component ', () => {
        const component = mount( <MemoryRouter initialEntries = {['/']} >
            <App />
        </MemoryRouter> );
        expect(component.find(Home)).toHaveLength(1);
    })
})