<template>
  <div id="app">
    <div id="gooseContainer">
      <Goose
        v-for="note in notes"
        :key="note.note"
        :keyboardkey="note.keyboardKey"
        :modulation="note.note"
        @goose-note="addNoteToRecord"
      ></Goose>
    </div>
    <div id="container">
      <record :notelist="testlist">
      </record>
    </div>
  </div>
</template>

<script>
  import Goose from './components/Goose.vue'
  import Record from './components/Record.vue'
  import MidiConnect from './services/connectToMidi'

  export default {
    name: 'App',
    components: {
      Goose,
      Record,
    },
    data() {
      return {
        // We need to normalise both the key and the midi note in to the
        // same format and put that info into this array
        notes: {
          B2: { note: 'B2', keyboardKey: 'a' },
          C3: { note: 'C3', keyboardKey: 's' },
          D3: { note: 'D3', keyboardKey: 'd' },
          E3: { note: 'E3', keyboardKey: 'f' },
          F3: { note: 'F3', keyboardKey: 'g' },
          G3: { note: 'G3', keyboardKey: 'h' },
          A3: { note: 'A3', keyboardKey: 'j' },
        },
        testlist: [],
      }
    },
    mounted() {
      // Initialise connection to midi (if available)
      MidiConnect.connectToMidi();
    },
    methods: {
      addNoteToRecord(event) {
        this.testlist.push(event)
      },
    },
  }
</script>

<style>
  @media screen and (min-width: 900px) {
    #gooseContainer {
      display: flex;
    }
  }
</style>
