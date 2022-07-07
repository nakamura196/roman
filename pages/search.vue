<template>
  <v-container fluid>
    <h2>{{ title }}</h2>

    <!-- 検索条件 -->
    <v-row align="center" class="mt-2">
      <v-col class="d-flex" cols="12" sm="6">
        <v-select
          v-model="nodeStart"
          :items="nodeList"
          label="始点"
          filled
          rounded
          dense
        ></v-select>
      </v-col>
      <v-col class="d-flex" cols="12" sm="6">
        <v-select
          v-model="nodeEnd"
          :items="nodeList"
          label="終点"
          filled
          rounded
          dense
        ></v-select>
      </v-col>
    </v-row>

    <!-- ネットワーク -->
    <v-row>
      <v-col>
        <network
          id="mynetwork"
          ref="network"
          style="width: 100%; height: 650px"
          :nodes="nodes"
          :edges="edges"
          :options="options"
          @click="onNodeSelected"
        >
        </network>
      </v-col>
      <v-col>
        <v-card flat outlined class="pa-10"> テキスト </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { Network } from 'vue-visjs'

const url = 'https://dydra.com/junjun7613/romanfactoid_v2/sparql'
const endpoint4hutimeperiod = 'https://dydra.com/junjun7613/hutimeperiod/sparql'

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
          smooth: {
            // type: 'cubicBezier',
            forceDirection: 'vertical',
            // roundness: 0.4,
          },
        },
        layout: {
          hierarchical: {
            direction: 'UD',
            sortMethod: 'directed',
            shakeTowards: 'roots',
          },
        },
        /*
        physics: {
          hierarchicalRepulsion: {
            avoidOverlap: 0.5,
          },
        },
        */
        /*
        physics: {
          hierarchicalRepulsion: {
            avoidOverlap: 1,
          },
        },
        */
        physics: false,
      },
      title: this.$t('network'),
      nodeList: [],
      nodeStart: '',
      nodeEnd: '',
      nodeEntity: '', // entityInContext の URI
    }
  },

  head() {
    return {
      title: this.title,
    }
  },
  watch: {
    nodeStart() {
      this.drawNetwork()
    },
    nodeEnd() {
      this.drawNetwork()
    },
    nodeEntity() {
      this.drawNetwork()
    },
  },
  mounted() {
    // factNodeの一覧を取得する
    // 検索条件用
    this.getFactList()

    // 描画
    // ネットワーク用
    this.drawNetwork()
  },
  methods: {
    onNodeSelected(value) {
      const nodes = value.nodes
      if (nodes.length > 0) {
        const nodeUri = nodes[0]
        /*
        if (nodeUri.includes('pers_') || nodeUri.includes('place_')) {
          this.nodeEntity = nodeUri
        }
        */
        // http://www.example.com/roman-ontology/resource/fact/fact_108
        if (nodeUri.includes('fact_')) {
          this.$router.push(
            this.localePath({
              name: 'item-id',
              params: {
                id: this.$utils.getIdFromUri(nodeUri).replace('fact_', ''),
              },
            })
          )
        }
      }
    },

    // 描画
    async drawNetwork() {
      this.loading = true

      const nodeEntity = this.nodeEntity

      const query4Entity =
        `
      prefix ex: <https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#>
      prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      select * where {
        ?p a ?type;
          ex:eventSince ?since;
          ex:eventUntil ?until .

        ` +
        (nodeEntity ? `filter (?p = <${nodeEntity}>) . ` : '') +
        `
        ?type rdfs:subClassOf ex:EntityInContext .
      }`

      const data4Entity = (
        await this.$axios.get(
          `${url}?query=${encodeURIComponent(query4Entity)}`
        )
      ).data

      let nodeStart = '' // 始点のノード
      let nodeEnd = '' // 終点のノード

      if (nodeEntity && data4Entity.length === 1) {
        const selectedNode = data4Entity[0]
        nodeStart = selectedNode.since
        nodeEnd = selectedNode.until
      } else {
        nodeStart = this.nodeStart
        nodeEnd = this.nodeEnd
      }

      const nodeInitial =
        nodeStart ||
        'http://www.example.com/roman-ontology/resource/fact/fact_2' /* 1 */

      const link = 'ex:mentionedAsPrecedent' // "(ex:mentionedAsPrecedent|ex:therefore)"

      const query4Fact =
        `
      prefix ex: <https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#>
      prefix ex2: <http://www.example.com/roman-ontology/resource/fact/>
      select distinct * where {
         ?startNode ${link}* ?s; ex:description ?descOfStartNode .
         filter (?startNode = <` +
        nodeInitial +
        `>)
         ?s ex:description ?descOfS .
         optional {
          ?s ex:when ?when_s .
          SERVICE SILENT <${endpoint4hutimeperiod}> {
            optional { ?when_s ex:begin ?when_s_begin; ex:end ?when_s_end. }
          }
         }
         ?s ${link} ?o .
         ?o ex:description ?descOfO .
         optional {
           ?o ex:when ?when_o .
           SERVICE SILENT <${endpoint4hutimeperiod}> {
            optional { ?when_o ex:begin ?when_o_begin; ex:end ?when_o_end. }
           }
         }
         ?o ${link}* ?endNode; ex:description ?descOfEndNode .
         filter (?endNode = <` +
        (nodeEnd ||
          'http://www.example.com/roman-ontology/resource/fact/fact_40') /* 14 */ +
        `>)
      }`

      const data4Fact = (
        await this.$axios.get(`${url}?query=${encodeURIComponent(query4Fact)}`)
      ).data

      // factNodesの取り扱い
      const res = handleFactNodes(data4Fact, nodeInitial)
      const nodes = res.nodes
      const edges = res.edges
      // const existsNodes = res.existsNodes

      // contextNodesの取り扱い
      // handleContextNodes(nodes, edges, data4Entity, existsNodes)

      // inとoutが同じ（重なってしまう）factNodeの位置を調整する
      // arrangeNodesX(existsNodes)

      this.nodes = nodes
      this.edges = edges
      this.loading = false
    },

    // factNodeの一覧を取得する
    async getFactList() {
      const query4Fact = `
      prefix ex: <https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#>
      select distinct * where {
         ?s (ex:mentionedAsPrecedent | ex:therefore) ?o
      }`

      const data4Fact = (
        await this.$axios.get(`${url}?query=${encodeURIComponent(query4Fact)}`)
      ).data

      const nodeList = [
        {
          text: '',
          value: '',
        },
      ]
      const nodeUris = []

      for (const data of data4Fact) {
        const keys = ['s', 'o']
        for (const key of keys) {
          const uri = data[key]
          if (!nodeUris.includes(uri)) {
            nodeList.push({
              text: getLabelFromUri(uri),
              value: uri,
            })
            nodeUris.push(uri)
          }
        }
      }

      this.nodeList = nodeList
    },
  },
}

