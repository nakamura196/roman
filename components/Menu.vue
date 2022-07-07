<template>
  <v-list>
    <v-list-item
      v-for="(item, i) in items"
      :key="i"
      :to="item.to"
      :href="item.href"
      router
      exact
    >
      <v-list-item-action>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title v-text="item.title" />
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  components: {},
})
export default class Menu extends Vue {
  get items(): any[] {
    return [
      {
        icon: 'mdi-home',
        title: 'Home',
        to: (this as any).localePath({ name: 'index' }),
      },
      {
        icon: 'mdi-information',
        title: 'About',
        to: (this as any).localePath({
          name: 'static-slug',
          params: { slug: 'about' },
        }),
      },
      {
        icon: 'mdi-text',
        title: 'Text',
        to: (this as any).localePath({ name: 'text' }),
      },
      {
        icon: 'mdi-calendar',
        title: 'Events',
        to: (this as any).localePath({ name: 'events' }),
      },
      /*
        {
          icon: 'mdi-calendar',
          title: 'Events',
          to: this.localePath({ name: 'events' }),
        },
        {
          icon: 'mdi-magnify',
          title: 'Search',
          to: this.localePath({ name: 'search' }),
        },
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: this.localePath({ name: 'index' }),
        },
        {
          icon: 'mdi-calendar',
          title: 'Timeline',
          to: this.localePath({ name: 'timeline' }),
        },
        {
          icon: 'mdi-table',
          title: 'table',
          to: this.localePath({ name: 'table' }),
        },
        {
          icon: 'mdi-magnify',
          title: 'テーブルテスト2',
          to: this.localePath({ name: 'table2' }),
        },
        {
          icon: 'mdi-network',
          title: 'Network',
          to: this.localePath({ name: 'network' }),
        },
        {
          icon: 'mdi-network',
          title: 'Network Static',
          to: this.localePath({ name: 'network_static' }),
        },
        {
          icon: 'mdi-network',
          title: 'Network Dynamic',
          to: this.localePath({ name: 'network_dynamic' }),
        },
        {
          icon: 'mdi-map',
          title: 'Map',
          to: this.localePath({ name: 'map' }),
        },
        {
          icon: 'mdi-dabase',
          title: 'Snorql',
          href: process.env.BASE_URL + '/snorql',
        },
        */
    ]
  }
}
</script>
