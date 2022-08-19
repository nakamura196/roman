<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col id="textDiv" :style="`height: ${height}px; overflow-y: auto`">
          <TEI v-if="element" :element="element" />
        </v-col>
        <v-col :style="`height: ${height}px; overflow-y: auto`">
          <!--
          <FactoidBlock
            v-if="selectedFactoidIdOnText"
            :id="selectedFactoidIdOnText"
          />
          -->
          <!-- v-if="selectedFactoidIdOnText" -->

          <!--factoidのIDは、/を含めない形にする必要がある-->
          <FactoidBlock2
            :id="selectedFactoidIdOnText"
          />
          <!--
          <EntityBlock
            v-if="selectedEntityIdOnText"
            :id="$utils.getIdFromUri(selectedEntityIdOnText)"
          />
          -->
          <EntityBlock
            v-if="selectedEntityIdOnText"
            :id="selectedEntityIdOnText"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import axios from 'axios'

const convert = require('xml-js')
const { scroller } = require('vue-scrollto/src/scrollTo')

export default {
  layout: 'noFooter',
  data() {
    return {
      baseUrl: process.env.BASE_URL,
      top: process.env.top,
      siteName: process.env.siteName,
      element: null,
      height: window.innerHeight - 64,
    }
  },
  computed: {
    /*
    height : {
      get() {
        return window.innerHeight - 64
      }
    },
    */
    wordAttributes: {
      // getter 関数
      get() {
        return this.$store.getters.getWordAttributes
      },
      // setter 関数
      set(value) {
        this.$store.commit('setWordAttributes', value)
      },
    },
    selectedFactoidIdOnText: {
      // getter 関数
      get() {
        return this.$store.getters.getSelectedFactoidIdOnText
      },
      // setter 関数
      set(value) {
        this.$store.commit('setSelectedFactoidIdOnText', value)
      },
    },
    selectedEntityIdOnText: {
      // getter 関数
      get() {
        return this.$store.getters.getSelectedEntityIdOnText
      },
      // setter 関数
      set(value) {
        this.$store.commit('setSelectedEntityIdOnText', value)
      },
    },
    selectedReferenceIdOnText: {
      // getter 関数
      get() {
        return this.$store.getters.getSelectedReferenceIdOnText
      },
      // setter 関数
      set(value) {
        this.$store.commit('setSelectedReferenceIdOnText', value)
      },
    },
    entityAttributes: {
      // getter 関数
      get() {
        return this.$store.getters.getEntityAttributes
      },
      // setter 関数
      set(value) {
        this.$store.commit('setEntityAttributes', value)
      },
    },
  },
  watch: {
    selectedFactoidIdOnText(val) {
      const id = this.$utils.getIdFromUri(val)
      this.scroll(id)
    },

    selectedEntityIdOnText(val) {
      const entityAttributes = this.entityAttributes
      for (const entityReferenceId in entityAttributes) {
        const entityInContextId = entityAttributes[entityReferenceId]
        if (entityInContextId === val) {
          this.selectedReferenceIdOnText = entityReferenceId
          break
        }
      }
    },
    selectedReferenceIdOnText(val) {
      this.scroll(val)
    },
  },
  async mounted() {
    const res = await axios.get(process.env.tei_url)

    const parser = new window.DOMParser()
    const xmlData = parser.parseFromString(res.data, 'text/xml')

    const df = JSON.parse(
      convert.xml2json(xmlData.querySelector('text').outerHTML, {
        compact: false,
        spaces: 4,
      })
    )

    // idの一覧を取得する
    const ws = xmlData.querySelectorAll('w')

    const wids = []
    for (const w of ws) {
      const id = w.getAttribute('xml:id')
      wids.push(id)
    }

/*
    const query4factoids = `
    prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    prefix ex: <https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#>
    select * where {
      ?s a/rdfs:subClassOf* ex:Factoid;
            a ?type;
            ex:from ?from;
            ex:to ?to;
            ex:description ?description;
            ?p ?ref . 
      ?ref a/rdfs:subClassOf* ex:EntityReference;
            a ?ref_type;
            ex:referencesEntity ?ref_referencesEntity;
            ex:sourceDescription ?ref_sourceDescription . 
      optional { ?ref ex:referencesEntityInContext ?ref_referencesEntityInContext } 
    }
    `
*/

    const query4factoids = `
    prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    prefix ex: <https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#>
    select * where {
      ?s a/rdfs:subClassOf*/rdfs:subClassOf ex:Factoid;
            a ?type;
            ex:from ?from;
            ex:to ?to;
            ex:description ?description;
            ?p ?ref . 
            optional {?ref ex:sourceDescription ?ref_sourceDescription; ex:referencesEntityInContext ?ref_referencesEntityInContext}
    }
    `

    const endpoint = process.env.endpoint

    const url = `${endpoint}?query=${encodeURIComponent(query4factoids)}`

    let { data } = await this.$axios.get(url)

    data = this.$utils.convertVtoD(data)

    const factoids = {}
    for (const obj of data) {
      const factoidUri = obj.s
      if(!factoids[factoidUri]) {
        factoids[factoidUri] = obj
        factoids[factoidUri].refs = []
      }
      factoids[factoidUri].refs.push(obj)
    }

    const metadata = {}
    const entityAttributes = {}

    for(const factoidUri in factoids){
      const factoid = factoids[factoidUri]
      const spanId = factoidUri // span.getAttribute('xml:id')
      const type = factoid.type.split("#")[1]

      const from = this.$utils.getIdFromUri(factoid.from)
      const to = this.$utils.getIdFromUri(factoid.to)

      const indexFrom = wids.indexOf(from)
      const indexTo = wids.indexOf(to)

      const note = factoid.description

      for (let index = indexFrom; index <= indexTo; index++) {
        const id = wids[index]
        if (!metadata[id]) {
          metadata[id] = []
        }
        metadata[id].push({
          id: spanId,
          type,
          note,
        })
      }

      for(const ref of factoid.refs){
        /*
        if (!name.getAttribute('target')) {
          continue
        }
        */
        // const refs = name.querySelectorAll('ref')
        // for (const ref of refs) {
          /*
          if (ref.getAttribute('ana') === 'referencesEntityInContext') {
            const correspId = name.getAttribute('target').replace('#', '')
            const referencesEntityInContextUri = ref.getAttribute('target')
            entityAttributes[correspId] = referencesEntityInContextUri
          }
          */

         if(ref.ref_referencesEntityInContext){
          const correspId = this.$utils.getIdFromUri(ref.ref_sourceDescription)
          const referencesEntityInContextUri = ref.ref_referencesEntityInContext
          entityAttributes[correspId] = referencesEntityInContextUri
         }

        // }
      }

      // break
    }

    /*
    // span毎に処理を加える
    const spans = xmlData.querySelector('spanGrp').querySelectorAll('span')

    const metadata = {}
    const entityAttributes = {}

    for (const span of spans) {
      const spanId = span.getAttribute('xml:id')
      const type = span.getAttribute('type')

      const from = span.getAttribute('from').slice(1)
      const to = span.getAttribute('to').slice(1)

      const indexFrom = wids.indexOf(from)
      const indexTo = wids.indexOf(to)

      const note = span.querySelector('note').textContent

      for (let index = indexFrom; index <= indexTo; index++) {
        const id = wids[index]
        if (!metadata[id]) {
          metadata[id] = []
        }
        metadata[id].push({
          id: spanId,
          type,
          note,
        })
      }

      // -----

      const names = span.querySelectorAll('name')
      for (const name of names) {
        if (!name.getAttribute('target')) {
          continue
        }
        const refs = name.querySelectorAll('ref')
        for (const ref of refs) {
          if (ref.getAttribute('ana') === 'referencesEntityInContext') {
            const correspId = name.getAttribute('target').replace('#', '')
            const referencesEntityInContextUri = ref.getAttribute('target')
            entityAttributes[correspId] = referencesEntityInContextUri
          }
        }
      }
    }

    */

    this.wordAttributes = metadata
    this.entityAttributes = entityAttributes
    this.element = df

    const fId = this.$route.query.f_id
    if (fId) {
      this.selectedFactoidIdOnText = fId

      const self = this
      setTimeout(function () {
        self.scroll(fId)
      }, 500)
    }
  },
  methods: {
    scroll(id) {
      if (!id) {
        return
      }
      try {
        const scrollTo = scroller()
        scrollTo(`#roman-${id}`, 500, {
        // scrollTo(id, 500, {
          offset: -100,
          container: '#textDiv',
          y: true,
        })
      } catch (e) {
        console.log({ e })
      }
    },
  },
}
</script>
