const {nextISSTimesForMyLocation} = require('./iss_promised');

const convertPassTimes = (passTimes) => {
  console.log('The ISS will be overhead your location at the following times:');
  for (let time of passTimes) {
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(time.risetime);
    const duration = time.duration;
    let durationInMins = duration / 60;
    durationInMins = Math.round(durationInMins);
    console.log(`${dateTime} for ${durationInMins} minutes.`);
  }
};

  nextISSTimesForMyLocation()
    .then((passTimes) => {
      let flyOvers = JSON.parse(passTimes).response;
      convertPassTimes(flyOvers);
    });