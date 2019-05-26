import React from 'react';
import App from './App';
import Report from './Report';
import { shallow, mount, render } from 'enzyme';

describe('Weather Report displays correct api data', () => {
    const weatherData = {
        main: {temp: 63.02},
        name: 'Milwaukee',
        weather: [{main: 'Clear'}],
        sys: {country: 'US'},
        wind: {deg: 20}
    }

    const tempUnits = 'imperial';

    it('Displays correct city name', () => {
        const wrapper = shallow(<Report weatherData={ weatherData }/>);
        expect(wrapper.find('#city').text()).toEqual('Milwaukee, US');
    });

    it('Displays correct temperature', () => {
        const wrapper = shallow(<Report weatherData={ weatherData } units={ tempUnits }/>);
        expect(wrapper.find('#temp').text()).toEqual('63.02');
    });
});
