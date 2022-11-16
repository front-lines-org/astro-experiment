<script>
  import { onMount, onDestroy } from 'svelte';
  import { Map } from 'maplibre-gl';
  import 'maplibre-gl/dist/maplibre-gl.css';
  import polygonSmooth from '@turf/polygon-smooth';
  import ukraine2 from './ukraine2';
  import linearInterpolator from 'lerp';
  import dayjs from 'dayjs';

  let map;
  let mapContainer;
  let day = dayjs('2022-02-24');
  let nextValue = null;
  let current = null;
  let delta = 0;
  let lastCall = Date.now();

  const fetchNextValue = async () => {
    day = day.add(1, 'day');
    nextValue = await fetch(`/geojson/ukraine/${day.format('YYYY-MM-DD')}.json`).then((res) => res.json());
  };

  function rotateCamera(timestamp) {
    // clamp the rotation between 0 -360 degrees
    // Divide timestamp by 100 to slow rotation to ~10 degrees / sec
    map.rotateTo((timestamp / 300) % 360, { duration: 0 });
    // Request the next frame of the animation.
    requestAnimationFrame(rotateCamera);
  }

  function morphGeojson(resultGeojson, moment) {
    return resultGeojson.features.map((feature) => {
      const polygon = feature.geometry.coordinates[0].map((coord, key) => [
        linearInterpolator(feature.properties.oldPointsMap[key][0], coord[0], moment),
        linearInterpolator(feature.properties.oldPointsMap[key][1], coord[1], moment),
      ]);

      return {
        ...feature,
        geometry: { ...feature.geometry, coordinates: [polygon] },
      };
    });
  }

  async function morphPolygon(timestamp) {
    delta = delta + (Date.now() - lastCall) / 1000;
    lastCall = Date.now();
    console.log(delta, timestamp);
    if (current && delta <= 1) {
      const result = morphGeojson(current, delta);

      map.getSource('kherson_russia').setData(
        polygonSmooth(
          {
            type: 'FeatureCollection',
            features: result,
          },
          { iterations: 2 },
        ),
      );
    }

    if (delta > 2) {
      current = nextValue;
      fetchNextValue().catch((err) => console.error(err));
      delta = 0;
    }
    requestAnimationFrame(morphPolygon);
  }

  onMount(() => {
    const apiKey = 'rANfIxfXlXQBoBgQIQPG';

    const initialState = { lat: 46.65581, lng: 32.6178, zoom: 14 };

    map = new Map({
      container: mapContainer,
      style: {
        version: 8,
        sources: {
          osm: {
            type: 'raster',
            tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '&copy; OpenStreetMap Contributors',
            maxzoom: 19,
          },
        },
        layers: [
          {
            id: 'osm',
            type: 'raster',
            source: 'osm', // This must match the source key above
          },
        ],
      },
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom,
      pitch: 70,
      maxPitch: 70,
    });
    map.setMaxPitch(75);
    map.setPitch(75);

    map.on('load', function () {
      // Start the animation.

      var layers = map.getStyle().layers;

      var layers = map.getStyle().layers;
      for (var i = 0; i < layers.length; i++) {
        if (
          layers[i].type === 'symbol' &&
          layers[i].layout['text-field'] &&
          !['place_city', 'place_region', 'place_town', 'place_village'].includes(layers[i].id)
        ) {
          // remove text labels
          map.removeLayer(layers[i].id);
        }
      }

      // Find the index of the first symbol layer in the map style
      var firstSymbolId;
      console.log(map.getStyle().layers);
      for (var i = 0; i < map.getStyle().layers.length; i++) {
        if (map.getStyle().layers[i].id === 'building') {
          firstSymbolId = map.getStyle().layers[i].id;
          break;
        }
      }

      map.setLayoutProperty('label_country', 'text-field', [
        'format',
        ['get', 'name_en'],
        { 'font-scale': 1.2 },
        '\n',
        {},
        ['get', 'name'],
        {
          'font-scale': 0.8,
          'text-font': ['literal', ['libre Franklin']],
        },
      ]);

      map.addSource('kherson_russia', {
        type: 'geojson',
        data: ukraine2,
      });
      map.addLayer(
        {
          id: 'kherson_russia',
          type: 'fill',
          source: 'kherson_russia',
          layout: {},
          paint: {
            'fill-color': ['get', 'fill'],
            'fill-opacity': 0.5,
          },
        },
        firstSymbolId,
      );

      morphPolygon(0);
      // rotateCamera(0);
    });
  });

  onDestroy(() => {
    map?.remove();
  });
</script>

<style>
  .map-wrap {
    position: relative;
    width: 100%;
    height: calc(100vh - 77px); /* calculate height of the screen minus the heading */
  }

  .map {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .watermark {
    position: absolute;
    left: 10px;
    bottom: 10px;
    z-index: 999;
  }
</style>

<div class="map-wrap">
  <h3>{day.format('YYYY-MM-DD')}</h3>
  <a href="https://www.maptiler.com" class="watermark"
    ><img src="https://api.maptiler.com/resources/logo.svg" alt="MapTiler logo" /></a>
  <div class="map" id="map" bind:this={mapContainer} />
</div>
