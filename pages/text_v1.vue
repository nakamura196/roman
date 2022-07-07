<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col id="textDiv" :style="`height: ${height}px; overflow-y: auto`">
          <TEI v-if="element" :element="element" />
        </v-col>
        <v-col :style="`height: ${height}px; overflow-y: auto`">
          <FactoidBlock
            v-if="selectedFactoidIdOnText"
            :id="selectedFactoidIdOnText"
          />
          <EntityBlock
            v-if="selectedEntityIdOnText"
            :id="$utils.getIdFromUri(selectedEntityIdOnText)"
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
      this.scroll(val)
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
    const res = await axios.get(this.baseUrl + '/xml/BG_1_TEI.xml')

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
        scrollTo('#' + id, 500, {
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
