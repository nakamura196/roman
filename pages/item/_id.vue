<template>
  <div>
    <Breadcrumbs :items="bh" />
    <v-container class="my-5">
      <FactoidBlock :id="id"></FactoidBlock>
    </v-container>
  </div>
</template>
<script>
import Breadcrumbs from '~/components/layout/Breadcrumbs.vue'
import FactoidBlock from '~/components/FactoidBlock.vue'

export default {
  components: {
    Breadcrumbs,
    FactoidBlock,
  },
  data() {
    return {
      id: this.$route.params.id,
    }
  },
  computed: {
    bh() {
      return [
        {
          text: this.$t('top'),
          disabled: false,
          to: this.localePath({ name: 'index' }),
          exact: true,
        },
        {
          text: this.$t('search'),
          disabled: false,
          to: this.localePath({ name: 'search' }),
          exact: true,
        },
        {
          text: this.$utils.createFactoidTitleFromId(this.id),
        },
      ]
    },
  },

  mounted() {},
  methods: {},
}
</script>
