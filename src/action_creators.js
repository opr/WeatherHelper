export function addAirfield(airfield) {
    return {
        type: 'ADD_AIRFIELD',
        payload: airfield
    }
}

export function removeAirfield(airfield) {
    return {
        type: 'REMOVE_AIRFIELD',
        payload: airfield
    }
}

export function updateWeather(payload) {
    return {
        type: 'UPDATE_WEATHER',
        payload: payload
    }
}
