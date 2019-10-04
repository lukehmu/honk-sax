<template>
  <div class="recording">
    <button @click="honkArray">
      {{ buttonText }}
    </button>
    <button @click="stopHonk">
      STOP
    </button>
    <ul>
      <li
        v-for="(note, index) in notelist"
        :key="index"
      >
        {{ note }}
      </li>
    </ul>
  </div>
</template>
<script>
import HonkHelper from '../services/Sound'

export default {
  props: {
    notelist: {
      type: Array,
      default() { return [] },
    },
  },
  data() {
    return {
      buttonText: 'HONK A TUNE',
    }
  },
  methods: {
    honkArray() {
      if (this.notelist.length > 0) {
        this.buttonText = 'HONK A TUNE'
        return HonkHelper.honkArray(this.notelist)
      }
      this.buttonText = 'Nothing to play back'
      return 'done'
    },
    stopHonk() {
      return HonkHelper.stopHonk()
    },
  },
}
</script>
