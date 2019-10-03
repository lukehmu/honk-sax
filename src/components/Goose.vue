<template>
  <div id="goose">
    <button @click="playGooseSound(modulation)">
      I am a picture of a goose
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
  },
  data() {
    return {
      sound: 'hello',
    }
  },
  mounted() {
  },
  methods: {
    playGooseSound(modulation) {
      const sampler = new Tone.Sampler({
        E3: 'https://res.cloudinary.com/jlengstorf/video/upload/q_auto/v1569957993/honk-sound.mp3',
      }, (() => {
        // sampler will repitch the closest sample
        sampler.triggerAttack(modulation)
      })).toMaster()
    },
  },
}
</script>
