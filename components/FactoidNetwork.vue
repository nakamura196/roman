<template>
  <div class="mb-5">
    <network
      id="mynetwork"
      ref="network"
      class="mt-5"
      style="width: 100%; height: 500px; border: 1px solid lightgray;"
      :nodes="nodes"
      :edges="edges"
      :options="options"
      @click="onNodeSelected"
    >
    <!-- background-color: lightyellow -->
    </network>

    <div v-if="false" class="text-right">
      <v-switch v-model="isOption" :label="`Option`"></v-switch>
    </div>

    <template v-if="isOption || true">
      <div class="mt-4">
        <v-switch v-model="isLemma" :label="`Lemma`"></v-switch>
      </div>

      <div class="mt-4">
        <v-btn color="secondary" depressed rounded small class="ma-1" @click="hierarchical = false"
          >hierarchicalを使用しない</v-btn
        >
        <v-btn color="secondary" depressed rounded small class="ma-1" @click="hierarchical = true"
          >hierarchicalを使用する</v-btn
        >

        <v-btn color="secondary" depressed rounded small class="ma-1" @click="sortMethod = 'directed'"
          >directed</v-btn
        >
        <v-btn color="secondary" depressed rounded small class="ma-1" @click="sortMethod = 'hubsize'"
          >hubsize</v-btn
        >

        <v-btn color="secondary" depressed rounded small class="ma-1" @click="physicsEnabled = true"
          >physicsを使用する</v-btn
        >
        <v-btn color="secondary" depressed rounded small class="ma-1" @click="physicsEnabled = false"
          >physicsを使用しない</v-btn
        >
      </div>
    </template>
  </div>
</template>

<script>
import { Network } from 'vue-visjs'

