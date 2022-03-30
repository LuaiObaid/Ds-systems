<template>
  <div>
  <b-button>Disconnect</b-button>
  <b-button >Publish</b-button>
  <div :key="dentist.id" v-for="dentist in getDentists">
  <h3> {{ dentist.name }} </h3>
  </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'


export default {
  components: {
  },
  data() {
    return {
    }
  },
  created() {
  },
  computed: {
    ...mapGetters(["getDentists"])
  },

  methods: {
    
  }
}
</script>
