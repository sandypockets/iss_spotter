const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');


// Commented out for now since we have completed verification that it works.
/* fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log('It worked! Returned IP:', ip);
});


fetchCoordsByIP('99.249.137.66', (error, ipLatLon) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log("It worked! Returned IP coordinates:", ipLatLon);
});


const ipLatLon = { latitude: 44.5185, longitude: -80.0201 };
fetchISSFlyOverTimes(ipLatLon, (error, flyOvers) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log("It worked! Returning flyover times:", flyOvers);
}); */

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  console.log(passTimes);
});