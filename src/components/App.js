import React, {Component} from 'react';
import {Text, View, ScrollView, TextInput, Button} from 'react-native';
import WeatherReport from '../WeatherReport';

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
        w.GetMetar('EGGP').then((weather) => {
            this.setState({
                WeatherStringMetar: weather
            });
        });
        w.GetTaf('EGGP').then((weather) => {
            this.setState({
                WeatherStringTaf: weather
            });
        });
    }


    addAirfield() {
        if(this.state.AddAirfieldText.length != 4) {
            return;
        }
        this.state.Airfields.push(this.state.AddAirfieldText.toUpperCase());
    }

    render() {

        let w = new WeatherReport();
        return (
            <View>
                <ScrollView style={{backgroundColor: '#a1a1a1', height: '100%'}}>
                    <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#ffffff', width: '100%', justifyContent: 'space-between', padding: 10}}>
                        <TextInput autoCapitalize="characters" style={{width: '80%', margin: 0}} placeholder="Airfield ICAO Code" onChangeText={(text) => {
                    console.log(text);
                    this.setState({AddAirfieldText: text})
                    }}/>
                        <Button accessibilityLabel="Add Airfield" title="+" style={{width: 20, height: 20, lineHeight: 40}} onPress={this.addAirfield} />
                    </View>
                    <Text>{this.state.AddAirfieldText}</Text>
                    <Text
                        style={{width: '100%', textAlign: 'center', fontSize: 40, color: '#ffffff', marginBottom: 400}}>{this.state.WeatherStringMetar}</Text>
                    <Text
                        style={{width: '100%', textAlign: 'center', fontSize: 40, color: '#ffffff'}}>{this.state.WeatherStringTaf}</Text>
                </ScrollView>
            </View>
        )
            ;
    }
}

export default App;