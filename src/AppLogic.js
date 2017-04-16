import {Map, List} from 'immutable';

export default class AppLogic {

    constructor() {
        this.INITIAL_STATE = this.getInitialState();
    }

    getInitialState() {
        return Map({
            airfields: List(),
            weather: Map({})
        });
    }

    addAirfield(state, airfield) {
        return state.get('airfields').contains(airfield) ? state : state.set('airfields', state.get('airfields').push(airfield));
    }

    removeAirfield(state, airfield) {
        return state.get('airfields').contains(airfield) ? state.set('airfields', state.get('airfields').delete(state.get('airfields').indexOf(airfield))).deleteIn(['weather', airfield]) : state;
    }

    updateWeather(state, payload) {
        let isTaf = payload.type === 'taf';

        //check if airfield exists
        if (!state.get('airfields').contains(payload.airfield)) {
            return state;
        }
        return state.setIn(['weather', payload.airfield, isTaf ? 'taf' : 'metar'], payload.body);
    }
}