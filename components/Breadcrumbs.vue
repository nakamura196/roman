<template>
  <v-sheet color="grey lighten-2">
    <v-container fluid class="py-2">
      <v-breadcrumbs class="py-0 mx-0 px-0" :items="items">
        <template #divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
    </v-container>
  </v-sheet>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'nuxt-property-decorator'

@Component({
  components: {},
})
export default class License extends Vue {
  @Prop({
    required: true,
  })
  items!: any[]
}
</script>
