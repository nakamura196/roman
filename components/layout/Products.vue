<template>
  <ul>
    <li v-for="(product, key) in products" :key="key">
      {{ product }}
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

type Product = {
  id: string
  name: string
  price: number
}

@Component({
  components: {},
})
export default class License extends Vue {
  // state
  products: Product[] = []

  // computed
  get getProducts() {
    return this.products
  }

  mounted() {
    this.fetchProducts()
  }

  // methods内に設定する関数
  fetchProducts() {
    // 商品取得処理情報取得処理
    this.products = [
      {
        id: '1',
        name: 'イヤホン',
        price: 5980,
      },
      {
        id: '2',
        name: 'ドライヤー',
        price: 9250,
      },
    ]
  }
}
</script>
