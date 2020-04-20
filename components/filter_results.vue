<template>
  <div>
    <div class="d-flex pa-2">
      <h1 class="title">{{ $t(`categories.${value}`) }}</h1>
      <v-btn
        icon
        @click="$emit('input', '')"
      >
        <v-icon>osm-close</v-icon>
      </v-btn>
    </div>
    <v-chip-group
      v-if="allCategories[value]"
      :value="value"
    >
      <v-chip
        v-for="(_, subcategory) in allCategories[value].subcategories"
        :key="subcategory"
        :value="`${value}/${subcategory}`"
        active-class="primary--text"
      >
        <v-icon small>{{ `osm-${subcategory}` }}</v-icon>
        <span class="pl-1">{{ $t(`categories.${subcategory}`) }}</span>
      </v-chip>
    </v-chip-group>
    <v-list>
      <template v-for="place in results.features">
        <v-divider />
        <place-dense
          :key="place.id"
          :place="place"
          :featuresAndLocation="featuresAndLocation"
        />
      </template>
      <v-divider />
    </v-list>
    <v-pagination
      :value="1"
      :length="4"
      class="my-4"
    ></v-pagination>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PlaceDense from './place/dense';

export default {
  components: { PlaceDense },

  props: {
    value: {
      type: String,
      required: true
    },

    results: {
      type: Object,
      required: true
    },

    featuresAndLocation: {
      type: String,
      required: false,
      default: ''
    }
  },

  computed: mapGetters(['allCategories'])
}
</script>
