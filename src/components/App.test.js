import React from 'react';
import App from './App';
import Report from './Report';
import { shallow, mount, render } from 'enzyme';

describe('Weather Report displays correct api data', () => {
    const weatherData = {
        main: {temp: 63.02},
        name: 'Milwaukee'
    }

    it('Displays correct city name', () => {
        const wrapper = shallow(<Report weatherData={ weatherData }/>);
        expect(wrapper.find('h1').text()).toEqual('Milwaukee');
    });

    it('Displays correct temperature', () => {
        const wrapper = shallow(<Report weatherData={ weatherData }/>);
        expect(wrapper.find('#temp').text()).toEqual('63.02');
    });
});
