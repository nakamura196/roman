<template>
  <v-container>
    <h2>{{ title }}</h2>

    <network
      id="mynetwork"
      ref="network"
      class="mt-5"
      style="width: 100%; height: 650px"
      :nodes="nodes"
      :edges="edges"
      :options="options"
      @click="onNodeSelected"
    >
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
      title: this.$t('network_static'),
    }
  },

  head() {
    return {
      title: this.title,
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {

      const x = 0
      const y = 0

      const step = 25 * 10

      this.nodes = [
         {
          id: "t1",
          label : "B.C. 58年",
          x,
          y: y - step / 2,
          color: "#4CAF50",
          // fixed: true,
          physics: false,
          shape: "box",
        },
        {
          id: "e1",
          label : "ガリア戦争開始",
          x,
          y,
          color: "#F44336",
          fixed: true,
          physics: false,
          shape: "box",
        },
        {
          id: "e2",
          label : "ルビコン",
          x: x + step,
          y,
          color: "#F44336",
          fixed: true,
          physics: false,
          shape: "box",
        },
        {
          id: "e3",
          label : "カエサル暗殺",
          x: x + step * 2,
          y,
          color: "#F44336",
          fixed: true,
          physics: false,
          shape: "box",
        },
        {
          id: "p1",
          widthConstraint: { maximum: 170 },
          label : "ガリア戦争期のカエサル",
          x: x + step * 1/2,
          y: y + step / 2,
          color: "#2196F3",
          // fixed: true,
          physics: false,
          shape: "box",
        },
        {
          id: "p2",
          widthConstraint: { maximum: 170 },
          label : "内戦期のカエサル",
          x: x + step * 3/2,
          y: y + step / 2,
          // fixed: true,
          physics: false,
          color: "#2196F3",
          shape: "box",
        }
      ]
      this.edges = [
        {
          from : "e1",
          to : "t1",
          arrows: {
            to: {
              enabled: true,
            },
          },
        },
        {
          from : "e1",
          to : "e2",
          arrows: {
            to: {
              enabled: true,
            },
          },
        },
        {
          from : "e2",
          to : "e3",
          arrows: {
            to: {
              enabled: true,
            },
          },
        },
        {
          from : "p1",
          to : "e1",
          arrows: {
            to: {
              enabled: true,
            },
          },
        },
        {
          from : "p1",
          to : "e2",
          arrows: {
            to: {
              enabled: true,
            },
          },
        },
        {
          from : "p2",
          to : "e2",
          arrows: {
            to: {
              enabled: true,
            },
          },
        },
        {
          from : "p2",
          to : "e3",
          arrows: {
            to: {
              enabled: true,
            },
          },
        }
      ]

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
