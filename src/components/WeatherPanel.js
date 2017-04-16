import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import Styles from '../Styles/Styles';
import {connect} from 'react-redux';

class WeatherPanel extends Component {

    constructor(props) {
        super();
        console.log(props);
        this.state = {
            airfield: props.airfield,
            taf: props.weather ? props.weather.taf : 'Loading Taf\u2026',
            metar: props.weather ? props.weather.metar : 'Loading Metar\u2026'
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            taf: props.weather ? props.weather.get('taf') : this.state.taf,
            metar: props.weather ? props.weather.get('metar') : this.state.metar
        });
    }

    render() {
        return (

            <View style={{width: '100%'}}>
                <TouchableOpacity delayLongPress={2500} onLongPress={() => {
                    this.props.longPress(this.props.airfield);
                }}>
                    <View style={{
                        paddingLeft: 15,
                        backgroundColor: Styles.paletteD,
                        paddingRight: 15,
                        paddingTop: 10,
                        paddingBottom: 10,
                        width: '100%'
                    }}><Text style={{
                        fontWeight: 'bold',
                        fontSize: 18,
                        color: Styles.paletteC
                    }}>{this.props.airfield}</Text></View>
                </TouchableOpacity>
                <View style={{padding: 15}}>
                    <Text
                        style={{
                            width: '100%',
                            fontSize: Styles.weatherFontSize,
                            color: '#ffffff',
                            marginBottom: 20
                        }}>{this.state.metar}</Text>
                    <Text
                        style={{
                            width: '100%',
                            fontSize: Styles.weatherFontSize,
                            color: '#ffffff',
                        }}>{this.state.taf}</Text></View>
            </View>
        );
    }
}

export default WeatherPanel;