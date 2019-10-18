<template>
  <div id="goose">
    <button
      :id="keyboardkey"
      class="btn"
      :class="{ 'btn--active': buttonActive }"
      @mousedown="honk"
      @mouseup="toggleButton"
    >
      Goose {{ keyboardkey }}
    </button>
  </div>
</template>
<script>
import WebMidi from 'webmidi'
import HonkHelper from '../services/Sound'

WebMidi.enable((err) => {
  if (err) {
    console.log('WebMidi could not be enabled.', err)
  }

  // Viewing available inputs and outputs
  console.log(WebMidi.inputs)
  const input = WebMidi.inputs[0]

  input.addListener('noteon', 'all',
    (e) => {
      console.log(`Received 'noteon' message (${e.note.name}${e.note.octave}).`)
    })
})

export default {
  props: {
    modulation: {
      type: String,
      default: '',
    },
    keyboardkey: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      buttonActive: false,
    }
  },
  created() {
    document.addEventListener('keydown', this.keyDownHandler)
    document.addEventListener('keyup', this.keyUpHandler)
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.keyDownHandler)
    document.removeEventListener('keyup', this.keyUpHandler)
  },
  methods: {
    honk() {
      this.$emit('goose-note', this.modulation)
      this.toggleButton()
      return HonkHelper.honk(this.modulation)
    },
    toggleButton() {
      if (this.buttonActive === false) {
        this.buttonActive = true
      } else {
        this.buttonActive = false
      }
    },
    keyDownHandler(event) {
      // ideally, I don't think each Goose component should be adding its own event listeners
      if (event.key === this.keyboardkey) {
        this.honk(this.modulation)
      }
    },
    keyUpHandler(event) {
      if (event.key === this.keyboardkey) {
        this.toggleButton()
      }
    },
  },
}
</script>

<style scoped>
.btn {
  border: none;
  color: white;
  margin: 1rem;
  padding: 0;
  background-color: black;
  width: 6rem;
  height: 2rem;
}
.btn--active {
    background-color: gray;
}
</style>
