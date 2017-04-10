import Request from 'superagent';
class WeatherReport {

    constructor() {
        this.apiUri = 'https://avwx.rest/api/';
    }

    GetWeather(location, taf = false) {
        return new Promise( (resolve, reject) => {
            Request.get(this.apiUri + (taf ? 'taf' : 'metar') + '/' + location)
                .end((err, res) => {
                    if(err) {
                        reject('error getting weather');
                    }
                    console.log(res.body["Raw-Report"]);
                    resolve(res.body["Raw-Report"]);
                });
        });


    }

    GetTaf(location) {
        return this.GetWeather(location, true);
    }

    GetMetar(location) {
        return this.GetWeather(location, false);
    }
}
export default WeatherReport;