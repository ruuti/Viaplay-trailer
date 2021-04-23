# Trailers

Node service that takes Viaplay movie resource link (e.g. https://content.viaplay.se/pc-se/film/arrival-2016) as input and based on that returns the URL to the trailer for the movie.

## Usage

Install dependencies by running `npm install`.

Create enviroment configuration file (`.env`) to project root with following contents:

```
PORT=3000
KEY=KEY_TO_TMDD
```

Run service by executing `npm start`.

To request trailer based on Viaplay Content:

```
curl http://localhost:3000/trailer?url=https://content.viaplay.se/pc-se/film/arrival-2016
```
