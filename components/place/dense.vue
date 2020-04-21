<template>
  <v-list-item
    :to="{ name: 'place', params: { id: place.id, featuresAndLocation } }"
    class="pa-2"
    active-class="primary--text"
  >
    <v-list-item-icon class="mr-1 my-1">
      <v-icon small>{{ `osm-${category}` }}</v-icon>
    </v-list-item-icon>
    <v-list-item-content class="my-1 py-0">
      <v-list-item-title>{{ title || type }}</v-list-item-title>
      <v-list-item-subtitle v-if="title">{{ type }}</v-list-item-subtitle>
      <v-list-item-subtitle
        v-if="!$vuetify.breakpoint.smAndDown && (contact('phone') || contact('mobile'))"
        v-text="contact('phone') || contact('mobile')"
      />
    </v-list-item-content>
    <v-list-item-action
      v-if="$vuetify.breakpoint.smAndDown && (contact('phone') || contact('mobile'))"
      class="my-1"
    >
      <v-btn
        :href="`tel:${contact('phone') || contact('mobile')}`"
        icon
        @click.stop
      >
        <v-icon>osm-phone</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import placeMixin from '../mixins/place';

export default {
  mixins: [placeMixin],

  props: {
    place: {
      type: Object,
      required: true
    },

    featuresAndLocation: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>
