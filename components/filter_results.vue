<template>
  <div>
    <div class="d-flex pa-2">
      <h1 class="title">{{ $t(`categories.${category}`) }}</h1>
      <v-btn
        icon
        @click="$emit('input', '')"
      >
        <v-icon>osm-close</v-icon>
      </v-btn>
    </div>
    <v-menu v-if="allCategories[category]">
      <template v-slot:activator="{ on }">
        <v-chip
          v-if="hasSelectedSubCategory"
          color="primary"
          class="ml-2"
          v-on="on"
        >
          <v-icon left>osm-{{ value.split('/')[1] }}</v-icon>
          {{ $t(`categories.${value.split('/')[1]}`) }}
          <v-btn
            color="white"
            icon
            right
            @click.stop="$emit('input', category)"
          >
            <v-icon>osm-close</v-icon>
          </v-btn>
        </v-chip>
        <v-chip
          v-else
          outlined
          class="ml-2"
          v-on="on"
        >
          <v-icon left>osm-filter_list</v-icon>
          Filter
        </v-chip>
      </template>
      <v-list>
        <v-list-item-group
          :value="value"
          @change="(v) => $emit('input', v)"
        >
          <v-list-item
            v-for="(_, subcategory) in allCategories[category].subcategories"
            :key="subcategory"
            :value="`${category}/${subcategory}`"
            active-class="primary--text"
          >
            <v-list-item-icon class="mr-0 my-3">
              <v-icon small>{{ `osm-${subcategory}` }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t(`categories.${subcategory}`) }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
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

  computed: {
    ...mapGetters(['allCategories']),

    category() {
      return this.value.split('/')[0];
    },

    hasSelectedSubCategory() {
      return this.value.includes('/');
    }
  }
}
</script>
