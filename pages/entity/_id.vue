<template>
  <div>
    <Breadcrumbs :items="bh" />
    <v-container class="my-5">
      <EntityBlock :id="id" />
    </v-container>
  </div>
</template>
<script>
import Breadcrumbs from '~/components/layout/Breadcrumbs.vue'
import EntityBlock from '~/components/EntityBlock.vue'

export default {
  components: {
    Breadcrumbs,
    EntityBlock,
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
          text: this.id,
        },
      ]
    },
  },
}
</script>