function getLabelFromUri(uri) {
  const spl = uri.split('/')
  return spl[spl.length - 1]
}

function handleFactNodes(data4Fact, nodeInitial) {
  let nodes = []
  const edges = []
  const existsNodes = {}

  const step4factNode = 50
  const keys = ['s', 'o']

  // edgeのfromとtoの対応を格納するマップ
  const edgeMap = {}

  // factNodeとdateNodeの対応を格納するマップ
  const dateNodes = {}

  for (const obj of data4Fact) {
    for (const key of keys) {
      const uri = obj[key]

      const label =
        getLabelFromUri(uri) + '\n' + obj['descOf' + key.toUpperCase()]
      if (!existsNodes[uri]) {
        const factNode = {
          id: uri,
          label,
          // x: 0,
          // physics: false,
          shape: 'box',
          color: '#F44336',
          in: [], // 当該Nodeに入っているNodes。重なってしまうことへの対応用。
          out: [], // 当該Nodeから出ていくNodes。重なってしまうことへの対応用。
        }
        nodes.push(factNode)

        // handleDateNode(dateNodes, obj, key, existsNodes)

        existsNodes[uri] = factNode
      }
    }

    const from = obj.s
    const to = obj.o

    if (!edgeMap[from]) {
      edgeMap[from] = []
    }

    edgeMap[from].push(to)

    edges.push({
      from,
      to,
      arrows: {
        to: {
          enabled: true,
        },
      },
    })

    // fromNodeから出ていくNodes
    const fromOutNodes = existsNodes[from].out
    if (!fromOutNodes.includes(to)) {
      fromOutNodes.push(to)
    }

    // toNodeに入っていくNodes
    const toInNodes = existsNodes[to].in
    if (!toInNodes.includes(from)) {
      toInNodes.push(from)
    }
  }

  const sortedNodeUris = sortNodes([], edgeMap, nodeInitial)

  const sortedNodes = []

  const dateNodesArray = []
  const existsDateNodes = []

  for (const uri of sortedNodeUris) {
    const node = existsNodes[uri]
    node.y = sortedNodes.length * step4factNode
    sortedNodes.push(node)

    if (dateNodes[uri]) {
      for (const dateNodeUri of dateNodes[uri]) {
        const dateNode = existsNodes[dateNodeUri]
        dateNode.y = node.y // dateNodeのx座標は、factNodeのものに合わせる

        if (!existsDateNodes.includes(dateNodeUri)) {
          dateNodesArray.push(dateNode)
          existsDateNodes.push(dateNodeUri)
        }

        // factNodeとdateNodeの関連付け
        edges.push({
          from: uri,
          to: dateNodeUri,
          arrows: {
            to: {
              enabled: true,
            },
          },
        })
      }
    }
  }

  // dateNodesをsortedNodesに加える
  nodes = sortedNodes.concat(dateNodesArray)

  return { nodes, edges, existsNodes }
}

function sortNodes(sortedNodes, edgeMap, fromNode) {
  if (!edgeMap[fromNode]) {
    return sortedNodes
  }

  if (!sortedNodes.includes(fromNode)) {
    sortedNodes.push(fromNode)
  }

  const toNodes = edgeMap[fromNode]

  // まず入れる
  for (const toNode of toNodes) {
    if (!sortedNodes.includes(toNode)) {
      sortedNodes.push(toNode)
    }
  }

  // 各出ていくノードの先を再帰的処理
  for (const toNode of toNodes) {
    sortedNodes = sortNodes(sortedNodes, edgeMap, toNode)
  }

  return sortedNodes
}
/*
function handleDateNode(dateNodes, obj, key, existsNodes) {
  // const step4x = 200

  // when情報を持つ場合
  if (obj['when_' + key]) {
    const uriWhen = obj['when_' + key]
    const labelWhen = obj['when_' + key + '_begin']

    if (!existsNodes[uriWhen]) {
      const whenNode = {
        id: uriWhen,
        label: labelWhen,
        // y, // factNodeと同じy座標
        // x: -1 * step4x, // factNodeの左側（-100 x座標）
        // fixed: true,
        // physics: false,
        shape: 'box',
        color: '#4CAF50',
      }

      existsNodes[uriWhen] = whenNode
    }

    // factNodeとdateNodeの関連付け
    const factNodeUri = obj[key]
    if (!dateNodes[factNodeUri]) {
      dateNodes[factNodeUri] = []
    }
    dateNodes[factNodeUri].push(uriWhen)
  }
}

function handleContextNodes(nodes, edges, data4Entity, existsNodes) {
  // y座標ごとのcontextNodeを格納する
  const contextYList = {}

  // const step4x = 200

  for (const obj of data4Entity) {
    const sinceUri = obj.since
    const untilUri = obj.until

    // 始点と終点がfactNodesにあるものだけを扱う
    // SPARQLクエリで制御する方法もありかも
    if (!existsNodes[sinceUri] || !existsNodes[untilUri]) {
      continue
    }

    const uri = obj.p
    const label = getLabelFromUri(uri)

    const sinceNode = existsNodes[sinceUri]
    const untilNode = existsNodes[untilUri]

    // sinceとuntilの中間
    const contextY = (sinceNode.y + untilNode.y) / 2

    if (!contextYList[contextY]) {
      contextYList[contextY] = []
    }

    const contextNode = {
      id: uri,
      label,
      // y: contextY,
      // x: step4x * (contextYList[contextY].length + 1), // 同じy座標の場合、xにずらす
      // fixed: true,
      // physics: false,
      shape: 'box',
      color: label.includes('pers') ? '#2196F3' : '#9C27B0',
    }

    contextYList[contextY].push(contextNode)

    nodes.push(contextNode)

    // 始点ノードへのリンク
    edges.push({
      from: uri,
      to: sinceUri,
      arrows: {
        to: {
          enabled: true,
        },
      },
    })

    // 終点ノードへのリンク
    edges.push({
      from: uri,
      to: untilUri,
      arrows: {
        to: {
          enabled: true,
        },
      },
    })
  }
}


function arrangeNodesX(existsNodes) {
  // const step4x = 30
  const inOutIdMap = {}

  for (const nodeUri in existsNodes) {
    const node = existsNodes[nodeUri]
    if (node.in && node.out) {
      for (const uriIn of node.in) {
        for (const uriOut of node.out) {
          // in と out が同じものを集計する
          const inOutId = uriIn + ' - ' + uriOut
          if (!inOutIdMap[inOutId]) {
            inOutIdMap[inOutId] = []
          }

          // node.x -= step4x * inOutIdMap[inOutId].length

          inOutIdMap[inOutId].push(nodeUri)
        }
      }
    }
  }
}
*/
</script>
<style>
#mynetwork {
  border: 1px solid lightgray;
}
</style>
