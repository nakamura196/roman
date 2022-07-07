<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" app>
      <Menu></Menu>
    </v-navigation-drawer>
    <v-app-bar app depressed color="primary" flat dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-toolbar-title>
        <nuxt-link
          :to="
            localePath({
              name: 'index',
            })
          "
          style="color: inherit; text-decoration: inherit"
        >
          {{ title }}
        </nuxt-link>
      </v-toolbar-title>
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>

    <v-footer :dark="true" class="mt-5">
      <v-container>
        <p class="text-center my-5">
          <span>&copy; {{ new Date().getFullYear() }}</span>
        </p>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      title: process.env.siteName,
    }
  },
}
</script>
