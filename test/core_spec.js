import {List, Map} from 'immutable';
import {expect} from 'chai';

import AppLogic from '../src/AppLogic';

describe('application logic', () => {

    describe('get initial state', () => {

        it('gets the initial state', () => {
            let x = new AppLogic();
            const initialState = x.getInitialState();
            expect(initialState).to.equal(Map({
                airfields: List()
            }));
        });

    });

    describe('add airfield', () => {

        it('adds an airfield to the state', () => {
            let x = new AppLogic();
            const state = Map({
                airfields: List()
            });
            const nextState = x.addAirfield(state, 'EGGP');
            expect(nextState).to.equal(Map({airfields: List(['EGGP'])}));
        });

        it('does not add an airfield to the state if it is already in there', () => {
            let x = new AppLogic();
            const state = Map({
                airfields: List([
                    'EGGP'
                ])
            });
            const nextState = x.addAirfield(state, 'EGGP');
            expect(nextState).to.equal(Map({
                airfields: List([
                    'EGGP'
                ])
            }));
        });

        it('does add an airfield to the state if it isn\'t already in there', () => {
            let x = new AppLogic();
            const state = Map({
                airfields: List([
                    'EGCC'
                ])
            });
            const nextState = x.addAirfield(state, 'EGGP');
            expect(nextState).to.equal(Map({
                airfields: List([
                    'EGCC',
                    'EGGP'
                ])
            }));
        });

        it('removes an airfield from the list, if it exists', () => {
            let x = new AppLogic();
            const state = Map({
                airfields: List([
                    'EGCC'
                ])
            });
            const nextState = x.removeAirfield(state, 'EGCC');
            expect(nextState).to.equal(Map({
                airfields: List([
                ])
            }));
        });

        it('doesn\'t do anything if it tries to remove an airfield that isn\'t in the list', () => {
            let x = new AppLogic();
            const state = Map({
                airfields: List([
                    'EGCC'
                ])
            });
            const nextState = x.removeAirfield(state, 'EGGP');
            expect(nextState).to.equal(Map({
                airfields: List([
                    'EGCC'
                ])
            }));
        });

    });

});