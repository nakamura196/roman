<template>
  <div>
    <button @click="test">change color</button>

    <v-btn v-for="(color, key) in colors" :key="key" :color="color"> a </v-btn>

    <v-row>
      <v-col>
        <div id="view">
          <button @click="add_node">push</button>
          <v-btn @click="calc_test">test</v-btn>
          <div id="cy"></div>
        </div>
      </v-col>
      <v-col>
        <NewMap :geojson="geojson" :center="center" :markers="markers" />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import Gradient from 'javascript-color-gradient'

import NewMap from '~/components/NewMap.vue'

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
    }
  },
  mounted2() {
    this.view_init()

    /*

    const lat = 46.5
    const lng = 6.5

    const mapIconColor = 'red'

    const marker = {
      latLng: [lat, lng],
      label: 'Helvetii',
      icon: L.divIcon({
        className: 'my-custom-pin',
        html: `<svg version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 149 178">
            <path fill="${mapIconColor}" stroke="#FFF" stroke-width="6" stroke-miterlimit="10" d="M126 23l-6-6A69 69 0 0 0 74 1a69 69 0 0 0-51 22A70 70 0 0 0 1 74c0 21 7 38 22 52l43 47c6 6 11 6 16 0l48-51c12-13 18-29 18-48 0-20-8-37-22-51z"/>
            <circle fill="#FFF" cx="74" cy="75" r="24"/>
        </svg>`,
        iconAnchor: [9, 21],
        iconSize: [18, 21],
      }),
    }

    this.center = [lat, lng]

    this.markers = [marker]

    */
  },
  async mounted() {
    const colorAtIndexTwo = new Gradient()
      .setColorGradient('#4CAF50', '#F44336')
      .setMidpoint(10)
      .getColors()

    console.log(colorAtIndexTwo)

    this.colors = colorAtIndexTwo

    const query = `
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX ex: <https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#>
    SELECT * WHERE {
      ?s a/rdfs:subClassOf*/rdfs:subClassOf ex:Factoid;
        ex:description ?desc . 
      ?s ?p ?ref . 
      ?ref a/rdfs:subClassOf* ?er;
        ex:referencesEntity ?referencesEntity;
        ex:sourceDescription ?sourceDescription . 
      optional {
        ?referencesEntity ex:name ?referencesEntityName;
        a ?referencesEntityType .
        filter (?referencesEntityType != skos:Concept)
      }
      optional { ?ref ex:referencesEntityInContext ?referencesEntityInContext } 
      optional { 
        {
          ?s ?v ?o . ?o a ?typeOfO . ?o a/rdfs:subClassOf*/rdfs:subClassOf ex:Factoid .
        }
        UNION
        {
          ?o ?v ?s . ?o a ?typeOfS . ?o a/rdfs:subClassOf*/rdfs:subClassOf ex:Factoid .
        }
      }
    }`

    const endpoint = process.env.endpoint

    const url = `${endpoint}?query=${encodeURIComponent(query)}`

    let { data } = await this.$axios.get(url)

    data = this.$utils.convertVtoD(data)

    const nodesMap = {}
    const edgesMap = {}

    for (const obj of data) {
      if (
        obj.er ===
        'https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#EntityReference'
      ) {
        continue
      }

      const node = obj.s
      // factoid
      if (!nodesMap[node]) {
        nodesMap[node] = {
          id: node,
          label: obj.desc,
          shape: 'dot',
          color: 'orange',
          shadow: true,
          original_color: 'orange',
          type: 'factoid',
        }
      }

      // referencesEntity
      const referencesEntityNode = obj.referencesEntity
      if (!nodesMap[referencesEntityNode]) {
        const referencesEntityType = obj.referencesEntityType
        // const localReferencesEntityType = referencesEntityType.split("#")[1]
        let color = 'gray'
        // let type = ""
        switch (referencesEntityType) {
          /*
            case 'https://github.com/johnBradley501/FPO/raw/master/fpo.owl#Location':
              // 式の結果が value1 に一致する場合に実行する文
              color = '#98fb98'
              break
              */
          case 'https://pleiades.stoa.org/places/vocab#Place':
            // 式の結果が value1 に一致する場合に実行する文
            color = '#98fb98'
            // type = "place"
            break
          case 'https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#Community':
            // 式の結果が value1 に一致する場合に実行する文
            color = 'red'
            break
          case 'https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#ConceptualObject':
            // 式の結果が value1 に一致する場合に実行する文
            color = 'yellow'
            break
          case 'https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#PhysicalObject':
            // 式の結果が value1 に一致する場合に実行する文
            color = 'yellow'
            break
          case 'https://github.com/johnBradley501/FPO/raw/master/fpo.owl#Group':
            // 式の結果が value1 に一致する場合に実行する文
            color = 'orange'
            break
          case 'https://github.com/johnBradley501/FPO/raw/master/fpo.owl#Person':
            // 式の結果が value1 に一致する場合に実行する文
            color = '#03A9F4'
            break
        }

        nodesMap[referencesEntityNode] = {
          id: referencesEntityNode,
          label: obj.referencesEntityName,
          shape: 'dot',
          color,
          shadow: true,
          original_color: color,
          type: referencesEntityType,
        }
      }

      // factoidとreferencesEntity間のエッジ
      const edge4referencesEntity = `${node}-${referencesEntityNode}`
      edgesMap[edge4referencesEntity] = {
        from: node,
        to: referencesEntityNode,
        // color: "blue",
        color: 'gray',
        arrows: {
          to: {
            enabled: true,
            type: 'arrow',
          },
        },
      }

      const nodeS = node // obj.s

      if (obj.o) {
        const nodeO = obj.o

        let from = null
        let to = null
        if (obj.typeOfO) {
          from = nodeS
          to = nodeO
        } else {
          from = nodeO
          to = nodeS
        }

        // factoid間のエッジ
        const edge = `${from}-${to}`

        edgesMap[edge] = {
          from,
          to,
          color: 'gray',
          arrows: {
            to: {
              enabled: true,
              type: 'arrow',
            },
          },
          type: 'factoidRelation',
        }
      }
    }

    // const res = await this.getAssociatedObjects(nodesMap, edgesMap)
    // nodesMap = res.nodesMap
    // edgesMap = res.edgesMap

    console.log({ nodesMap, edgesMap })

    const nodesArray = []

    /*
    [
            { data: { id: 'cat' } },
            { data: { id: 'bird' } },
            { data: { id: 'ladybug' } },
            { data: { id: 'aphid' } },
            { data: { id: 'rose' } },
            { data: { id: 'grasshopper' } },
            { data: { id: 'plant' } },
            { data: { id: 'wheat' } },
          ]
    */

    for (const nodeId in nodesMap) {
      const node = nodesMap[nodeId]
      const type = node.type
      nodesArray.push({
        data: {
          id: nodeId,
          background_color: node.color,
        },
      })
    }

    const edgesArray = []

    for (const edgeId in edgesMap) {
      const edge = edgesMap[edgeId]
      edgesArray.push({
        data: {
          source: edge.from,
          target: edge.to,
        },
      })
    }

    /*
   [
      { data: { source: 'cat', target: 'bird' } },
      { data: { source: 'bird', target: 'ladybug' } },
      { data: { source: 'bird', target: 'grasshopper' } },
      { data: { source: 'grasshopper', target: 'plant' } },
      { data: { source: 'grasshopper', target: 'wheat' } },
      { data: { source: 'ladybug', target: 'aphid' } },
      { data: { source: 'aphid', target: 'rose' } },
    ]
   */

    const cy = cytoscape({
      container: document.getElementById('cy'),
      boxSelectionEnabled: false,
      autounselectify: true,
      style: cytoscape
        .stylesheet()
        .selector('node')
        .css({
          height: 80,
          width: 80,
          'background-fit': 'cover',
          'border-color': '#000',
          'border-width': 3,
          'border-opacity': 0.5,
          content: 'data(name)',
          'text-valign': 'center',
        })
        .selector('edge')
        .css({
          width: 6,
          'target-arrow-shape': 'triangle',
          'line-color': '#ffaaaa',
          'target-arrow-color': '#ffaaaa',
          'curve-style': 'bezier',
        })
        .selector('node[background_color]')
        .css({
          'background-color': 'data(background_color)',
          'text-outline-color': 'data(background_color)',
        }),
      elements: {
        nodes: nodesArray,
        edges: edgesArray,
      },
      layout: {
        name: 'breadthfirst',
        directed: true,
        padding: 10,
      },
    })

    this.cy = cy

    this.getPlaces(nodesMap)
  },
  methods: {
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

      console.log({ data })

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
    view_init() {
      const cy = cytoscape({
        container: document.getElementById('cy'),
        boxSelectionEnabled: false,
        autounselectify: true,
        style: cytoscape
          .stylesheet()
          .selector('node')
          .css({
            height: 80,
            width: 80,
            'background-fit': 'cover',
            'border-color': '#000',
            'border-width': 3,
            'border-opacity': 0.5,
            content: 'data(name)',
            'text-valign': 'center',
          })
          .selector('edge')
          .css({
            width: 6,
            'target-arrow-shape': 'triangle',
            'line-color': '#ffaaaa',
            'target-arrow-color': '#ffaaaa',
            'curve-style': 'bezier',
          }),
        elements: {
          nodes: [
            { data: { id: 'cat' } },
            { data: { id: 'bird' } },
            { data: { id: 'ladybug' } },
            { data: { id: 'aphid' } },
            { data: { id: 'rose' } },
            { data: { id: 'grasshopper' } },
            { data: { id: 'plant' } },
            { data: { id: 'wheat' } },
          ],
          edges: [
            { data: { source: 'cat', target: 'bird' } },
            { data: { source: 'bird', target: 'ladybug' } },
            { data: { source: 'bird', target: 'grasshopper' } },
            { data: { source: 'grasshopper', target: 'plant' } },
            { data: { source: 'grasshopper', target: 'wheat' } },
            { data: { source: 'ladybug', target: 'aphid' } },
            { data: { source: 'aphid', target: 'rose' } },
          ],
        },
        layout: {
          name: 'breadthfirst',
          directed: true,
          padding: 10,
        },
      })

      this.cy = cy

      this.calc_test()
    },

    test() {
      const geojson = this.geojson
      for (const feature of geojson.features) {
        feature.properties.style = {
          color: 'green',
        }
      }
    },

    calc_test() {
      const cy = this.cy

      // console.log(cy.elements())

      const fromId = 'cat'

      const dijkstra = cy.elements().dijkstra(
        `#${fromId}` /*, function(edge){
        return edge.data('weight');
      } */
      )

      // console.log({dijkstra})

      for (const element of cy.elements()) {
        /*

        const toId = "bird"

        const pathToJ = dijkstra.pathTo( cy.$(`#${toId}`) );
        const distToJ = dijkstra.distanceTo( cy.$(`#${toId}`) );

        console.log({pathToJ, distToJ })

        */

        const toId = element[0]._private.data.id

        if (toId === fromId) {
          continue
        }

        // console.log()

        const pathToJ = dijkstra.pathTo(cy.$(`#${toId}`))
        const distToJ = dijkstra.distanceTo(cy.$(`#${toId}`))

        console.log(toId, { pathToJ, distToJ })
      }
    },
  },
}
</script>
<style scoped>
#cy {
  width: 100%;
  height: 40%;
  position: absolute;
  top: 50px;
  left: 1px;
  text-align: left;
}

body {
  font: 14px helvetica neue, helvetica, arial, sans-serif;
}
</style>
