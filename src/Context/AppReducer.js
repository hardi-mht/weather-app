/* eslint-disable import/no-anonymous-default-export */
export default(state, action)=>{
    console.log(action.type, "TYPE")
    console.log(action.payload, "PAYLOAD");
    switch (action.type) {
        case 'SET_WEATHER_LOCATION_DATA':
            return{
                ...state,
                weatherLocationData:action.payload
            }
        case 'SET_ERROR':
            return {
                ...state,
                errorMsg: action.payload
            }
        case 'RESET_ERROR':
            return {
                ...state,
                errorMsg: ''
            }
        case 'SET_FAV_LIST':
            return {
                ...state,
                favouriteCitys: action.payload
            }
        default:
            return state;
    }
}