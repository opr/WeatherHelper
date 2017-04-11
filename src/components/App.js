import React, {Component} from 'react';
import {Text, View, ScrollView, TextInput, Button, TouchableOpacity} from 'react-native';
import WeatherReport from '../WeatherReport';
import Styles from '../Styles/Styles';
class App extends Component {

    constructor(props) {
        super();
        this.state = {
            WeatherStringTaf: 'Loading TAF...',
            WeatherStringMetar: 'Loading Metar...',
            AddAirfieldText: '',
            Airfields: []
        };
        this.getWeather();
    }

    getWeather() {
        let w = new WeatherReport();
        w.getMetar('EGGP').then((weather) => {
            this.setState({
                WeatherStringMetar: weather
            });
        });
        w.getTaf('EGGP').then((weather) => {
            this.setState({
                WeatherStringTaf: weather
            });
        });
    }


    addAirfield() {
        if (this.state.AddAirfieldText.length != 4) {
            return;
        }
        this.state.Airfields.push(this.state.AddAirfieldText.toUpperCase());
    }

    render() {

        let w = new WeatherReport();
        return (
            <View>
                <ScrollView style={{backgroundColor: Styles.paletteA, height: '100%'}}>
                    <View
                        style={{flex: 1, flexDirection: 'row', backgroundColor: Styles.paletteB, width: '100%', justifyContent: 'space-between', padding: 10}}>
                        <View style={{width: '80%'}}>
                            <TextInput underlineColorAndroid={Styles.paletteC} placeholderTextColor={Styles.paletteC} autoCapitalize="characters" style={{width: '100%', color: Styles.paletteC, margin: 0}}
                                       placeholder="Airfield ICAO Code" onChangeText={(text) => {
                            console.log(text);
                            this.setState({AddAirfieldText: text})
                            }} />
                        </View>
                        <View style={{width: '15%', marginTop: 10}}>
                            <TouchableOpacity accessibilityLabel="Add Airfield"
                                    style={{
                                width: '100%',}}
                                    onPress={this.addAirfield}><Text style={{width: '100%', textAlign: 'center', fontSize: 30, color: Styles.paletteC}}>+</Text></TouchableOpacity>
                        </View>
                    </View>
                    <Text
                        style={{width: '100%', textAlign: 'center', fontSize: 20, color: '#ffffff'}}>{this.state.WeatherStringMetar}</Text>
                    <Text
                        style={{width: '100%', textAlign: 'center', fontSize: 20, color: '#ffffff'}}>{this.state.WeatherStringTaf}</Text>
                </ScrollView>
            </View>
        )
            ;
    }
}

export default App;