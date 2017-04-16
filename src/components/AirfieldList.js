import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text, View} from 'react-native';
import WeatherPanel from './WeatherPanel';
import * as actionCreators from '../action_creators';

class AirfieldList extends Component {

    constructor() {
        super();
        this.state = {
            weatherPanels: []
        };
    }

    componentWillReceiveProps(props) {
        let weatherPanels = [];

        for (let a of props.airfields) {
            weatherPanels.push(<WeatherPanel longPress={props.removeAirfield} key={a} airfield={a} weather={props.weather.get(a)} />);
        }

        this.setState({
            weatherPanels: weatherPanels
        });
    }

    render() {
        return (
            <View>
                {this.state.weatherPanels}
            </View>
        );
    }

}

export default connect((state) => ({airfields: state.get('airfields'), weather: state.get('weather')}), actionCreators)(AirfieldList);