export default {
  components: {
    network: Network,
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
      isLemma: false,
      sortMethod: "directed", // 'hubsize',
      hierarchical: true,
      physicsEnabled: false,
      orgNodes: [],
      orgEdges: [],

      nodes: [],
      edges: [],
      nodesMap: {},
      isOption: false,
    }
  },
  computed: {
    options() {
      const hierarchical = this.hierarchical
      let hierarchicalOption = false
      if (hierarchical) {
        hierarchicalOption = {
          sortMethod: this.sortMethod,
        }
      }

      const option = {
        edges: {
          length: 400, // Longer edges between nodes.
        },
        layout: {
          randomSeed: 2,
          hierarchical: hierarchicalOption,
        },
        physics: {
          enabled: this.physicsEnabled,
          // Even though it's disabled the options still apply to network.stabilize().
          /*
          enabled: false,
          solver: 'repulsion',
          repulsion: {
            nodeDistance: 4000, // Put more distance between the nodes.
          },
          */
        },
      }

      return option
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
  },
  watch: {
    isLemma() {
      this.drawNetwork()
    },
    id() {
      this.getRelatedFactoids()
    },
  },
  mounted() {
    this.getRelatedFactoids()
  },
  methods: {
    async getRelatedFactoids() {
      // 初期化

      this.orgNodes = []
      this.orgEdges = []

      this.nodes = []
      this.edge = []
      this.nodesMap = {}

      // const item = this.item
      const factoidUri = this.id

      const endpoint = process.env.endpoint

      const query = `prefix ex: <https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#>
      prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      SELECT * WHERE {
        ?s ex:description ?desc_s .
        OPTIONAL {
          ?s ?related_so ?s_o .
          {
            ?s_o ex:referencesEntityInContext ?entityInContext_s; ex:referencesEntity ?referencesEntity_s .
          }
          UNION
          {
            ?s_o ex:referencesEntity ?referencesEntity_s .
          }
          ?referencesEntity_s ex:name ?referencesEntityName_s; rdf:type ?referencesEntityType_s
        }
        OPTIONAL {
          ?s ?p ?o .
          ?o a/rdfs:subClassOf* ex:Factoid .
          ?o ex:description ?desc_o .
          OPTIONAL {
            ?o ?related_oo ?o_o .
            {
              ?o_o ex:referencesEntityInContext ?entityInContext_o; ex:referencesEntity ?referencesEntity_o .
            }
            UNION
            {
              ?o_o ex:referencesEntity ?referencesEntity_o .
            }
            ?referencesEntity_o ex:name ?referencesEntityName_o; rdf:type ?referencesEntityType_o
          }
        }
        filter (?s = <${factoidUri}> || ?o = <${factoidUri}>)
      }`

      const url = `${endpoint}?query=${encodeURIComponent(query)}`

      const { data } = await this.$axios.get(url)

      let nodesMap = {}
      let edgesMap = {}

      for (const obj of data) {
        const keys = ['s', 'o']
        for (const key of keys) {
          // entity
          const entityNodeUri = obj[`referencesEntity_${key}`]

          if (!entityNodeUri) {
            continue
          }

          const nodeUri = obj[key]

          const rna = obj[`desc_${key}`]
          const cdn2 = []
          const size = 20
          for (let i = 0; i < rna.length / size; i++) {
            cdn2.push(rna.substr(i * size, size))
          }

          if (!nodesMap[nodeUri]) {
            nodesMap[nodeUri] = {
              id: nodeUri,
              label: cdn2.join('\n'),
              shape: 'box',
              color: {
                background: 'white',
                border: 'white',
              },
              type: 'factoid',
              shadow: true,
            }
          }

          if (!nodesMap[entityNodeUri]) {
            let color = null
            let shape = 'dot' // null
            const entityType = obj[`referencesEntityType_${key}`]
            switch (entityType) {
              case 'https://github.com/johnBradley501/FPO/raw/master/fpo.owl#Location':
                // 式の結果が value1 に一致する場合に実行する文
                color = '#98fb98' // 'green'
                shape = 'dot'
                break
              case 'https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#Community':
                // 式の結果が value1 に一致する場合に実行する文
                color = 'red'
                shape = 'dot'
                break
              /*
              case 'https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#ConceptualObjectReference':
                // 式の結果が value1 に一致する場合に実行する文
                color = 'yellow'
                shape = 'diamond'
                break
              case 'https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#PhysicalObjectReference':
                // 式の結果が value1 に一致する場合に実行する文
                color = 'yellow'
                shape = 'diamond'
                break
              */
              case 'https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#ConceptualObject':
                // 式の結果が value1 に一致する場合に実行する文
                color = 'yellow'
                // shape = 'diamond'
                shape = 'dot'
                break
              case 'https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#PhysicalObject':
                // 式の結果が value1 に一致する場合に実行する文
                color = 'yellow'
                // shape = 'diamond'
                shape = 'dot'
                break
              case 'https://github.com/johnBradley501/FPO/raw/master/fpo.owl#Group':
                // 式の結果が value1 に一致する場合に実行する文
                color = 'orange'
                shape = 'dot'
                break
              /*
              case value2:
                // 式の結果が value2 に一致する場合に実行する文
                [break;]
              ...
              case valueN:
                // 式の結果が valueN に一致する場合に実行する文
                [break;]
              [default:
                // 式の値に一致するものが存在しない場合に実行する文
                [break;]]
              */
            }
            nodesMap[entityNodeUri] = {
              id: entityNodeUri,
              label: obj[`referencesEntityName_${key}`],
              // shape: 'box',
              color,
              shape,
              // context: obj[`entityInContext_${key}`],
              type: entityType,
              shadow: true,
              size: 15,
            }
          }

          // [注意] nodesMapに登録済みのnodeについて、contextがnullの場合、当該node URIが2回目以降の出現であっても、登録済みのnodeのcontextを更新する。
          const nodeObj = nodesMap[entityNodeUri]
          if (!nodeObj.context && obj[`entityInContext_${key}`]) {
            nodeObj.context = obj[`entityInContext_${key}`]
          }

          // factoid と entity をつなぐ edge
          const edgeUri4f2e = `${nodeUri}-${entityNodeUri}`
          edgesMap[edgeUri4f2e] = {
            from: nodeUri,
            to: entityNodeUri,
            // label: this.$utils.getIdFromUri(obj.p, '#'),
            arrows: 'to',
            // font: { align: 'middle' },
            color: 'gray',
          }
        }

        if (
          obj.p &&
          ![
            'https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#mentionedAsFollow',
            // 'https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#mentionedAsSubsequent',
          ].includes(obj.p)
        ) {
          const edgeLabel = this.$utils.getIdFromUri(obj.p, '#')
          edgesMap[`${obj.s}-${obj.o}`] = {
            from: obj.s,
            to: obj.o,
            label: edgeLabel,
            arrows: 'to',
            // font: { align: 'middle' },
            color: "orange", // 'gray',
          }
        }
      }

      // objectの情報の追加
      const res = await this.getAssociatedObjects(nodesMap, edgesMap)
      nodesMap = res.nodesMap
      edgesMap = res.edgesMap

      // 以下、表示

      const nodes = []
      for (const nodeUri in nodesMap) {
        nodes.push(nodesMap[nodeUri])
      }

      const edges = []
      for (const edgeUri in edgesMap) {
        edges.push(edgesMap[edgeUri])
      }

      // 全データの格納
      this.orgEdges = edges
      this.orgNodes = nodes

      this.nodesMap = nodesMap

      // 描画
      this.drawNetwork()
    },

    drawNetwork() {
      // 全データ
      const orgEdges = this.orgEdges
      const orgNodes = this.orgNodes

      // 表示するものだけ
      const nodes = []
      const edges = []
      const nodesUris = []

      // 表示条件
      const isLemma = this.isLemma

      // ノードについて
      for (const node of orgNodes) {
        if (!isLemma && node.type === 'lemma') {
          continue
        }

        nodes.push(node)
        nodesUris.push(node.id)
      }

      // エッジについて
      for (const edge of orgEdges) {
        const fromUri = edge.from
        const toUri = edge.to
        if (nodesUris.includes(fromUri) && nodesUris.includes(toUri)) {
          edges.push(edge)
        }
      }

      this.nodes = nodes
      this.edges = edges
    },

    async getAssociatedObjects(nodesMap, edgesMap) {
      const filters = []
      for (const nodeUri in nodesMap) {
        if (nodesMap[nodeUri].type === 'factoid') {
          filters.push(`?s = <${nodeUri}>`)
        }
      }

      if (filters.length === 0) {
        return { nodesMap, edgesMap }
      }

      const filter = filters.join(' || ')

      const endpoint = process.env.endpoint // 'https://dydra.com/junjun7613/romanfactoid_v2/sparql'

      const query = `PREFIX ex: <https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      SELECT * WHERE {
        ?s ?v ?ao . ?ao ex:hasLemma/ex:referencesLemma ?lemma; a ?type .
        FILTER (${filter})
        SERVICE <https://dydra.com/i2k/lemmabank/sparql> {
          ?lemma rdfs:label ?label .
        }
      }`

      // SILENT

      const url = `${endpoint}?query=${encodeURIComponent(query)}`

      const { data } = await this.$axios.get(url)

      const factoidUri2labels = {}

      for (const item of data) {
        const label = item.label
        const aoUri = item.ao
        const factoidUri = item.s

        if (!factoidUri2labels[factoidUri]) {
          factoidUri2labels[factoidUri] = {}
        }

        if (!factoidUri2labels[factoidUri][aoUri]) {
          factoidUri2labels[factoidUri][aoUri] = {
            type: item.type,
            labels: [],
          }
        }

        const labels = factoidUri2labels[factoidUri][aoUri].labels
        if (!labels.includes(label)) {
          labels.push(label)
        }
      }

      const aoConfig = {
        'https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#ConceptualObjectReference':
          {
            color: 'purple',
            // shape: 'box',
          },
        'https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#PhysicalObjectReference':
          {
            color: '#CBC3E3',
            // shape: 'diamond',
          },
      }

      for (const factoidUri in factoidUri2labels) {
        for (const aoUri in factoidUri2labels[factoidUri]) {
          const aoObj = factoidUri2labels[factoidUri][aoUri]
          const type = aoObj.type

          // 複数のラベルをソートして結合
          const labels = aoObj.labels
          labels.sort()
          const label = labels.join(' / ')

          if (!nodesMap[label]) {
            nodesMap[label] = {
              id: label,
              label,
              color: aoConfig[type].color,
              // shape: aoConfig[type].shape,
              shape: 'dot',
              type: 'lemma',
              shadow: true,
              size: 10,
            }
          }

          edgesMap[`${factoidUri}-${label}`] = {
            from: factoidUri,
            to: label,
            // label: this.$utils.getIdFromUri(obj.p, '#'),
            arrows: 'to',
            // font: { align: 'middle' },
            color: 'gray',
          }
        }
      }

      return { nodesMap, edgesMap }
    },

    // クリックした時の処理
    onNodeSelected(value) {
      const nodes = value.nodes

      if (nodes.length > 0) {
        const uri = nodes[0]
        const node = this.nodesMap[uri]

        if (node.type === 'factoid') {
          /*
          this.$router.push(
            this.localePath({
              name: 'item-id',
              params: {
                id: this.$utils.getIdFromUri(node.id).replace('fact_', ''),
              },
            })
          )
          */
          this.selectedFactoidIdOnText = this.$utils.getIdFromUri(node.id)
        } else {
          if (!node.context) {
            alert('contextがありません。')
            return
          }
          /*
          this.$router.push(
            this.localePath({
              name: 'entity-id',
              params: {
                id: this.$utils.getIdFromUri(node.context),
              },
            })
          )
          */
          this.selectedEntityIdOnText = this.$utils.getIdFromUri(node.context)
        }
      }
    },
  },
}
</script>
