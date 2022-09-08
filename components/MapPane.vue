<template>
  <div>
    <NewMap :geojson="geojson" :center="center" :markers="markers" />
  </div>
</template>
<script>
import Gradient from 'javascript-color-gradient'

import * as md5 from 'md5'
import NewMap from '~/components/NewMap.vue'

const colors = new Gradient()
  .setColorGradient('#4CAF50', '#F44336')
  .setMidpoint(10)

const cytoscape = require('cytoscape')

export default {
  components: {
    NewMap,
  },
  data() {
    return {
      markers: [],
      center: [46.5, 6.5],
      geojson: {},
      colors: [],
      cy: null,
      places: [],
    }
  },
  computed: {
    cyElements: {
      // getter 関数
      get() {
        return this.$store.getters.getCyElements
      },
      // setter 関数
      set(value) {
        this.$store.commit('setCyElements', value)
      },
    },
    clickedNodeIdOnNetwork: {
      get() {
        return this.$store.getters.getClickedNodeIdOnNetwork
      },
      // setter 関数
      set(value) {
        this.$store.commit('setClickedNodeIdOnNetwork', value)
      },
    },
  },
  watch: {
    clickedNodeIdOnNetwork(val) {
      if (!val) {
        return
      }
      const clickedNodeIdOnNetwork = this.clickedNodeIdOnNetwork
      const cy = this.cy

      const fromId = md5(clickedNodeIdOnNetwork)

      const dijkstra = cy.elements().dijkstra(
        `#${fromId}` /*, function(edge){
        return edge.data('weight');
      } */
      )

      const toIds = this.places

      const distances = {}

      for (const toId of toIds) {
        const toIdMd5 = md5(toId)
        const distToJ = dijkstra.distanceTo(cy.$(`#${toIdMd5}`))
        distances[toId] = distToJ
      }

      // geojson

      const geojson = this.geojson

      for (const feature of geojson.features) {
        const uri = feature.properties.uri
        if (distances[uri]) {
          feature.properties.style.color = colors.getColor(distances[uri])
        }
      }

      // markers
    },
    async cyElements() {
      const places = []
      const cyElements = this.cyElements
      //
      const nodes = cyElements.elements.nodes
      if (!nodes) {
        return
      }
      for (const node of nodes) {
        if (node.data.type === 'https://pleiades.stoa.org/places/vocab#Place') {
          places.push(node.data.uri)
        }
      }

      this.places = places

      if (places.length === 0) {
        return
      }

      const query = `PREFIX geo: <http://www.opengis.net/ont/geosparql#>
      PREFIX dct: <http://purl.org/dc/terms/>
      PREFIX wgs84: <http://www.w3.org/2003/01/geo/wgs84_pos#>
      prefix ex: <https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#>
      PREFIX pleiades: <https://pleiades.stoa.org/places/vocab#>
      PREFIX osspatial: <http://data.ordnancesurvey.co.uk/ontology/spatialrelations/>
      PREFIX osgeo: <http://data.ordnancesurvey.co.uk/ontology/geometry/>

      SELECT distinct * WHERE {
        ?placeUri ex:name ?title; a pleiades:Place . 
        filter (?placeUri in (${places
          .map((place) => `<${place}>`)
          .join(', ')}))
        {
          { ?placeUri wgs84:lat ?lat; wgs84:long ?long . } 
          UNION 
          # { ?placeUri pleiades:hasLocation/osspatial:partiallyOverlaps/geo:hasGeometry/osgeo:asGeoJSON ?geo }
          { ?placeUri pleiades:hasLocation/osgeo:asGeoJSON ?geo }
          UNION
          { ?placeUri osspatial:within/osgeo:extent/osgeo:asGeoJSON ?geo }
           UNION
          { ?placeUri osspatial:partiallyOverlaps/osgeo:extent/osgeo:asGeoJSON ?geo }
        
        }
      }`

      const endpoint = process.env.endpoint

      const url = `${endpoint}?query=${encodeURIComponent(query)}`

      let { data } = await this.$axios.get(url)

      data = this.$utils.convertVtoD(data)

      const markers = []

      const features = []

      for (const item of data) {
        // 緯度・経度がない場合はスキップ
        if (item.geo) {
          // console.log(item)
          features.push({
            type: 'Feature',
            geometry: JSON.parse(item.geo),
            properties: {
              label: item.title,
              uri: item.placeUri,
              style: {
                color: 'red',
              },
            },
          })
          continue
        } else if (item.lat) {
          markers.push({
            uri: item.placeUri,
            label: item.title,
            latLng: [item.lat, item.long],
          })
        }
      }

      const geojson = {
        type: 'FeatureCollection',
        features,
      }
      this.geojson = geojson

      this.markers = markers

      this.setCy()
    },
  },
  mounted() {},
  methods: {
    setCy() {
      const cy = cytoscape(this.cyElements)

      this.cy = cy
    },
    add_node() {
      this.cy.add([
        {
          group: 'nodes',
          data: { id: 'node' + this.count },
          position: { x: 300, y: 200 },
        },
        {
          group: 'edges',
          data: {
            id: 'edge' + this.count,
            source: 'node' + this.count,
            target: 'cat',
          },
        },
      ])
    },
    async getPlaces(nodesMap) {
      const places = []
      for (const uri in nodesMap) {
        const node = nodesMap[uri]
        if (node.type === 'https://pleiades.stoa.org/places/vocab#Place') {
          places.push(uri)
        }
      }

      const query = `PREFIX geo: <http://www.opengis.net/ont/geosparql#>
      PREFIX dct: <http://purl.org/dc/terms/>
      PREFIX wgs84: <http://www.w3.org/2003/01/geo/wgs84_pos#>
      prefix ex: <https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#>
      PREFIX pleiades: <https://pleiades.stoa.org/places/vocab#>
      PREFIX osspatial: <http://data.ordnancesurvey.co.uk/ontology/spatialrelations/>
      PREFIX osgeo: <http://data.ordnancesurvey.co.uk/ontology/geometry/>

      SELECT distinct * WHERE {
        ?placeUri ex:name ?title; a pleiades:Place . 
        filter (?placeUri in (${places
          .map((place) => `<${place}>`)
          .join(', ')}))
        {
          { ?placeUri wgs84:lat ?lat; wgs84:long ?long . } 
          UNION 
          # { ?placeUri pleiades:hasLocation/osspatial:partiallyOverlaps/geo:hasGeometry/osgeo:asGeoJSON ?geo }
          { ?placeUri pleiades:hasLocation/osgeo:asGeoJSON ?geo }
          UNION
          { ?placeUri osspatial:within/osgeo:extent/osgeo:asGeoJSON ?geo }
           UNION
          { ?placeUri osspatial:partiallyOverlaps/osgeo:extent/osgeo:asGeoJSON ?geo }
        
        }
      }`

      const endpoint = process.env.endpoint

      const url = `${endpoint}?query=${encodeURIComponent(query)}`

      let { data } = await this.$axios.get(url)

      data = this.$utils.convertVtoD(data)

      const markers = []

      const features = []

      for (const item of data) {
        // 緯度・経度がない場合はスキップ
        if (item.geo) {
          // console.log(item)
          features.push({
            type: 'Feature',
            geometry: JSON.parse(item.geo),
            properties: {
              label: item.title,
              uri: item.placeUri,
              style: {
                color: 'red',
              },
            },
          })
          continue
        } else if (item.lat) {
          markers.push({
            uri: item.placeUri,
            label: item.title,
            latLng: [item.lat, item.long],
          })
        }
      }

      const geojson = {
        type: 'FeatureCollection',
        features,
      }
      this.geojson = geojson

      this.markers = markers
    },
  },
}
</script>
