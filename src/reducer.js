import AppLogic from './AppLogic';

let app = new AppLogic();

export default function reducer(state, action) {
    switch(action.type) {
        case 'ADD_AIRFIELD' :
            return app.addAirfield(state, action.payload);
    }
}