'use latest';
require('isomorphic-fetch');

module.exports = function(ctx, done) {
  // Params
  let appid = ctx.secrets.OPEN_WEATHER_KEY;
  let where = ctx.data.where || 'Austin,US';
  let tempRange = [ctx.data.min || 50, ctx.data.max || 100]; //Imperial (F)
  let windMaxSpeed = ctx.data.wind || 50;
  // URL built from above params
  let weatherCastURL = `http://api.openweathermap.org/data/2.5/forecast/daily?mode=json&units=imperial&country=US&cnt=7&q=${where}&APPID=${appid}`;
  // Weekend days offset from today
  let today = new Date().getDay();
  let saturday = 6 - today;
  let sunday = 7 - today;
  // Function to decide if each day's weather is appropriate for disc golfing
  let analyze = days => days.map((day, i) => {
    // Poor weather conditions and relevant user message
    let notClear = day.weather[0].main !== 'Clear'
      ? `Its calling for ${day.weather[0].description}.` : '';
    let tooCold = day.temp.day < tempRange[0] 
      ? `Brr... Its only ${Math.round(day.temp.day)}F.`: '';
    let tooHot = day.temp.day >= tempRange[1]
      ? `Phew! Its going to be ${Math.round(day.temp.day)}F.` : '';
    let tooWindy = day.speed > windMaxSpeed
      ? `May be too windy with wind speeds of ${day.speed}mph.` : '';
    let details = notClear || tooHot || tooCold || tooWindy || 'Go Disc Golfing!';
    // Build object to return for each day
    return {
      day: ['Saturday', 'Sunday'][i],
      greatWeather: details === 'Go Disc Golfing!',
      details
    };
  });

  // Fetch weather
  fetch(weatherCastURL)
    .then(r => r.json())
    .then(r => [r.list[saturday], r.list[sunday]]) // We only care about the weekends
    .then(r => analyze(r)) // Map over each day to determine if they're good for disc golf
    .then(r => done(null, r)) // Return content to the user
    .catch(e => done(null, e.error));
};
