<template>
  <div>
    {{ text }}
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    id: {
      type: String,
      require: true,
      default: '',
    },
  },
  data() {
    return {
      baseUrl: process.env.BASE_URL,
      text: '',
    }
  },
  computed: {},
  watch: {},
  async mounted() {
    const factoidId = this.$utils.getIdFromUri(this.id)

    const res = await axios.get(this.baseUrl + '/xml/BG_1_TEI.xml')

    // xmlに変換
    const parser = new window.DOMParser()
    const xmlData = parser.parseFromString(res.data, 'text/xml')

    const wordListByFactoid = this.$utils.getWordListByFactoid(
      xmlData,
      factoidId
    )

    const words = []

    for (const wid in wordListByFactoid) {
      const wordText = xmlData
        .querySelector(`w[*|id='${wid}']`)
        .textContent.trim()
      words.push(wordText)
    }

    this.text = words.join(' ')

    // xmlをjsonに変換
    /*
    const df = JSON.parse(
      convert.xml2json(xmlData.querySelector('text').outerHTML, {
        compact: false,
        spaces: 4,
      })
    )
    */
  },
  methods: {},
}
</script>
