<template>
  <div>
    <v-container fluid>
      <h2>{{ title }}</h2>
      <l-map
        v-if="markers.length > 0"
        style="z-index: 0; height: 400px; width: 100%"
        :zoom="zoom"
        :center="center"
      >
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <l-geo-json :geojson="geojson" :options="options" />
        <l-marker
          v-for="(marker, key) in markers"
          :key="key"
          :lat-lng="marker.latLng"
        >
          <l-popup>
            <a @click="search(marker.uri)">{{ marker.label }}</a>
          </l-popup>
        </l-marker>
      </l-map>

      {{ markers.length }}

      <v-row class="my-10">
        <v-col>
          <v-simple-table v-if="factoids.length > 0">
            <template #default>
              <thead>
                <tr>
                  <th class="text-left">Factoid</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(factoid, key) in factoids" :key="key">
                  <td>
                    <nuxt-link
                      :to="
                        localePath({
                          name: 'item-id',
                          params: {
                            id: $utils.getIdFromUri(factoid.id),
                          },
                        })
                      "
                      >{{ factoid.description }} ({{
                        $utils.getIdFromUri(factoid.id).replace('f_', 'Fact ')
                      }})</nuxt-link
                    >
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
        <v-col>
          <v-simple-table v-if="personInContexts.length > 0">
            <template #default>
              <thead>
                <tr>
                  <th class="text-left">
                    PersonInContext（条件固定で表示しています。）
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(personInContext, key) in personInContexts"
                  :key="key"
                >
                  <td>
                    <nuxt-link
                      :to="
                        localePath({
                          name: 'pers-id',
                          params: {
                            id: $utils.getIdFromUri(personInContext),
                          },
                        })
                      "
                      >{{ personInContext }}</nuxt-link
                    >
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  components: {},

  data() {
    return {
      baseUrl: process.env.BASE_URL,
      nodeEntity: '', // entityInContext の URI
      title: '',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 5,
      center: [51.505, -0.159],
      markers: [],
      factoids: [],
      personInContexts: [],
      geojson: {},
    }
  },

  head() {
    return {
      title: this.title,
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

  async mounted() {
    const endpoint = process.env.endpoint

    // const filterCriteria = await this.getFilterCriteria()

    const query = `PREFIX geo: <http://www.opengis.net/ont/geosparql#>
      PREFIX dct: <http://purl.org/dc/terms/>
      PREFIX wgs84: <http://www.w3.org/2003/01/geo/wgs84_pos#>
      prefix ex: <https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#>
      PREFIX pleiades: <https://pleiades.stoa.org/places/vocab#>
      PREFIX osspatial: <http://data.ordnancesurvey.co.uk/ontology/spatialrelations/>
      PREFIX osgeo: <http://data.ordnancesurvey.co.uk/ontology/geometry/>

      SELECT * WHERE {
        ?placeUri ex:name ?title; a pleiades:Place . 
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

    // # filter(${filterCriteria})

    const url = `${endpoint}?query=${encodeURIComponent(query)}`

    let { data } = await this.$axios.get(url)

    data = this.$utils.convertVtoD(data)

    console.log(data.length)

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

  methods: {
    // 地名の一覧を取得する
    async getFilterCriteria() {
      const endpoint = process.env.endpoint

      const query = `prefix owl: <http://www.w3.org/2002/07/owl#>
      prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      prefix fpo: <https://github.com/johnBradley501/FPO/raw/master/fpo.owl#>
      prefix ex: <https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#>
      SELECT * WHERE {
        ?place owl:sameAs ?placeUri; a fpo:Location . 

        ?placeRef ex:referencesEntity ?place .
        ?factoid ?propertyWhere ?placeRef . 
        ?factoid a/rdfs:subClassOf* ex:Factoid . 
      }`

      const url = `${endpoint}?query=${encodeURIComponent(query)}`

      let { data } = await this.$axios.get(url)

      data = this.$utils.convertVtoD(data)

      const filters = []

      for (const item of data) {
        filters.push(`?placeUri = <${item.placeUri}>`)
      }
      return filters.join('||')
    },
    // ポップアップの文字列が選択された時の処理
    search(placeUri) {
      this.searchFactoid(placeUri)
      this.searchPerson(placeUri)
    },
    async searchFactoid(placeUri) {
      const endpoint = process.env.endpoint

      const query = `prefix owl: <http://www.w3.org/2002/07/owl#>
      prefix ex: <https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#>

      SELECT DISTINCT * WHERE {
      ?place owl:sameAs <${placeUri}> .
      ?placeRef ex:referencesEntity ?place .
      ?factoid ?propertyWhere ?placeRef; ex:description ?description . 
      }`

      const url = `${endpoint}?query=${encodeURIComponent(query)}`

      const { data } = await this.$axios.get(url)

      const factoids = []
      for (const item of data) {
        factoids.push({
          id: item.factoid,
          description: item.description,
        })
      }
      this.factoids = factoids
    },
    async searchPerson(placeUri) {
      // テストのために残しています。
      placeUri = 'https://pleiades.stoa.org/places/167922'

      const endpoint = process.env.endpoint

      const query = `prefix owl: <http://www.w3.org/2002/07/owl#>
      prefix ex: <https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#>

      SELECT DISTINCT * WHERE {
        ?place owl:sameAs <${placeUri}> .
        ?placeRef ex:contextualAspectOf ?place .
        ?personInContext ex:hasLocation ?placeRef .
      }`

      const url = `${endpoint}?query=${encodeURIComponent(query)}`

      const { data } = await this.$axios.get(url)

      const personInContexts = []
      for (const item of data) {
        personInContexts.push(item.personInContext)
      }
      this.personInContexts = personInContexts
    },
  },
}
</script>
