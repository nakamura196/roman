<template>
  <v-container>
    <h2>{{ title }}</h2>

    <p class="mt-5">ノードをクリックしてください。</p>

    <p class="mb-5">選択済み: {{ fact || 'None' }}</p>

    <v-btn class="primary my-5" @click="fact = ''">リセット</v-btn>

    <div v-if="loading" class="pa-10 text-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

    <network
      id="mynetwork"
      ref="network"
      style="width: 100%; height: 500px"
      :nodes="nodes"
      :edges="edges"
      :options="options"
    >
      <!--@click="onNodeSelected"-->
    </network>
  </v-container>
</template>
<script>
import { Network } from 'vue-visjs'

export default {
  components: {
    network: Network,
  },
  data() {
    return {
      baseUrl: process.env.BASE_URL,
      loading: false,
      nodes: [],
      edges: [],
      options: {
        nodes: {
          borderWidth: 1,
        },
        edges: {
          color: 'lightgray',
        },
      },
      title: this.$t('network'),
      fact: '',
    }
  },

  head() {
    return {
      title: this.title,
    }
  },
  watch: {
    fact() {
      this.updateFact()
    },
  },
  mounted() {
    this.updateFact()
  },
  methods: {
    onNodeSelected(value) {
      const nodes = value.nodes
      if (nodes.length > 0) {
        const s = nodes[0]
        this.fact = s

        // this.updateFact()
      }
    },
    async updateFact() {
      this.loading = true
      const url = 'https://dydra.com/junjun7613/romanfactoid_v2/sparql'

      const fact = this.fact

      const query = `
      select * where {
        ?s <https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#mentionedAsPrecedent> ?o . 
        ${fact ? ` filter (?s = <${fact}> || ?o = <${fact}>) ` : ``}
      }`

      const data = (
        await this.$axios.get(`${url}?query=${encodeURIComponent(query)}`)
      ).data

      const nodesMap = {}
      const edges = []

      for (const obj of data) {
        const s = obj.s
        const spl = s.split('/')
        const label = spl[spl.length - 1]
        if (!nodesMap[s]) {
          nodesMap[s] = {
            id: s,
            label,
            shape: 'dot',
          }
        }

        edges.push({
          from: obj.s,
          to: obj.o,
          arrows: {
            to: {
              enabled: true,
            },
          },
        })
      }

      const nodes = []
      for (const s in nodesMap) {
        nodes.push(nodesMap[s])
      }

      this.nodes = nodes
      this.edges = edges

      this.loading = false
    },
  },
}
</script>
<style>
#mynetwork {
  border: 1px solid lightgray;
}
</style>
