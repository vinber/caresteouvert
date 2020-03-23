import 'mapbox-gl/dist/mapbox-gl.css';

import Vue from 'vue';
import Vuetify, {
  VAlert,
  VApp,
  VBtn,
  VCard,
  VCardSubtitle,
  VCardText,
  VCardTitle,
  VCheckbox,
  VCol,
  VContainer,
  VContent,
  VDivider,
  VIcon,
  VImg,
  VLayout,
  VList,
  VListGroup,
  VListItem,
  VListItemAction,
  VListItemAvatar,
  VListItemContent,
  VListItemGroup,
  VListItemIcon,
  VListItemTitle,
  VNavigationDrawer,
  VRow,
  VSlideXReverseTransition,
  VSpacer,
  VSubheader,
  VToolbar,
  VToolbarTitle,
  VTooltip,
} from 'vuetify/lib';
import { Resize } from 'vuetify/lib/directives'
import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n';

import App from './app.vue';
import OsmMap from './map.vue';

import messages from '../locales.json';

Vue.use(Vuetify, {
  components: {
    VAlert,
    VApp,
    VBtn,
    VCard,
    VCardSubtitle,
    VCardText,
    VCardTitle,
    VCheckbox,
    VCol,
    VContainer,
    VContent,
    VDivider,
    VIcon,
    VImg,
    VLayout,
    VList,
    VListGroup,
    VListItem,
    VListItemAction,
    VListItemAvatar,
    VListItemContent,
    VListItemGroup,
    VListItemIcon,
    VListItemTitle,
    VNavigationDrawer,
    VRow,
    VSlideXReverseTransition,
    VSpacer,
    VSubheader,
    VToolbar,
    VToolbarTitle,
    VTooltip,
  },
  directives: {
    Resize
  }
});
Vue.use(VueRouter);
Vue.use(VueI18n);

const vuetify = new Vuetify({});

const i18n = new VueI18n({
  locale: 'fr',
  messages,
});

const routes = [
  {
    name: 'index',
    path: '/:featuresAndLocation?',
    component: OsmMap,
    props: (route) => {
      return {
        featuresAndLocation: route.params.featuresAndLocation
      };
    },
    children: [
      {
        name: 'place',
        path: 'place/:idCategory/:idFeature/:id',
        component: () => import('./detail'),
        props: (route) => {
          return {
            featuresAndLocation: route.params.featuresAndLocation,
            idCategory: route.params.idCategory,
            idFeature: route.params.idFeature,
            id: route.params.id
          };
        }
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  router,
  i18n,
  vuetify,
  render: createEle => createEle(App),
}).$mount('#app');
