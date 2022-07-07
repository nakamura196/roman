<template>
  <div>
    <h2>{{ item.name }} ({{ id }})</h2>

    <h3 class="mt-5">Context Information</h3>

    <v-simple-table>
      <template #default>
        <tbody>
          <tr>
            <td>ノート</td>
            <td>{{ item.description }}</td>
          </tr>
          <tr>
            <td>開始 Factoid</td>
            <td>{{ item.eventSinceDescription }}</td>
          </tr>
          <tr>
            <td>終了 Factoid</td>
            <td>{{ item.eventUntilDescription }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <EntityNetwork :id="item.s" />
  </div>
</template>

<script>
import axios from 'axios'
import EntityNetwork from '~/components/EntityNetwork.vue'

const url = process.env.endpoint

export default {
  components: {
    EntityNetwork,
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
      item: {},
    }
  },
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
      const id = this.id

      const cont = 'entityInContext'

      const uri = `http://www.example.com/roman-ontology/resource/${cont}/${id}`

      const query4Entity = `
        prefix fpo: <https://github.com/johnBradley501/FPO/raw/master/fpo.owl#>
        prefix owl: <http://www.w3.org/2002/07/owl#>
        prefix ex: <https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#>
        select distinct * where {
            ?s ex:eventSince ?eventSince; ex:eventUntil ?eventUntil;
              ex:contextualAspectOf ?entity .
            filter (?s = <${uri}> ) .
            ?entity ex:name ?name; rdf:type ?typeOfEntity .
            ?eventSince ex:description ?eventSinceDescription .
            ?eventUntil ex:description ?eventUntilDescription .
            optional { ?s ex:hasLocation/ex:sourceDescritpion ?locationDescription . }
        }`

      const { data } = await axios.get(
        `${url}?query=${encodeURIComponent(query4Entity)}`
      )

      const item = data[0]

      this.item = item
    },
  },
}
</script>
