import React from 'react'
import {shallow } from 'enzyme'
import Home from '../component/Home/Home'

describe('Home', () => {
    let wrapper;
    beforeEach(() => wrapper = shallow(<Home />));

    it('should render correctly', () => expect(wrapper).toMatchSnapshot());

    it('should render a <div />', () => {
        expect(wrapper.find('div').length).toEqual(1);
    });
})