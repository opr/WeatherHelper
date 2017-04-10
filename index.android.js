import React, { Component } from 'react';
import { AppRegistry, Image, View } from 'react-native';
import App from './src/components/App';

class WeatherHelper extends Component {
  render() {
    return (
        <App />

    );
  }
}

AppRegistry.registerComponent('WeatherHelper', () => WeatherHelper);
