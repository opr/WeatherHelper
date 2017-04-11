import AppLogic from './AppLogic';

let app = new AppLogic();
let defaultState = app.getInitialState();

export default function reducer(state = defaultState, action) {
    switch(action.type) {
        case 'ADD_AIRFIELD' :
            return app.addAirfield(state, action.payload);
        case 'REMOVE_AIRFIELD' :
            return app.removeAirfield(state, action.payload);
        default:
            return state;
    }
}