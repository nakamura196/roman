<template>
  <div>
    <l-map
      style="z-index: 0; height: 600px; width: 100%"
      :zoom="zoom"
      :center="center"
    >
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-geo-json
        v-if="geojson && Object.keys(geojson).length > 0"
        :geojson="geojson"
        :options="options"
      />
      <l-marker
        v-for="(marker, key) in markers"
        :key="key"
        :lat-lng="marker.latLng"
      >
        <l-popup>
          <a>{{ marker.label }}</a>
        </l-popup>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
export default {
  props: {
    markers: {
      type: Array,
      require: false,
      default: () => [],
    },
    center: {
      type: Array,
      require: false,
      default: () => [51.505, -0.159],
    },
    geojson: {
      type: Object,
      require: false,
      default: () => null,
    },
  },
  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 5,
    }
  },
  computed: {
    options() {
      return {
        onEachFeature: this.onEachFeatureFunction,
      }
    },
    onEachFeatureFunction() {
      return (feature, layer) => {
        layer.bindPopup(
          `<div><a @click="search(${feature.properties.uri})">${feature.properties.label}</a></div>`
        )
      }
    },
  },
}
</script>
