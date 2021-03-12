const { nextISSTimesForMyLocation } = require('./iss');

const convertPassTimes = (passTimes) => {
  console.log('The ISS will be overhead your location at the following times:')
  for (let time of passTimes) {
    let dateTime = new Date(0);
    dateTime.setUTCSeconds(time.risetime);
    let duration = time.duration;
    let durationInMins = duration / 60;
    durationInMins = Math.round(durationInMins);
    console.log(`${dateTime} for ${durationInMins} minutes.`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  convertPassTimes(passTimes);
});