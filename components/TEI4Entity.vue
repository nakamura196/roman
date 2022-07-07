<template>
  <span
    :id="element.attributes['xml:id']"
    :style="`color: ${color}; cursor: pointer; ${isHightlighted}`"
    @dblclick="clickEntity(element)"
  >
    <template v-for="(e, key) in element.elements">
      <TEI :key="key" :element="e"> </TEI>
    </template>
  </span>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'nuxt-property-decorator'

@Component({
  components: {},
})
export default class TEI4Entity extends Vue {
  @Prop({})
  element!: any

  get color() {
    const name = this.element.name

    switch (name) {
      case 'persName':
        return 'red'
      case 'orgName':
        return 'green'
      case 'placeName':
        return 'blue'
      default:
        return ''
    }
  }

  get selectedEntityIdOnText() {
    return this.$store.getters.getSelectedEntityIdOnText
  }

  set selectedEntityIdOnText(value) {
    this.$store.commit('setSelectedEntityIdOnText', value)
  }

  get isRedraw() {
    return this.$store.getters.getIsRedraw
  }

  set isRedraw(value) {
    this.$store.commit('setIsRedraw', value)
  }

  get selectedReferenceIdOnText() {
    return this.$store.getters.getSelectedReferenceIdOnText
  }

  set selectedReferenceIdOnText(value) {
    this.$store.commit('setSelectedReferenceIdOnText', value)
  }

  get entityAttributes() {
    return this.$store.getters.getEntityAttributes
  }

  get selectedFactoidIdOnText() {
    return this.$store.getters.getSelectedFactoidIdOnText
  }

  set selectedFactoidIdOnText(value) {
    this.$store.commit('setSelectedFactoidIdOnText', value)
  }

  clickEntity(element: any) {
    // factoidは空にする必要ない
    // this.selectedFactoidIdOnText = ''
    
    this.isRedraw = true
    if (element.attributes) {
      const id = element.attributes['xml:id'] // referenceId
      this.selectedReferenceIdOnText = id

      const entityInContextUri = this.entityAttributes[id]
      this.selectedEntityIdOnText = entityInContextUri
    }
  }

  get isHightlighted() {
    return this.element.attributes['xml:id'] === this.selectedReferenceIdOnText
      ? 'background-color: #E0E0E0;'
      : ''
  }
}
</script>
