<template>
  <div>
    <Breadcrumbs :items="items" />
    <v-container class="my-5">
      <h2>{{ title }}</h2>

      <v-card
        v-for="(item, jd) in results"
        :key="jd"
        class="mt-5"
        flat
        outlined
      >
        <div class="pa-2">
          <h3>{{ item.year }}</h3>
          <ul>
            <li v-for="(event, eventUri) in item.events" :key="eventUri">
              <template v-if="Object.keys(event.factoids).length > 0">
                <a
                  @click="
                    dialog = true
                    factoids = event.factoids
                  "
                >
                  {{ event.description }}
                </a>
              </template>
              <template v-else>
                {{ event.description }}
              </template>
            </li>
          </ul>
        </div>
      </v-card>
    </v-container>

    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2"> Factoids </v-card-title>

        <v-card-text>
          <ul>
            <li
              v-for="(factoidLabel, factoidUri) in factoids"
              :key="factoidUri"
              class="mt-4"
            >
              <nuxt-link
                :to="
                  localePath({
                    //name: 'item-id',
                    //params: { id: $utils.getIdFromUri(factoidUri) },
                    name: 'text',
                    query: {
                      f_id: $utils.getIdFromUri(factoidUri),
                    },
                  })
                "
              >
                {{ factoidLabel }}
              </nuxt-link>
            </li>
          </ul>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false"> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      baseUrl: process.env.BASE_URL,
      title: 'Events',
      results: {},
      dialog: false,
      factoids: {},
    }
  },

  head() {
    return {
      title: this.title,
    }
  },

  computed: {
    items() {
      return [
        {
          text: this.$t('TOP'),
          disabled: false,
          to: this.localePath({ name: 'index' }),
        },
        {
          text: this.title,
        },
      ]
    },
  },

  async mounted() {
    const url = process.env.endpoint

    const endpoint4hutimeperiod =
      'https://dydra.com/junjun7613/hutimeperiod/sparql'

    const query = `
      PREFIX cidoc: <http://www.cidoc-crm.org/cidoc-crm/>
      PREFIX ex: <https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#>
      SELECT DISTINCT * WHERE {
        ?s a cidoc:E5_Event; ex:description ?description . 
          {
            ?s cidoc:P4_has_time_span ?jd . 
            SERVICE SILENT <${endpoint4hutimeperiod}> {
              optional { ?jd rdfs:label ?year . }
            }
          }
        # 関連するFactoidの抽出
        OPTIONAL {
          ?factoid ex:referencesEvent ?s; ex:description ?fLabel . 
        }
      } ORDER BY ?jd
      LIMIT 200
    `

    const { data } = await this.$axios.get(
      `${url}?query=${encodeURIComponent(query)}`
    )

    const yearMap = {}

    for (const item of data) {
      const jd = item.jd
      if (!yearMap[jd]) {
        yearMap[jd] = {
          year: item.year,
          events: {},
        }
      }

      // イベントの登録
      const events = yearMap[jd].events
      if (!events[item.s]) {
        events[item.s] = item
        events[item.s].factoids = {}
      }

      // Factoidの登録
      const factoidUri = item.factoid
      const factoids = events[item.s].factoids
      if (factoidUri && !factoids[factoidUri]) {
        factoids[factoidUri] = item.fLabel
      }
    }

    // console.log({yearMap})

    this.results = yearMap
  },
}
</script>
