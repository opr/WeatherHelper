import {Map, List} from 'immutable';
import {expect} from 'chai';
import AppLogic from '../src/AppLogic';

import reducer from '../src/reducer';

describe('reducer', () => {

    it('handles INIT_STATE', () => {
        let x = new AppLogic();
        expect(x.INITIAL_STATE).to.equal(Map({
            airfields: List()
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
                ])
            })
        );
    });
});