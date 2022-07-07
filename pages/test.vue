<template>
  <div>
    <Products />
  </div>
</template>
<script>
import Products from '~/components/layout/Products.vue'
export default {
  components: {
    Products,
  },
  data() {
    return {
      baseUrl: process.env.BASE_URL,
      top: process.env.top,
      siteName: process.env.siteName,
    }
  },
}
</script>
