<template>
  <div>
    <v-container>
      <h1>{{ page.title }}</h1>
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
  async asyncData ({ $content, params }) {
    const slug = params.slug
    const page = await $content(slug).fetch()

    return {
      page
    }
  }
}
</script>
