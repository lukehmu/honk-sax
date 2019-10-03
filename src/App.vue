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
      notes: ['D2','F2','A2','C3','D3','F3','A3']
    }
  }
}

</script>

<style>

</style>
