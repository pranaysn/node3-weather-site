const request = require('request')


const forecast = (latitude,logitude, callback) =>{
        const url = 'http://api.weatherstack.com/current?access_key=af7dc546fadbe26db531142408c5f1c1&query=' + latitude + ',' + logitude + '&units=m'

        request ({url : url, json: true}, (error, response) =>  {
                if (error) {
                            callback('You are not connected to internet, Please try again later to get weather info.', undefined)
                } else if(response.body.error) {
                            callback('Unable to find location', undefined)
                }else
                {
                   callback (undefined, response.body.current.weather_descriptions[0] + '. The current temperature is ' + response.body.current.temperature + ' degrees and feels like out ' + response.body.current.feelslike + ' degrees.'
                   )   
                }
        })
    }


module.exports = forecast

    // const url = 'http://api.weatherstack.com/current?access_key=af7dc546fadbe26db531142408c5f1c1&query=' + latitude + ',' + logitude + '&units=m'
    // request({ url: url, json: true }, (error, response) => {
    //     //const data = JSON.parse(response.body)
    //     // error handling when network not working and location is not correct 
    //     if (error) {
    //         console.log('You are not connected to internet, Please try again later to get weather info.')
    //     }else if (response.body.error)
    //     {
    //         console.log('Unable to find location')
    //     } 
    //     else {
    //         console.log(response.body.current.weather_descriptions[0] + '. The current temperature is ' + response.body.current.temperature + ' degrees and feels like out ' + response.body.current.feelslike + ' degrees.')

    //     }
    //     })