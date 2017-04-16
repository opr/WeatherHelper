import {Map, List} from 'immutable';
import {expect} from 'chai';
import makeStore from '../src/store';

describe('store', () => {

    it('is a Redux store configured with the correct reducer', () => {
        const store = makeStore();
        expect(store.getState()).to.equal(Map({
            airfields: List([]),
            weather: Map({})
        }));

        store.dispatch({
            type: 'ADD_AIRFIELD',
            payload: 'EGGP'
        });
        expect(store.getState()).to.equal(Map({
            airfields: List(['EGGP']),
            weather: Map({})
        }));
    });

});