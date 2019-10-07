import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';
import Home from '../component/Home/Home'
import { MemoryRouter
} from 'react-router'
import { Route } from 'react-router-dom';


let pathMap = {};
describe('App', () => {
    beforeAll(() => {
        const component = shallow(<App />);
        pathMap = component.find(Route).reduce((pathMap, route) => {
            const routeProps = route.props();
            pathMap[routeProps.path] = route.component;
            return pathMap
        }, {});
        console.log(pathMap)
    })
    let wrapper;
    beforeEach(() => wrapper = shallow( <App /> ));

    it('should render correctly', () => expect(wrapper).toMatchSnapshot());

    it('should render a <div />', () => {
        expect(wrapper.find('div').length).toEqual(1);
    });

    it('should render the Home Component ', () => {
        expect(pathMap['/']).toBe(Home)
    });
});