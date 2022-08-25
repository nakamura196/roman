<template>
  <div>
    <div id="view">
    <button @click="add_node">push</button>
    <div id="cy"></div>
  </div>
    <NewMap v-if="false" :center="center" :markers="markers" />
  </div>
</template>
<script>
import NewMap from '~/components/NewMap.vue'
const cytoscape = require("cytoscape")

export default {
  components: {
    NewMap,
  },
  data() {
    return {
      markers: [],
      center: [46.5, 6.5],
    }
  },
  mounted() {
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
  async mounted2() {
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

    for (const obj of data) {
      const referencesEntityNode = obj.referencesEntity
      const referencesEntityType = obj.referencesEntityType
      switch (referencesEntityType) {
        /*
            case 'https://github.com/johnBradley501/FPO/raw/master/fpo.owl#Location':
              // 式の結果が value1 に一致する場合に実行する文
              color = '#98fb98'
              break
              */
        case 'https://pleiades.stoa.org/places/vocab#Place':
          console.log({
            referencesEntityNode,
            obj,
          })
      }
    }
  },
  methods: {
    add_node () {
      console.info(this.cy)
      this.cy.add([
        { 'group': 'nodes', data: { 'id': 'node' + this.count }, position: { x: 300, y: 200 } },
        {'group': 'edges', data: {'id': 'edge' + this.count, 'source': 'node' + this.count, 'target': 'cat'}}
      ])
    },
    view_init () {
    this.cy = cytoscape(
      {
        container: document.getElementById('cy'),
        boxSelectionEnabled: false,
        autounselectify: true,
        style: cytoscape.stylesheet()
            .selector('node')
            .css({
              'height': 80,
              'width': 80,
              'background-fit': 'cover',
              'border-color': '#000',
              'border-width': 3,
              'border-opacity': 0.5,
              'content': 'data(name)',
              'text-valign': 'center'
            })
            .selector('edge')
            .css({
              'width': 6,
              'target-arrow-shape': 'triangle',
              'line-color': '#ffaaaa',
              'target-arrow-color': '#ffaaaa',
              'curve-style': 'bezier'
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
            { data: { id: 'wheat' } }
          ],
          edges: [
            { data: { source: 'cat', target: 'bird' } },
            { data: { source: 'bird', target: 'ladybug' } },
            { data: { source: 'bird', target: 'grasshopper' } },
            { data: { source: 'grasshopper', target: 'plant' } },
            { data: { source: 'grasshopper', target: 'wheat' } },
            { data: { source: 'ladybug', target: 'aphid' } },
            { data: { source: 'aphid', target: 'rose' } }
          ]
        },
        layout: {
          name: 'breadthfirst',
          directed: true,
          padding: 10
        }
      }
    )
  }
  }
}
</script>
<style scoped>
#cy {
    width: 100%;
    height: 80%;
    position: absolute;
    top: 50px;
    left: 1px;
    text-align: left;
}

body {
  font: 14px helvetica neue, helvetica, arial, sans-serif;
}
</style>