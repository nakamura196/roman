<template>
  <component :is="getComponent(element)">
    <template v-if="element.text">
      {{ element.text }}
    </template>
    <template v-else-if="element.name === 'w'">
      <template v-if="hasSpanId(element)">
        <!--
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <span style="display: inline-block" v-bind="attrs" v-on="on">
              <template v-for="(e, key) in element.elements">
                <TEI :key="key" :element="e"> </TEI>
              </template>
              &nbsp;
              <div
                v-for="(e, key2) in getSpanId(element)"
                :key="`l-${key2}`"
                style="margin-bottom: 2px; height: 4px"
                :style="`background-color: ${getTypeColor(e.type)}`"
              ></div>
            </span>
          </template>
          <span>{{ getSpanId(element) }}</span>
        </v-tooltip>
        -->

        <span
          style="display: inline-block"
          :style="isHightlighted(element) ? 'background-color: #E0E0E0;' : ''"
        >
          <template v-for="(e, key) in element.elements">
            <TEI :key="key" :element="e"> </TEI>
          </template>
          &nbsp;
          <v-tooltip
            v-for="(factoid, key2) in getSpanId(element)"
            :key="`l-${key2}`"
            bottom
          >
            <template #activator="{ on, attrs }">
              <div
                :id="`roman-${$utils.getIdFromUri(factoid.id)}`"
                v-bind="attrs"
                style="margin-bottom: 4px; height: 8px; cursor: pointer"
                :style="`background-color: ${getTypeColor(factoid.type)}`"
                @click="clickFactoid(factoid.id)"
                v-on="on"
              ></div>
            </template>
            <span>{{ factoid.note }}</span>
          </v-tooltip>
        </span>
      </template>
      <template v-else>
        <span>
          <template v-for="(e, key) in element.elements">
            <TEI :key="key" :element="e"> </TEI>
          </template>
        </span>
      </template>
    </template>
    <template v-else-if="element.name === 'persName'">
      <TEI4Entity :element="element"></TEI4Entity>
    </template>
    <template v-else-if="element.name === 'orgName'">
      <TEI4Entity :element="element"></TEI4Entity>
    </template>
    <template v-else-if="element.name === 'placeName'">
      <TEI4Entity :element="element"></TEI4Entity>
    </template>
    <template v-else-if="element.name === 'objectName'">
      <TEI4Entity :element="element"></TEI4Entity>
    </template>
    <template v-else-if="element.name === 'date'">
      <TEI4Entity :element="element"></TEI4Entity>
    </template>
    <template v-else-if="element.name === 'milestone'">
      <template v-if="element.attributes.unit === 'chapter'">
        <h3 class="mt-10">Chapter. {{ element.attributes.n }}</h3>
      </template>
      <template v-else-if="element.attributes.unit === 'section'">
        <h4 class="mt-5">Section. {{ element.attributes.n }}</h4>
      </template>
    </template>
    <template v-else>
      <template v-for="(e, key) in element.elements">
        <TEI :key="key" :element="e"></TEI>
      </template>
    </template>
  </component>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'nuxt-property-decorator'
import TEI from '~/components/TEI.vue'
import TEI4Entity from '~/components/TEI4Entity.vue'

@Component({
  name: 'TEI',
  components: {
    TEI,
    TEI4Entity,
  },
})
export default class TEIElements extends Vue {
  @Prop({})
  element!: any

  getComponent(element: any) {
    if (element.name === 'div') {
      return 'div'
    } else if (element.name === 'div1') {
      return 'div'
    } else if (element.name === 'p') {
      return 'p'
    } else {
      return 'span'
    }
  }

  /// /////

  get wordAttributes() {
    return this.$store.getters.getWordAttributes
  }

  get entityAttributes() {
    return this.$store.getters.getEntityAttributes
  }

  ///

  get selectedFactoidIdOnText() {
    return this.$store.getters.getSelectedFactoidIdOnText
  }

  set selectedFactoidIdOnText(value) {
    this.$store.commit('setSelectedFactoidIdOnText', value)
  }

  get selectedEntityIdOnText() {
    return this.$store.getters.getSelectedEntityIdOnText
  }

  set selectedEntityIdOnText(value) {
    this.$store.commit('setSelectedEntityIdOnText', value)
  }

  get selectedReferenceIdOnText() {
    return this.$store.getters.getSelectedReferenceIdOnText
  }

  set selectedReferenceIdOnText(value) {
    this.$store.commit('setSelectedReferenceIdOnText', value)
  }

  ///

  hasSpanId(element: any) {
    if (element.attributes) {
      const id = element.attributes['xml:id']
      return this.wordAttributes[id]
    } else {
      return false
    }
  }

  getSpanId(element: any) {
    if (element.attributes) {
      const id = element.attributes['xml:id']
      return this.wordAttributes[id]
    } else {
      return []
    }
  }

  isHightlighted(element: any) {
    let isHightlighted = false
    const spans = this.getSpanId(element)
    const fIds = []
    for (const span of spans) {
      fIds.push(span.id)
    }
    if (fIds.includes(this.selectedFactoidIdOnText)) {
      isHightlighted = true
    }
    return isHightlighted
  }

  getTypeColor(type: any) {
    let color = null
    if (type === "ActionFactoid") {
        color = "#FFEE58"; // yellow lighten-1
      } else if (type === "ContactFactoid") {
        color = "#FFA726"; // orange lighten-1
      } else if (type === "SituationFactoid") {
        color = "#42A5F5"; // blue lighten-1
      } else if (type === "OfficeFactoid") {
        color = "#5C6BC0"; // blue lighten-1
      } else if (type === "TitleFactoid") {
        color = "#7E57C2"; // blue lighten-1
      } else if (type === "SocialRelationshipFactoid") {
        color = "#26A69A"; // blue lighten-1
      } else if (type === "FamilialRelationshipFactoid") {
        color = "#66BB6A"; // blue lighten-1
      } else if (type === "GeoFactoid") {
        color = "#8D6E63"; // green lighten-1
      } else {
        color = "#BDBDBD"; // grey lighten-1
      }

      return color;
  }

  clickFactoid(factoidId: string) {
    this.selectedEntityIdOnText = ''
    this.selectedFactoidIdOnText = factoidId
  }
}
</script>
