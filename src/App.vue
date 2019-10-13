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
  import HonkHelper from './services/Sound'

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
        midiNote: '',
      }
    },
    mounted() {
      // Initialise connection to midi (if available)
      this.connectToMidi();
    },
    methods: {
      addNoteToRecord(event) {
        this.testlist.push(event)
      },
      honk(note) {
        this.$emit('goose-note', note)
        // this.toggleButton()
        return HonkHelper.honk(note)
      },
      connectToMidi() {
        // Bind functions to 'this'
        const boundOnMIDISuccess = this.onMIDISuccess.bind(this)
        const boundOnMIDIFailure = this.onMIDIFailure.bind(this)

        // request MIDI access
        if (navigator.requestMIDIAccess) {
          navigator.requestMIDIAccess({
            sysex: false, // this defaults to 'false' and we won't be covering sysex in this article.
          }).then(boundOnMIDISuccess, boundOnMIDIFailure)
        } else {
          alert('No MIDI support in your browser.')
        }
      },
      // midi functions
      onMIDISuccess(midiAccess) {
        // when we get a succesful response, run this code
        // console.log('MIDI Access Object', midiAccess)

        const midi = midiAccess

        const inputs = midi.inputs.values()

        for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
          input.value.onmidimessage = this.onMIDIMessage
        }
      },
      // Outputs the MIDI message
      onMIDIMessage(message) {
        const { data } = message

        const note = data[1]
        // return note
        this.midiNote = note
      },
      onMIDIFailure(e) {
        // when we get a failed response, run this code
        console.log(`No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim ${e}`)
      },
      convertMidiNote(midiNote) {
        let newNote = '';
        switch (midiNote) {
          case 48:
            newNote = 'C3'
            break
          case 50:
            newNote = 'D3'
            break
          case 52:
            newNote = 'E3'
            break
          case 53:
            newNote = 'F3'
            break
          case 55:
            newNote = 'G3'
            break
          case 57:
            newNote = 'A3'
            break
          case 59:
            newNote = 'B3'
            break
          case 60:
            newNote = 'C4'
            break
          default:
            return
        }
        this.honk(newNote)
      },
    },
    watch: {
      midiNote: function() {
        this.convertMidiNote(this.midiNote)
      }
    }
  }
</script>

<style>
  @media screen and (min-width: 900px) {
    #gooseContainer {
      display: flex;
    }
  }
</style>
