<template>
  <div>
    <section class="mb-5">
      <v-parallax :src="top" height="300">
        <v-layout column align-center justify-center class="white--text">
          <h1 class="white--text mb-2 display-1 text-center">
            <b>{{ siteName }}</b>
          </h1>
          <v-btn
            large
            class="mt-5"
            :to="localePath({ name: 'search' })"
            color="primary"
            >{{ $t('try_out') }}</v-btn
          >
        </v-layout>
      </v-parallax>
    </section>
    <v-container> 
      <nuxt-content :document="page" />
       </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      baseUrl: process.env.BASE_URL,
      top: process.env.top,
      siteName: process.env.siteName,
    }
  },
  async asyncData ({ $content }) {
    const page = await $content('index').fetch()

    console.log({page})

    return {
      page
    }
  }
}
</script>
