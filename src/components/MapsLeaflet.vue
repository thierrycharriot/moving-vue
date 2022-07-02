<template>

    <div class="results-page__map_leaflet" v-if="this.center">

        <l-map
            v-model="zoom"
            v-model:zoom="zoom"
            :center="center"
            @move="log('move')"
            >
            <l-tile-layer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            ></l-tile-layer>

            <l-marker :lat-lng="center">

            </l-marker>

        </l-map>
    </div>
</template>

<script>
import {
  LMap,
  LTileLayer,
  LMarker,
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  data() {
    return {
      zoom: 12,
      iconWidth: 25,
      iconHeight: 40,
      center: null,
      placeRequested: JSON.parse(window.localStorage.getItem('research'))
    };
  },

  methods: {
    log(a) {
      console.log(a);
    },

  },

  mounted() {
    console.log(this.placeRequested)
    const coordinates = this.placeRequested.geometry.coordinates
    //console.log( coordinates );
    this.center = [coordinates[1], coordinates[0]]
  }
};
</script>
