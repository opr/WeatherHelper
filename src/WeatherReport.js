import Request from 'superagent';
class WeatherReport {

    constructor() {
        this.apiUri = 'https://avwx.rest/api/';
    }

    getWeather(location, taf = false) {
        return new Promise((resolve, reject) => {
            Request.get(this.apiUri + (taf ? 'taf' : 'metar') + '/' + location)
                .end((err, res) => {
                    console.log(res);
                    if (res.body["Error"]) {
                        reject('Error loading weather for ' + location);
                    }
                    if (err) {
                        reject('Error loading werather for ' + location);
                    }
                    //console.log(res.body["Raw-Report"]);
                    resolve(res.body["Raw-Report"]);
                });
        });


    }

    getTaf(location) {
        return this.getWeather(location, true);
    }

    getMetar(location) {
        return this.getWeather(location, false);
    }
}
export default WeatherReport;