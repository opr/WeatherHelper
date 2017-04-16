import {List, Map} from 'immutable';
import {expect} from 'chai';

import AppLogic from '../src/AppLogic';

describe('application logic', () => {

    describe('get initial state', () => {

        it('gets the initial state', () => {
            let x = new AppLogic();
            const initialState = x.getInitialState();
            expect(initialState).to.equal(Map({
                airfields: List(),
                weather: Map({})
            }));
        });

    });

    describe('add airfield', () => {

        it('adds an airfield to the state', () => {
            let x = new AppLogic();
            const state = Map({
                airfields: List(),
                weather: Map({})
            });
            const nextState = x.addAirfield(state, 'EGGP');
            expect(nextState).to.equal(Map({
                airfields: List(['EGGP']),
                weather: Map({})
            }));
        });

        it('does not add an airfield to the state if it is already in there', () => {
            let x = new AppLogic();
            const state = Map({
                airfields: List([
                    'EGGP'
                ]),
                weather: Map({})
            });
            const nextState = x.addAirfield(state, 'EGGP');
            expect(nextState).to.equal(Map({
                airfields: List([
                    'EGGP'
                ]),
                weather: Map({})
            }));
        });

        it('does add an airfield to the state if it isn\'t already in there', () => {
            let x = new AppLogic();
            const state = Map({
                airfields: List([
                    'EGCC'
                ]),
                weather: Map({})
            });
            const nextState = x.addAirfield(state, 'EGGP');
            expect(nextState).to.equal(Map({
                airfields: List([
                    'EGCC',
                    'EGGP'
                ]),
                weather: Map({})
            }));
        });

        it('removes an airfield from the list, if it exists', () => {
            let x = new AppLogic();
            const state = Map({
                airfields: List([
                    'EGCC'
                ]),
                weather: Map({})
            });
            const nextState = x.removeAirfield(state, 'EGCC');
            expect(nextState).to.equal(Map({
                airfields: List([]),
                weather: Map({})
            }));
        });

        it('doesn\'t do anything if it tries to remove an airfield that isn\'t in the list', () => {
            let x = new AppLogic();
            const state = Map({
                airfields: List([
                    'EGCC'
                ]),
                weather: Map({})
            });
            const nextState = x.removeAirfield(state, 'EGGP');
            expect(nextState).to.equal(Map({
                airfields: List([
                    'EGCC'
                ]),
                weather: Map({})
            }));
        });

    });

    describe('add weather info', () => {

        it('adds a metar to an airfield that doesn\'t have any weather data yet', () => {
            let x = new AppLogic();
            const initialState = Map({
                airfields: List([
                    'EGGP'
                ]),
                weather: Map({
                })
            });

            const nextState = x.updateWeather(initialState, {airfield: 'EGGP', type: 'metar', body: 'EGGP 152120Z 30007KT 9999 SCT022 08/04 Q1022'});
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

        it('adds a taf to an airfield that doesn\'t have any weather data yet', () => {
            let x = new AppLogic();
            const initialState = Map({
                airfields: List([
                    'EGGP'
                ]),
                weather: Map({
                })
            });

            const nextState = x.updateWeather(initialState, {airfield: 'EGGP', type: 'taf', body: 'EGGP 152120Z 30007KT 9999 SCT022 08/04 Q1022'});
            expect(nextState).to.equal(
                Map({
                    airfields: List([
                        'EGGP'
                    ]),
                    weather: Map({
                        EGGP: Map({taf: 'EGGP 152120Z 30007KT 9999 SCT022 08/04 Q1022'})
                    })
                })
            );
        });

        it('adds a metar to an airfield that already has a metar', () => {
            let x = new AppLogic();
            const initialState = Map({
                airfields: List([
                    'EGGP'
                ]),
                weather: Map({
                    EGGP: Map({metar: 'EGGP 152120Z 30007KT 9999 SCT022 08/04 Q1021'})
                })
            });

            const nextState = x.updateWeather(initialState, {airfield: 'EGGP', type: 'metar', body: 'EGGP 152120Z 30007KT 9999 SCT022 08/04 Q1022'});
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

        it('adds a taf to an airfield that already has a metar', () => {
            let x = new AppLogic();
            const initialState = Map({
                airfields: List([
                    'EGGP'
                ]),
                weather: Map({
                    EGGP: Map({metar: 'EGGP 152120Z 30007KT 9999 SCT022 08/04 Q1021'})
                })
            });

            const nextState = x.updateWeather(initialState, {airfield: 'EGGP', type: 'taf', body: 'EGGP 152120Z 30007KT 9999 SCT022 08/04 Q1022'});
            expect(nextState).to.equal(
                Map({
                    airfields: List([
                        'EGGP'
                    ]),
                    weather: Map({
                        EGGP: Map({metar: 'EGGP 152120Z 30007KT 9999 SCT022 08/04 Q1021', taf: 'EGGP 152120Z 30007KT 9999 SCT022 08/04 Q1022'})
                    })
                })
            );
        });

        it('adds a taf to a new airfield while one already exists', () => {
            let x = new AppLogic();
            const initialState = Map({
                airfields: List([
                    'EGGP',
                    'EGCC'
                ]),
                weather: Map({
                    EGGP: Map({metar: 'EGGP 152120Z 30007KT 9999 SCT022 08/04 Q1021'})
                })
            });

            const nextState = x.updateWeather(initialState, {airfield: 'EGCC', type: 'taf', body: 'EGCC 152120Z 30007KT 9999 SCT022 08/04 Q1022'});
            expect(nextState).to.equal(
                Map({
                    airfields: List([
                        'EGGP',
                        'EGCC'
                    ]),
                    weather: Map({
                        EGGP: Map({metar: 'EGGP 152120Z 30007KT 9999 SCT022 08/04 Q1021'}),
                        EGCC: Map({taf: 'EGCC 152120Z 30007KT 9999 SCT022 08/04 Q1022'})
                    })
                })
            );
        });
    });

});