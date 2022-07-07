<template>
  <div>
    <network
      id="mynetwork"
      ref="network"
      class="mt-5"
      style="width: 100%; height: 500px;"
      :nodes="nodes"
      :edges="edges"
      :options="options"
      @click="onNodeSelected"
    >
    <!-- background-color: lightyellow -->
    </network>

    <div class="my-4">
      <v-switch v-model="isLemma" :label="`Lemma`"></v-switch>
    </div>

    <v-dialog v-model="dialog" persistent max-width="500">
      <v-card>
        <v-card-title class="text-h5"> Contexts </v-card-title>
        <v-card-text>
          <ul>
            <li
              v-for="(context, key) in selectedContexts"
              :key="key"
              class="mt-4"
            >
              <!--
              <nuxt-link
                :to="
                  localePath({
                    name: 'entity-id',
                    params: {
                      id: $utils.getIdFromUri(key),
                    },
                  })
                "
                >{{ context.descriptionOfEntityInContext2 }}</nuxt-link
              >
              -->
              <a
                @click="
                  selectedEntityIdOnText = key
                  isRedraw = true
                "
              >
                {{ context.descriptionOfEntityInContext2 }}
              </a>
            </li>
          </ul>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { Network } from 'vue-visjs'

const combination = (nums, k) => {
  const ans = []
  if (nums.length < k) {
    return []
  }
  if (k === 1) {
    for (let i = 0; i < nums.length; i++) {
      ans[i] = [nums[i]]
    }
  } else {
    for (let i = 0; i < nums.length - k + 1; i++) {
      const row = combination(nums.slice(i + 1), k - 1)
      for (let j = 0; j < row.length; j++) {
        ans.push([nums[i]].concat(row[j]))
      }
    }
  }
  return ans
}
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
    /*,
    label: {
      type: String,
      require: true,
      default: '',
    },
    */
  },
  data() {
    return {
      isLemma: true,
      orgNodes: [],
      orgEdges: [],
      nodes: [],
      nodesMap: {},
      edgesMap: {},
      contexts: {},
      edges: [],
      options: {
        nodes: {
          borderWidth: 1,
        },
        edges: {
          color: 'lightgray',
        },
      },
      dialog: false,
      selectedContexts: {},
      item: {},
      endpoint: process.env.endpoint,
      timeoutId: null,
    }
  },
  computed: {
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
    isRedraw: {
      // getter 関数
      get() {
        return this.$store.getters.getIsRedraw
      },
      // setter 関数
      set(value) {
        this.$store.commit('setIsRedraw', value)
      },
    },
  },
  watch: {
    isLemma() {
      this.drawNetwork()
    },
    id() {
      this.init(this.id)
    },
  },
  mounted() {
    this.init(this.id)
  },
  methods: {
    async init(id) {
      // 初期化

      if (this.isRedraw) {
        this.orgNodes = []
        this.orgEdges = []

        this.nodes = []
        this.edge = []
        this.nodesMap = {}

        this.isRedraw = false
      }

      /// /////////////

      // const uri = this.id
      const uri = id

      // console.log('aaa', { uri })

      // 要検討。IDが空の場合
      if (!id) {
        return
      }

      // ex:sourceDescription ?description;

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

      const { data } = await this.$axios.get(
        `${this.endpoint}?query=${encodeURIComponent(query4Entity)}`
      )

      const item = data[0]
      this.item = item

      this.getRelations(id) // 1次
    },
    // pleiadesから緯度・経度情報の取得
    async getRelations(id) {
      // 起点となっているノード

      const item = this.item

      const filter = `?entityInContext = <${id}>`

      const query = `prefix ex: <https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#>
      SELECT DISTINCT *
      WHERE {
        ?entityInContext ex:contextualAspectOf ?entity0 .
        ?entityReference ex:referencesEntityInContext ?entityInContext; ex:referencesEntity/rdf:type ?typeOfEntity .
        filter (${filter}) .
        ?factoid ?hasReference ?entityReference .
        ?hasReference rdfs:subPropertyOf* ?propertyClass .
        filter (?propertyClass = ex:sceneObjectProperty || ?propertyClass = ex:sceneProperty).
        ?factoid ?hasReference2 ?entityReference2 .
        filter (?entityReference != ?entityReference2)
        ?hasReference2 rdfs:subPropertyOf* ?propertyClass .
        ?entityReference2 ex:referencesEntity ?entity; rdf:type ?typeOfEntityReference .
        OPTIONAL {
          ?entityReference2 ex:referencesEntityInContext ?entityInContext2 .
          ?entityInContext2 rdf:type ?typeOfEntityInContext; ex:sourceDescription ?descriptionOfEntityInContext2 }
        ?entity ex:name ?name; rdf:type ?typeOfEntity2 .
      }`

      const url = `${this.endpoint}?query=${encodeURIComponent(query)}`

      const { data } = await this.$axios.get(url)

      const relationsByFactoid = {}

      // 各Entityの情報を保存するマップ
      const entities = {}

      // 要検討ポイント。無理やり変換している。
      id = data[0].entity0

      // 起点となる人の情報を入れておく
      entities[id] = item

      let edgesMap = this.edgesMap
      let nodesMap = this.nodesMap

      // entityとentityInContextの関係を保持
      const contexts = this.contexts
      this.contexts = contexts

      for (const relation of data) {
        const factoid = relation.factoid
        if (!relationsByFactoid[factoid]) {
          relationsByFactoid[factoid] = [id]
        }
        const relationByFactoid = relationsByFactoid[factoid]

        // 起点のノードとentityのつなぐ（entityInContextをつないでいたものから修正）
        const entityUri = relation.entity
        if (!relationByFactoid.includes(entityUri)) {
          relationByFactoid.push(entityUri)
        }
        entities[entityUri] = relation

        // entityInContextとentityの繋いでいる
        if (relation.entityInContext2) {
          const entityInContextUri = relation.entityInContext2
          if (!contexts[entityUri]) {
            contexts[entityUri] = {}
          }
          contexts[entityUri][entityInContextUri] = relation
        }
      }

      for (const factoid in relationsByFactoid) {
        const relationByFactoid = relationsByFactoid[factoid]
        // 組み合わせを取得
        const combis = combination(relationByFactoid, 2)

        for (const combi of combis) {
          // 名前順にソート
          const combiArr = [combi[0], combi[1]]
          combiArr.sort()
          const edgeId = combiArr.join('-')

          if (!edgesMap[edgeId]) {
            edgesMap[edgeId] = {
              from: combi[0],
              to: combi[1],
              // value: 0,
              color: 'gray',
              shadow: true,
            }
          }

          // edgesMap[edgeId].value += 1

          for (const entityUri of combi) {
            let color = '#03A9F4'
            // const shape = null
            let nodeType = null

            const typeOfEntityReference =
              entities[entityUri].typeOfEntityReference

            let typeOfEntity1And2 = ''

            // 要検討！！！

            // 起点となるノードだったら
            if (entityUri === id) {
              typeOfEntity1And2 = entities[entityUri].typeOfEntity
            } else {
              typeOfEntity1And2 = entities[entityUri].typeOfEntity2
            }

            if (
              [
                'https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#ConceptualObjectReference',
                'https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#PhysicalObjectReference',
              ].includes(typeOfEntityReference)
            ) {
              color = 'yellow'
              // shape = 'diamond'
            } else if (
              [
                'https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#Community',
              ].includes(typeOfEntity1And2)
            ) {
              color = 'red'
              // shape = 'square'
              nodeType = typeOfEntity1And2
            } else if (
              // Person
              [
                'https://github.com/johnBradley501/FPO/raw/master/fpo.owl#Person',
              ].includes(typeOfEntity1And2)
            ) {
              nodeType = typeOfEntity1And2
            } else if (
              // Location
              [
                'https://github.com/johnBradley501/FPO/raw/master/fpo.owl#Location',
              ].includes(typeOfEntity1And2)
            ) {
              color = '#98fb98' // 'green'
              nodeType = typeOfEntity1And2
            } else if (
              // Group
              [
                'https://github.com/johnBradley501/FPO/raw/master/fpo.owl#Group',
              ].includes(typeOfEntity1And2)
            ) {
              color = 'orange' // '#E65100' // orange
              nodeType = typeOfEntity1And2
            }

            if (!nodesMap[entityUri]) {
              // const spl = entityUri.split('/')
              // const ln = spl[spl.length - 1]
              nodesMap[entityUri] = {
                id: entityUri,
                label: entities[entityUri].name, // + ' - ' + ln, // ,
                color,
                // shape,
                shape: 'dot',
                type: nodeType,
                shadow: true,
                size: 15,
              }
            }
          }
        }
      }

      // filtersが空になる問題への対応
      if (Object.keys(relationsByFactoid).length > 0) {
        // Federate Queryがエラーがになる問題への対応
        try {
          // objectの情報の追加
          const res = await this.getAssociatedObjects(
            nodesMap,
            edgesMap,
            relationsByFactoid
          )
          nodesMap = res.nodesMap
          edgesMap = res.edgesMap
        } catch (e) {
          console.error({ e })
        }
      }

      // ノードとエッジ
      const nodes = []
      const edges = []

      for (const nodeId in nodesMap) {
        nodes.push(nodesMap[nodeId])
      }

      for (const edgeId in edgesMap) {
        edges.push(edgesMap[edgeId])
      }

      this.orgNodes = nodes
      this.orgEdges = edges

      this.nodesMap = nodesMap
      this.edgesMap = edgesMap

      this.relations = data

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

    async getAssociatedObjects(nodesMap, edgesMap, relationsByFactoid) {
      const filters = []
      for (const nodeUri in relationsByFactoid) {
        filters.push(`?s = <${nodeUri}>`)
      }

      const filter = filters.join(' || ')

      const endpoint = process.env.endpoint

      const query = `prefix ex: <https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#>
      prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      SELECT * WHERE {
        ?s ?v ?ao . ?ao ex:hasLemma/ex:referencesLemma ?lemma; a ?type .
        filter (${filter})
        SERVICE <https://dydra.com/i2k/lemmabank/sparql> {
          ?lemma rdfs:label ?label .
        }
      }`

      // SILENT を外した

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
            lemma: item.lemma,
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
            color: 'pink',
            shape: 'box',
          },
        'https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#PhysicalObjectReference':
          {
            color: 'gray',
            shape: 'diamond',
          },
      }

      for (const factoidUri in factoidUri2labels) {
        for (const aoUri in factoidUri2labels[factoidUri]) {
          const aoObj = factoidUri2labels[factoidUri][aoUri]
          const type = aoObj.type
          // const lemma = aoObj.lemma

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

          const relationList = relationsByFactoid[factoidUri]
          for (const relationUri of relationList) {
            edgesMap[`${relationUri}-${label}`] = {
              from: relationUri,
              to: label,
              // label: this.$utils.getIdFromUri(obj.p, '#'),
              arrows: 'to',
              // font: { align: 'middle' },
              // color: 'gray',
              shadow: true,
            }
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
        if (
          [
            'https://github.com/johnBradley501/FPO/raw/master/fpo.owl#Person',
            'https://github.com/johnBradley501/FPO/raw/master/fpo.owl#Location',
            'https://github.com/johnBradley501/FPO/raw/master/fpo.owl#Group',
            'https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#Community',
          ].includes(node.type)
        ) {
          this.dialog = true

          this.selectedContexts = this.contexts[node.id]
        }
      }

      this.onNodeDblClicked(value)
    },

    async onNodeDblClicked(value) {
      this.isRedraw = false

      const nodes = value.nodes
      if (nodes.length > 0) {
        const uri = nodes[0]
        const node = this.nodesMap[uri]
        if (
          [
            'https://github.com/johnBradley501/FPO/raw/master/fpo.owl#Person',
            'https://github.com/johnBradley501/FPO/raw/master/fpo.owl#Location',
            'https://github.com/johnBradley501/FPO/raw/master/fpo.owl#Group',
            'https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#Community',
          ].includes(node.type)
        ) {
          const selectedContexts = this.contexts[node.id]

          if (selectedContexts) {
            // console.log()
            for (const id of Object.keys(selectedContexts)) {
              await this.init(id)
            }
          }
        }
      }
    },
  },
}
</script>
