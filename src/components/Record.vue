<template>
  <div class="recording">
    <ul>
      <li
        v-for="note in notelist"
        :key="note"
      >
        {{ note }}
      </li>
    </ul>
    <button @click="honkArray">
      {{ buttonText }}
    </button>
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
  },
}
</script>
