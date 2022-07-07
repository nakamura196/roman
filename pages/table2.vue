<template>
  <v-container>
    <h2>{{ title }}</h2>
    <v-data-table :headers="headers" :items="items" :items-per-page="-1">
      <template #[`item.fac`]="{ item }">
        <a
          :href="`${baseUrl}/snorql/?describe=${encodeURIComponent(item.fac)}`"
        >
          {{ item.fac }}
        </a>
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      baseUrl: process.env.BASE_URL,
      headers: [
        {
          text: 'Fac',
          value: 'fac',
        },
        {
          text: 'Ent',
          value: 'ent',
        },
      ],
      items: [],
      title: 'テーブル2',
    }
  },

  head() {
    return {
      title: this.title,
    }
  },

  async mounted() {
    const url = 'https://dydra.com/junjun7613/roman-factoid/sparql'

    const query = `prefix owl: <http://www.w3.org/2002/07/owl#>
prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
prefix xsd: <http://www.w3.org/2001/XMLSchema#>
prefix dprr: <http://romanrepublic.ac.uk/rdf/ontology#>
prefix fpo: <https://github.com/johnBradley501/FPO/raw/master/fpo.owl#>
prefix ex: <https://junjun7613.github.io/roman_factoid/Roman_Contextual_Factoid.owl#>


select ?fac(COUNT(?ent_name) AS ?ent) where { 
{?fac a ex:Action} UNION {?fac a ex:Contact} UNION {?fac a ex:Thought} UNION {?fac a ex:Situation}
?fac (ex:subject|ex:whom|ex:what)/ex:referencesEntity/ex:name ?ent_name.
} GROUP BY ?fac
HAVING (COUNT(?ent_name) > 0)`

    const data = (
      await this.$axios.get(`${url}?query=${encodeURIComponent(query)}`)
    ).data

    const items = []
    for (const obj of data) {
      items.push({
        fac: obj.fac,
        ent: obj.ent,
      })
    }

    this.items = items
  },
}
</script>
