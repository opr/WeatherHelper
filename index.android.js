import React, {Component} from 'react';
import {AppRegistry, Image, View} from 'react-native';
import makeStore from './src/store';
import App from './src/components/App';
import Provider from "react-redux/src/components/Provider";

class WeatherHelper extends Component {
    render() {
        this.store = makeStore();
        return (
            <Provider store={this.store}>
                <App />
            </Provider>

        );
    }
}

AppRegistry.registerComponent('WeatherHelper', () => WeatherHelper);
