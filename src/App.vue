<template>
  <div id="app">
    <div
      id="gooseContainer"
    >
      <Goose
        v-for="note in notes"
        :key="note.note"
        :keyboardkey="note.keyboardKey"
        :modulation="note.note"
      ></Goose>
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
      notes: {
        B2: {
          note: 'B2',
          keyboardKey: 'a',
        },
        C3: {
          note: 'C3',
          keyboardKey: 's',
        },
        D3: {
          note: 'D3',
          keyboardKey: 'd',
        },
        E3: {
          note: 'E3',
          keyboardKey: 'f',
        },
        F3: {
          note: 'F3',
          keyboardKey: 'g',
        },
        G3: {
          note: 'G3',
          keyboardKey: 'h',
        },
        A3: {
          note: 'A3',
          keyboardKey: 'j',
        },
      },
    }
  },
}

</script>

<style>
#gooseContainer {
  display: flex;
}
</style>
