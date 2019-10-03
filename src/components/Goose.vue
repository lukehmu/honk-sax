<template>
  <div id="goose">
    <button
      class="btn"
      :class="{ 'btn--active': buttonActive }"
      @click="playGooseSound(modulation)"
    >
      Goose {{ keyboardkey }}
    </button>
  </div>
</template>
<script>
import Tone from 'tone'

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
      sound: 'hello',
      buttonActive: false,
    }
  },
  created() {
    window.addEventListener('keydown', this.keyHandler)
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.keyHandler)
  },
  methods: {
    playGooseSound(modulation) {
      this.buttonActive = true
      const sampler = new Tone.Sampler({
        E3: 'https://res.cloudinary.com/jlengstorf/video/upload/q_auto/v1569957993/honk-sound.mp3',
      }, (() => {
        // sampler will repitch the closest sample
        sampler.triggerAttack(modulation)
        this.buttonActive = false
      })).toMaster()
    },
    keyHandler(event) {
      // ideally, I don't think each Goose component should be adding its own event listeners
      if (event.key === this.keyboardkey) {
        this.playGooseSound(this.modulation)
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
