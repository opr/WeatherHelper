import React, {Component} from 'react';
import * as actionCreators from '../action_creators';
import {Text, View, ScrollView, TextInput, Button, TouchableOpacity} from 'react-native';
import WeatherReport from '../WeatherReport';
import AirfieldList from './AirfieldList';

import Styles from '../Styles/Styles';
import {Provider, connect} from 'react-redux';


class App extends Component {

    constructor(props) {
        super();
        this.state = {
            weatherStringTaf: 'Loading TAF\u2026',
            weatherStringMetar: 'Loading Metar\u2026',
            addAirfieldText: '',
            airfields: []
        };
        this.getWeather();
        setInterval(this.getWeather.bind(this), 120000);
    }

    getWeather() {
        if (!this.props) {
            return;
        }
        console.log(this.props, 'get weather');
        let w = new WeatherReport();
        let promises = [];

        for (let a of this.props.airfields.values()) {
            console.log('fetching weather for', a);
            let m = w.getWeather(a);
            let t = w.getWeather(a, true);
            promises = [... promises, m, t];
        }

        Promise.all(promises).then((data) => {
            for(let d of data) {
                this.props.updateWeather(d);
            }
        }).catch(() => {
            'error loading weather data'
        });
    }

    componentDidUpdate(props) {
        if(props != this.props) {
            this.getWeather();
        }
    }

    addAirfield() {
        if (this.state.addAirfieldText.length != 4) {
            return;
        }
        this.props.addAirfield(this.state.addAirfieldText.toUpperCase());
    }

    render() {

        let w = new WeatherReport();
        return (
            <View>
                <ScrollView style={{backgroundColor: Styles.paletteA, height: '100%'}}>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            backgroundColor: Styles.paletteB,
                            width: '100%',
                            justifyContent: 'space-between',
                            padding: 10
                        }}>
                        <View style={{width: '80%'}}>
                            <TextInput underlineColorAndroid={Styles.paletteC}
                                       placeholderTextColor={Styles.paletteC}
                                       autoCapitalize="characters"
                                       style={{width: '100%', color: Styles.paletteC, margin: 0}}
                                       placeholder="Airfield ICAO Code" onChangeText={(text) => {
                                this.setState({addAirfieldText: text});
                            }}/>
                        </View>
                        <View style={{width: '15%', marginTop: 10}}>
                            <TouchableOpacity accessibilityLabel="Add Airfield"
                                              style={{
                                                  width: '100%',
                                              }}
                                              onPress={this.addAirfield.bind(this)}><Text style={{
                                width: '100%',
                                textAlign: 'center',
                                fontSize: 30,
                                paddingLeft: 20,
                                paddingRight: 20,
                                color: Styles.paletteC
                            }}>+</Text></TouchableOpacity>
                        </View>
                    </View>
                    <AirfieldList />
                </ScrollView>
            </View>
        );
    }
}

export default connect((state) => ( {airfields: state.get('airfields')}), actionCreators)(App);