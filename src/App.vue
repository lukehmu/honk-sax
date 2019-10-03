<template>
  <div id="app">
    <div
      id="gooseContainer"
    >
      <Goose
        v-for="note in notes"
        :key="note"
        :modulation="note"
      ></Goose>
      {{ note }}
    </div>
  </div>
</template>

<script>
import Goose from './components/Goose.vue'

export default {
  name: 'App',
  components: {
    Goose,
  },
  data() {
    return {
      notes: ['B2', 'C3', 'D3', 'E3', 'F3', 'G3', 'A3'],
    }
  },
}

</script>

<style>
#gooseContainer {
  display: flex;
}
</style>
