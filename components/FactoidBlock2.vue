<template>
  <div>
    <h2 v-if="item.description" class="mb-5">
      {{ item.description }} ({{ $utils.createFactoidTitleFromId(id) }})
    </h2>

    <template v-if="xml">
      <h3 class="mt-5">このFactoidの典拠</h3>

      <span v-html="xml" />
    </template>

    <template v-if="markers.length > 0 || geojson">
      <v-switch v-model="isMapDisplayed" :label="`Display Map`"></v-switch>
      <Map
        v-show="isMapDisplayed"
        :markers="markers"
        :center="center"
        :geojson="geojson"
      />
    </template>

    <FactoidNetwork2 :id="item.s" />

    <div v-if="false" class="mt-5">
      <h2>Text</h2>

      <TeiText :id="item.s" class="mt-2"></TeiText>
    </div>
  </div>
</template>

<script>
// import { Network } from 'vue-visjs'
import axios from 'axios'
import FactoidNetwork2 from '~/components/FactoidNetwork2.vue'
import TeiText from '~/components/TeiText.vue'

export default {
  components: {
    FactoidNetwork2,
    TeiText,
  },
  props: {
    id: {
      type: String,
      require: true,
      default: '',
    },
  },
  data() {
    return {
      xml: '',
      geo: {},
      markers: [],
      center: [51.505, -0.159],
      geojson: null,
      item: {},
      isMapDisplayed: false,
    }
  },
  computed: {},
  watch: {
    id() {
      this.init()
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      this.geo = {}
      this.markers = []

      await this.getItem()

      // pleiadesから緯度・経度情報の取得
      // this.getPlaceInfo()
    },

    async getItem() {
      const url = process.env.endpoint

      const id = this.id
      const uri = 'http://www.example.com/roman-ontology/resource/Factoid/' + id

      const query4Fact = `
        prefix fpo: <https://github.com/johnBradley501/FPO/raw/master/fpo.owl#>
        prefix owl: <http://www.w3.org/2002/07/owl#>
        prefix ex: <https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#>
        select distinct * where {
            ?s ex:description ?description .
            filter (?s = <${uri}> ) .

            optional {
              { ?s ex:atWhere/ex:referencesEntity/owl:sameAs ?placeUri . }
              UNION
              { ?s ex:fromWhere/ex:referencesEntity/owl:sameAs ?placeUri . }
              UNION
              { ?s ex:toWhere/ex:referencesEntity/owl:sameAs ?placeUri . }
              UNION
              { ?s ex:nearWhere/ex:referencesEntity/owl:sameAs ?placeUri . }
            }
        }`

      const data4Fact = (
        await axios.get(`${url}?query=${encodeURIComponent(query4Fact)}`)
      ).data

      const item = {}
      for (let i = 0; i < data4Fact.length; i++) {
        const eachData4Fact = data4Fact[i]
        if (i === 0) {
          for (const key in eachData4Fact) {
            item[key] = eachData4Fact[key]
          }
          item.placeUri = []
        }

        item.placeUri.push(eachData4Fact.placeUri)
      }

      this.item = item
    },

    // pleiadesから緯度・経度情報の取得
    async getPlaceInfo() {
      const item = this.item

      const stmts = []
      for (const placeUri of item.placeUri) {
        stmts.push(`?placeUri = <${placeUri}>`)
      }
      const filterCriteria = stmts.join(' || ')

      // const filterCriteria = `?placeUri = <${item.placeUri}>`
      const endpoint =
        'https://triplydb.com/_api/datasets/wouter/pleiades/services/pleiades/sparql'

      const query = `PREFIX geo: <http://www.opengis.net/ont/geosparql#>
      PREFIX dct: <http://purl.org/dc/terms/>
      PREFIX wgs84: <http://www.w3.org/2003/01/geo/wgs84_pos#>

      PREFIX pleiades: <https://pleiades.stoa.org/places/vocab#>
      PREFIX osspatial: <http://data.ordnancesurvey.co.uk/ontology/spatialrelations/>
      PREFIX osgeo: <http://data.ordnancesurvey.co.uk/ontology/geometry/>

      SELECT * WHERE {
        ?placeUri dct:title ?title .
        optional {
          { ?placeUri wgs84:lat ?lat; wgs84:long ?long . }
          UNION
          { ?placeUri pleiades:hasLocation/osspatial:partiallyOverlaps/geo:hasGeometry/osgeo:asGeoJSON ?geo }
        }
        filter(${filterCriteria})
      }`

      const url = `${endpoint}?query=${encodeURIComponent(query)}`

      const { data } = await this.$axios.get(url)

      if (data.length > 0) {
        const features = []

        const markers = []
        let center = []

        for (const geo of data) {
          if (!geo.lat) {
            features.push({
              type: 'Feature',
              geometry: JSON.parse(geo.geo),
              properties: {
                label: geo.title,
                uri: geo.placeUri,
              },
            })
          } else {
            const marker = {
              latLng: [geo.lat, geo.long],
              label: geo.title,
            }
            markers.push(marker)
            center = [geo.lat, geo.long]
          }
        }

        if (features.length > 0) {
          const geojson = {
            type: 'FeatureCollection',
            features,
          }
          this.geojson = geojson
        }

        if (markers.length > 0) {
          this.markers = markers
          this.center = center
        }
      }
    },
  },
}
</script>
