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
        playGooseSound(modulation) {
            const sampler = new Tone.Sampler({
                "C3" : "https://res.cloudinary.com/jlengstorf/video/upload/q_auto/v1569957993/honk-sound.mp3",
            }, function(){
                //sampler will repitch the closest sample
                sampler.triggerAttack(modulation)
            }).toMaster()
        }
    },
    props: {
        modulation: {
            type: String,
            default: ''
        }
    },
    mounted() {
    }
}
</script>
