<template>
  <div id="app">
    <div id="gooseContainer" v-for="note in notes" v-bind:key="note">
    <Goose :modulation="note"></Goose>
    {{ note }}
    </div>
  </div>
</template>

<script>
import Goose from './components/Goose.vue'

export default {
  name: 'app',
  components: {
    Goose
  },
  data() {
    return {
      notes: ['-36','-24','-12','0','12','24','36']
    }
  }
}

</script>

<style>

</style>
