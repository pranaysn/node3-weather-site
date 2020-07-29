const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoicHJuYXkiLCJhIjoiY2tjdDFuYnEwMTA5djJzcGR5Mjc2bG03dCJ9.pEPHdQhVPFd6qViV3YyhQw&limit=1'

    request({url: url, json: true}, (error, response)=>{
            if (error) {
                    callback('Your are not connected to geodata.', undefined) /// undefine bcoz geocode function data not present
                    } 
            else if (response.body.message || (response.body.features.length === 0))
                    {
                    callback('Unable to find location. Try another search.', undefined)
                    }
            else 
            {

                callback(undefined, {
                    latitude : response.body.features[0].center[1],
                    logitude : response.body.features[0].center[0],
                    location : response.body.features[0].place_name

                })   
                    

                    //Without callback function 
                    // const latitude = (undefined, response.body.features[0].center[1])
                    // const logitude = (undefined, response.body.features[0].center[0])
                    // console.log(response.body.features[0].place_name)
                    // console.log('latitude - ' + latitude + ' logitude - '+ logitude)
            }
    })

}





module.exports = geocode  /// this goecode name is function which 
                          /// is define up and use this name geocode for exporting
                          ///to any file with geocode = require (address of file)  