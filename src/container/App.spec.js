import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Home from '../component/Home/Home'

describe('App', () => {
    let wrapper;
    beforeEach(() => wrapper = shallow( <App /> ));

    it('should render correctly', () => expect(wrapper).toMatchSnapshot());

    it('should render a <div />', () => {
        expect(wrapper.find('div').length).toEqual(1);
    });

    it('should render the Home Component ', () => {
        expect(wrapper.containsMatchingElement(<Home />)).toEqual(true);
    });
});