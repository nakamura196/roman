<template>
  <div>
    <Breadcrumbs :items="bh" />
    <v-container class="my-5">
      <h2>{{ title }}</h2>

      <div class="pa-2" style="height: 400px; overflow-y: auto">
        <v-card
          v-for="(factoid, key) in factoids"
          :key="key"
          outlined
          flat
          class="mt-5 pa-4"
        >
          <template v-if="factoid">
            <h3>
              <nuxt-link
                :to="
                  localePath({
                    name: 'item-id',
                    params: { id: factoid.s.split('fact_')[1] },
                  })
                "
                >{{ getFactoidName(factoid.s) }}
              </nuxt-link>
            </h3>
            <div class="mt-2">
              {{ factoid.description.join() }}
            </div>
            <template
              v-for="(type, key2) in [
                'follow',
                'precedent',
                'parallel',
                'because',
                'therefore',
              ]"
            >
              <div v-if="factoid[type].length > 0" :key="key2">
                {{ type }}:
                <span v-for="(value, key3) in factoid[type]" :key="key3">
                  {{ getFactoidName(value) }}
                </span>
              </div>
            </template>
          </template>
          <template v-else>
            {{ aaa(factoid) }}
          </template>
        </v-card>
      </div>
    </v-container>
  </div>
</template>
<script>
import Breadcrumbs from '~/components/layout/Breadcrumbs.vue'
const url = 'https://dydra.com/junjun7613/romanfactoid_v2/sparql'

export default {
  components: {
    Breadcrumbs,
  },

  data() {
    return {
      title: this.$t('search'),
      factoids: [],

      bh: [
        {
          text: this.$t('top'),
          disabled: false,
          to: this.localePath({ name: 'index' }),
          exact: true,
        },
        {
          text: this.$t('search'),
        },
      ],
    }
  },

  head() {
    return {
      title: this.title,
    }
  },

  mounted() {
    // factNodeの一覧を取得する
    this.getFactList()
  },
  methods: {
    aaa(data) {
      console.log(data)
    },
    getFactoidName(uri) {
      return 'Fact ' + uri.split('fact_')[1]
    },

    // factNodeの一覧を取得する
    async getFactList() {
      const query4Fact = `
      prefix ex: <https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#>
      select distinct * where {
          ?s rdf:type/rdfs:subClassOf* ex:Factoid; ex:description ?description .
          optional { ?s ex:mentionedAsFollow ?follow } .
          optional { ?s ex:mentionedAsPrecedent ?precedent } .
      }`

      /*
      optional { ?s ex:mentionedAsParallel ?parallel } .
      optional { ?s ex:because ?because } .
      optional { ?s ex:therefore ?therefore } .
      */

      const data4Fact = (
        await this.$axios.get(`${url}?query=${encodeURIComponent(query4Fact)}`)
      ).data

      const map4Fact = {}

      // ソート用
      const edgeMap = {}

      for (const factByQuery of data4Fact) {
        // console.log({ factByQuery })

        // 主語
        const uri = factByQuery.s
        if (!map4Fact[uri]) {
          map4Fact[uri] = {
            s: uri,
            description: [],
            follow: [],
            precedent: [],
            parallel: [],
            because: [],
            therefore: [],
          }
        }

        const existObj = map4Fact[uri]
        for (const keyInQuery in factByQuery) {
          const valueByQuery = factByQuery[keyInQuery]
          if (existObj[keyInQuery]) {
            const existValues = existObj[keyInQuery]
            if (!existValues.includes(valueByQuery)) {
              existValues.push(valueByQuery)
            }
          }

          let fromUri = ''
          let toUri = ''

          // edgeMap用
          if (keyInQuery === 'follow') {
            fromUri = valueByQuery
            toUri = uri
          } else if (keyInQuery === 'precedent') {
            fromUri = uri
            toUri = valueByQuery
          }

          if (fromUri) {
            if (!edgeMap[fromUri]) {
              edgeMap[fromUri] = []
            }
            const arrayOfTo = edgeMap[fromUri]
            if (!arrayOfTo.includes(toUri)) {
              arrayOfTo.push(toUri)
            }
          }
        }
      }

      const startNodeUri =
        'http://www.example.com/roman-ontology/resource/fact/fact_2'
      const sortedFactoids = this.$utils.sortNodes([], edgeMap, startNodeUri)

      console.log({ sortedFactoids })

      const factoids = []
      for (const uri of sortedFactoids) {
        factoids.push(map4Fact[uri])
      }

      console.log({ factoids })

      this.factoids = factoids
    },
  },
}
</script>
