<template>
  <div id="goose">
    <button
      :id="keyboardkey"
      class="btn"
      :class="{ 'btn--active': buttonActive }"
      @click="honk(modulation)"
    >
      Goose {{ keyboardkey }}
    </button>
  </div>
</template>
<script>
import HonkHelper from '../services/Sound'

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
    window.addEventListener('keydown', this.keyHandler)
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.keyHandler)
  },
  methods: {
    honk(modulation) {
      this.setButtonActive()
      return HonkHelper.honk(modulation)
    },
    setButtonActive() {
      // this is gross - so disgusting, but I don't have access to an
      // "is playing" variable
      this.buttonActive = true
      setTimeout(() => { this.buttonActive = false }, 200)
    },
    keyHandler(event) {
      // ideally, I don't think each Goose component should be adding its own event listeners
      if (event.key === this.keyboardkey) {
        this.honk(this.modulation)
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
