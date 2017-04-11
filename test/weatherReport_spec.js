import WeatherReport from '../src/WeatherReport';
import {expect} from 'chai';
let w = new WeatherReport();

describe('Weather Report', () => {

    it('gets the weather from an airfield', () => {
        const metar = w.getMetar('EGGP');
        metar.then((weather) => {
            expect(weather).to.include('EGGP').and.to.have.lengthOf(weather, 50);
        })
    });

    it('handles an error', () => {
        const metar = w.getMetar('EGGfffP');
        metar.catch((weather) => {
            expect(weather).to.equal('Error loading weather for EGGfffP');
        })
    });
});