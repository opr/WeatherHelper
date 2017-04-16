import {Map, List} from 'immutable';
import {expect} from 'chai';
import AppLogic from '../src/AppLogic';

import reducer from '../src/reducer';

describe('reducer', () => {

    it('handles INIT_STATE', () => {
        let x = new AppLogic();
        expect(x.INITIAL_STATE).to.equal(Map({
            airfields: List(),
            weather: Map({})
        }));
    });

    it('handles ADD_AIRFIELD', () => {
        let x = new AppLogic();
        const initialState = x.INITIAL_STATE;
        const action = {type: 'ADD_AIRFIELD', payload: 'EGGP'};
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(
            Map({
                airfields: List([
                    'EGGP'
                ]),
                weather: Map({})
            })
        );
    });

    it('handles UPDATE_WEATHER with a metar for airfield that exists but has no weather data yet', () => {
        const initialState = Map({
            airfields: List([
                'EGGP'
            ]),
            weather: Map({})
        });
        const action = {
            type: 'UPDATE_WEATHER',
            payload: {airfield: 'EGGP', type: 'metar', body: 'EGGP 152120Z 30007KT 9999 SCT022 08/04 Q1021'}
        };
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(
            Map({
                airfields: List([
                    'EGGP'
                ]),
                weather: Map({
                    EGGP: Map({metar: 'EGGP 152120Z 30007KT 9999 SCT022 08/04 Q1021'})
                })
            })
        );

    });

    it('handles UPDATE_WEATHER with a metar for airfield that exists and already has weather data', () => {
        const initialState = Map({
            airfields: List([
                'EGGP'
            ]),
            weather: Map({
                EGGP: Map({metar: 'EGGP 152120Z 30007KT 9999 SCT022 08/04 Q1021'})
            })
        });
        const action = {
            type: 'UPDATE_WEATHER',
            payload: {airfield: 'EGGP', type: 'metar', body: 'EGGP 152120Z 30007KT 9999 SCT022 08/04 Q1022'}
        };
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(
            Map({
                airfields: List([
                    'EGGP'
                ]),
                weather: Map({
                    EGGP: Map({metar: 'EGGP 152120Z 30007KT 9999 SCT022 08/04 Q1022'})
                })
            })
        );
    });

    it('handles REMOVE_AIRFIELD', () => {
        let x = new AppLogic();
        const initialState = x.INITIAL_STATE;
        const action1 = {type: 'ADD_AIRFIELD', payload: 'EGGP'};
        const action = {type: 'REMOVE_AIRFIELD', payload: 'EGGP'};
        let nextState = reducer(initialState, action1),
            finalState = reducer(nextState, action);

        expect(finalState).to.equal(
            Map({
                airfields: List([]),
                weather: Map({})
            })
        );
    });

    it('has an initial state', () => {
        const action = {type: 'ADD_AIRFIELD', payload: 'EGGP'};
        const nextState = reducer(undefined, action);
        expect(nextState).to.equal(Map({
            airfields: List(['EGGP']),
            weather: Map({})
        }));
    });

    it('can be used with reduce', () => {
        let x = new AppLogic();
        const actions = [
            {type: 'ADD_AIRFIELD', payload: 'EGGP'},
            {type: 'ADD_AIRFIELD', payload: 'EGOW'},
            {type: 'ADD_AIRFIELD', payload: 'EGCC'},
            {type: 'ADD_AIRFIELD', payload: 'EGKK'},
            {type: 'ADD_AIRFIELD', payload: 'EGLL'},
            {type: 'REMOVE_AIRFIELD', payload: 'EGLL'},
            {type: 'REMOVE_AIRFIELD', payload: 'EGCC'}
        ];
        const finalState = actions.reduce(reducer, x.getInitialState());

        expect(finalState).to.equal(Map({
            airfields: List([
                'EGGP',
                'EGOW',
                'EGKK'
            ]),
            weather: Map({})
        }));
    });
});