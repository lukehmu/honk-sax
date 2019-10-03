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
    data() {
        return {
            sound: 'hello'
        }
    },
    methods: {
        playGooseSound() {
            const gooseSoundPlayer = new Tone.Player("https://res.cloudinary.com/jlengstorf/video/upload/q_auto/v1569957993/honk-sound.mp3").sync().start(0)
            const pitchShift = new Tone.PitchShift({
                pitch: this.modulation
            }).toMaster();
            // gooseSoundPlayer.connect(pitchShift)
            console.log(this.modulation) // eslint-disable-line
            Tone.Buffer.on('load', () => {
                    console.log('Ready for play') // eslint-disable-line
            });
            Tone.Transport.start()
            // Tone.Transport.stop()
            // Tone.Transport.start()
        }
    },
    props: {
        modulation: {
            type: String,
            default: ''
        }
    },
    mounted() {
        // const gooseSoundPlayer = new Tone.Player("https://res.cloudinary.com/jlengstorf/video/upload/q_auto/v1569957993/honk-sound.mp3").sync().start(0);
        // const pitchShift = new Tone.PitchShift({
        //     pitch: this.modulation
        // }).toMaster();
        // gooseSoundPlayer.connect(pitchShift)
        // console.log(this.modulation)
        // Tone.Buffer.on('load', () => {
        //     console.log('Ready for play') // eslint-disable-line
        // });
    }
}
</script>
