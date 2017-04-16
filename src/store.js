import {createStore} from 'redux';
import devToolsEnhancer from 'remote-redux-devtools';
import reducer from './reducer';

export default function makeStore() {
    return createStore(reducer, devToolsEnhancer());;
}