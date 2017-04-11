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

    it('handles REMOVE_AIRFIELD', () => {
        let x = new AppLogic();
        const initialState = x.INITIAL_STATE;
        const action1 = {type: 'ADD_AIRFIELD', payload: 'EGGP'};
        const action = {type: 'REMOVE_AIRFIELD', payload: 'EGGP'};
        let nextState = reducer(initialState, action1),
            finalState = reducer(nextState, action);

        expect(finalState).to.equal(
            Map({
                airfields: List([
                ])
            })
        );
    });

    it('has an initial state', () => {
        const action = {type: 'ADD_AIRFIELD', payload: 'EGGP'};
        const nextState = reducer(undefined, action);
        expect(nextState).to.equal(Map({
            airfields: List(['EGGP'])
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
            ])
        }));
    });
});