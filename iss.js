const request = require('request');


const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP. Response ${body}`), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};


const fetchCoordsByIP = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, function(error, response, body) {
    if (error) {
      return callback(error, null);
    } 
    
    if (response.statusCode !== 200) {
      const errMsg = `Status Code ${response.statusCode} when fetching IP coordinates. Response: ${body}`;
      return callback(Error(errMsg), null);
    }
    
    const ipLatLon = {};
      ipLatLon.latitude = JSON.parse(body).latitude;
      ipLatLon.longitude = JSON.parse(body).longitude;
      if (ipLatLon) {
        callback(null, ipLatLon);
      }
  });
};


const fetchISSFlyOverTimes = function (ipLatLon, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${ipLatLon.latitude}&lon=${ipLatLon.longitude}&n=5`, function (error, response, body) {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const errMsg = `Status Code ${response.statusCode} when fetching ISS flyover estimates. Response: ${body}`;
      callback(Error(errMsg), null);
      return;
    }

    const flyOvers = JSON.parse(body).response;
    callback(null, flyOvers);
  });
};


const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, ipLatLon) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(ipLatLon, (error, flyOvers) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, flyOvers);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };