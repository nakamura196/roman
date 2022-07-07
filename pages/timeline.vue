<template>
  <v-container>
    <h2>{{ title }}</h2>

    <timeline
      v-if="itemsVis.length > 0"
      ref="timeline"
      class="my-5"
      style="height: 500px"
      :items="itemsVis"
      :groups="groups"
      :options="options"
    >
    </timeline>

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
import { Timeline } from 'vue-visjs'

export default {
  components: {
    timeline: Timeline,
  },
  data() {
    return {
      baseUrl: process.env.BASE_URL,
      headers: [
        {
          text: 'URI',
          value: 'uri',
        },
        {
          text: 'HuTimeのURI',
          value: 'when',
        },
        {
          text: 'Start',
          value: 'start',
        },
        {
          text: 'End',
          value: 'end',
        },
      ],
      items: [],
      title: 'Timeline',

      groups: [
        {
          id: 0,
          content: 'Group 1',
        },
      ],
      itemsVis: [],
      options: {
        height: '500px',
      },
    }
  },

  head() {
    return {
      title: this.title,
    }
  },

  async mounted() {
    const url = 'https://dydra.com/junjun7613/romanfactoid_v2/sparql'

    const endpoint4hutimeperiod = "https://dydra.com/junjun7613/hutimeperiod/sparql"

    const query = `
      prefix ex: <https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#>
      select distinct *  where {
        ?s ex:mentionedAsPrecedent ?o .
        optional { 
          ?s ex:when ?when_s . 
          SERVICE SILENT <${endpoint4hutimeperiod}> {
            optional { ?when_s ex:begin ?when_s_begin; ex:end ?when_s_end. }
          }
        }
        optional { 
          ?o ex:when ?when_o . 
          SERVICE SILENT <${endpoint4hutimeperiod}> {
            optional { ?when_o ex:begin ?when_o_begin; ex:end ?when_o_end. }
          }
        }
      }
    `

    const data = (
      await this.$axios.get(`${url}?query=${encodeURIComponent(query)}`)
    ).data

    const items = createItems(data)

    this.items = items

    this.itemsVis = createItemsVis(items)
  },
}

// sparqlの結果をテーブル表示用の配列に直す
function createItems(data) {
  const itemByMap = {}

  for (const obj of data) {
    // 変数sとo、それぞれについて実行する
    const keys = ['s', 'o']

    for (const key of keys) {
      const uri = obj[key]

      // uriを持っていなければ
      if (!itemByMap[uri]) {
        itemByMap[uri] = {
          uri,
        }

        const item = itemByMap[uri]

        const keyWhen = key === 's' ? 'when_s' : 'when_o'

        // whenを持っていれば
        if (obj[keyWhen]) {
          const uriWhen = obj[keyWhen]
          item.when = uriWhen

          /*
          // 応急処置的に、uriをisoの日付表記に直す
          const rangeWhen = convertHuTimeUri2DateRange(uriWhen)
          item.start = rangeWhen.start

          // 日まで指定されている場合は、endを与えない。
          if (rangeWhen.end) {
            item.end = rangeWhen.end
          }
          */
         
          const begin = obj[`when_${key}_begin`]
          const end = obj[`when_${key}_end`]

          if(begin){
            item.start = begin.replace("00", "0000") // 要修正
          }

          // begin と end が同じ場合には、endは不要
          if(end && begin !== end){
            item.end = end.replace("00", "0000") // 要修正
          }
        }
      }
    }
  }

  // 配列に直す
  const items = []
  for (const uri in itemByMap) {
    items.push(itemByMap[uri])
  }

  return items
}

/*
// 未使用
function convertHuTimeUri2DateRange(uri) {
  switch (uri) {
    case 'http://www.example.com/roman-ontology/resource/dateRange/dateRange_abc61':
      return {
        start: '-000061-01-01',
        end: '-000061-12-31',
      }

    case 'http://www.example.com/roman-ontology/resource/dateRange/dateRange_abc58':
      return {
        start: '-000058-01-01',
        end: '-000058-12-31',
      }

    case 'http://www.example.com/roman-ontology/resource/dateRange/dateRange_abc58-03-28':
      return {
        start: '-000058-03-28',
        // end: '-000058-03-28',
      }
  }
}
*/

// timeline用の形式に変換
function createItemsVis(items) {
  const itemsVis = []
  for (const item of items) {
    if (!item.start) {
      continue
    }

    itemsVis.push({
      id: item.uri,
      start: item.start,
      end: item.end,
      content: item.uri.split('/fact/')[1],
      group: 0,
    })
  }

  return itemsVis
}
</script>
