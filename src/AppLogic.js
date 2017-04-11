import {Map, List} from 'immutable';

export default class AppLogic {

    constructor() {
        this.INITIAL_STATE = this.getInitialState();
    }

    getInitialState() {
        return Map({
            airfields: List()
        });
    }

    addAirfield(state, airfield) {
        return state.get('airfields').contains(airfield) ? state : state.set('airfields', state.get('airfields').push(airfield));
    }

    removeAirfield(state, airfield) {
        return state.get('airfields').contains(airfield) ? state.set('airfields', state.get('airfields').delete(state.get('airfields').indexOf(airfield))) : state;
    }
}