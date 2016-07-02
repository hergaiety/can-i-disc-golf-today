# Can I Disc Golf Today?
A Webtask ready api ready to tell you if the weather looks good for Disc Golfing this weekend.

[Premade example](https://webtask.it.auth0.com/api/run/wt-sharpshark28-gmail_com-0/discGolfWeekend?webtask_no_cache=1)

---

Optional additional params are available:

```
?where="Austin,US"
?min=50
?max=100
?wind=50
```

## How do I generate my own?
This tool is built on Node/npm/[Webtask](https://webtask.io). Clone this repo locally and within it run:

```
wt create app.js --secret OPEN_WEATHER_KEY={Your Key}
```

Where `{Your Key}` is an API key you generate from [OpenWeatherMap](https://openweathermap.org/).
