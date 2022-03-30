<template>
  <l-map id="mapBox" :zoom="zoom" :center="center">
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    <div :key="dentist.id" v-for="dentist in getDentists">
    <l-marker :lat-lng="[dentist.coordinate.latitude, dentist.coordinate.longitude]">
        <l-popup :options="{ autoClose: false, closeOnClick: false}">
          <div>
            {{ dentist.name }}
            <b-button @click="innerClick(dentist.id)">Publish</b-button>
          </div>

        </l-popup>
      </l-marker>
    </div>   
  </l-map>
</template>

<script>
import {LMap, LTileLayer, LMarker, LPopup} from 'vue2-leaflet';
import { latLng } from 'leaflet'
import { mapGetters } from 'vuex';

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 13,
      center: latLng(57.708870, 11.974560),
      markerLatLng: latLng(57.708870, 12.974560),
      showParagraph: false,
      dentists: [],
      coordinates : {
        lat: 0,
        lng: 0
      }
    };
  },
  computed: {
    ...mapGetters(["getDentists"],["getTimes"]),
  },
  methods: {
    publishDentId(){
      let lat = parseInt(this.$store.getters.getDentists[1].coordinate.latitude)
      let lng = parseInt(this.$store.getters.getDentists[1].coordinate.longitude)
      console.log(lat, lng)
    },
    innerClick(id){
      this.$root.$emit("emit", id)
    }
  },
  created() {
    this.coordinates = { lat: 57.7, lng: 11.95 };
    this.dentists = this.getDentists;
  }
}
</script>

<style>
  #mapBox{
    margin-top: 100px;
    margin-left: 400px;
    height: 600px;
    width: 900px;
    border-style: solid;
    border-radius: 20px 20px 20px 20px;
  }
</style>